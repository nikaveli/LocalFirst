// Mobile scroll media deliberately has no HTMLMediaElement dependency. iOS can
// defer native video decoding even after metadata and a seek have completed.
// Keep a moving window of decoded frames, never hundreds of full-size bitmaps.
export const FRAME_SEQUENCES = {
  localfirst: 240,
  restaurant: 241,
  "med-spa": 241,
} as const;
export const FRAME_VERSION = "v3";
export const FRAME_WIDTH = 1920;
export const FRAME_HEIGHT = 1080;
// Full-HD pixels stay sharp, but only a small moving window stays decoded.
export const FRAME_CACHE_LIMIT = 4;
export const FRAME_REQUEST_LIMIT = 2;

export function createFrameSequence(
  video: HTMLVideoElement,
  name: keyof typeof FRAME_SEQUENCES,
) {
  const count = FRAME_SEQUENCES[name];
  const poster = video.parentElement?.querySelector<HTMLImageElement>("img");
  const canvas = document.createElement("canvas");
  canvas.width = FRAME_WIDTH;
  canvas.height = FRAME_HEIGHT;
  canvas.className = video.className;
  canvas.dataset.lfFrameSequence = name;
  canvas.setAttribute("aria-hidden", "true");
  const context = canvas.getContext("2d", { alpha: false });
  if (context) context.imageSmoothingQuality = "high";
  const previousDisplay = video.style.display;
  video.style.display = "none";
  video.after(canvas);
  canvas.style.visibility = "hidden";

  const cache = new Map<number, ImageBitmap>();
  const pending = new Map<number, AbortController>();
  const failures = new Map<number, number>();
  let target = 0, direction = 1, painted = -1;
  let active = false, warmed = false, destroyed = false, paintFrame = 0;

  const wantedFrames = () => {
    if (!active || document.hidden) return [0];
    const indices = [target];
    // The exact target always wins over speculative work, including on rewind.
    indices.push(target + direction, 0);
    return [...new Set(indices.filter((index) => index >= 0 && index < count))];
  };

  const trim = () => {
    const wanted = new Set(wantedFrames());
    // A network response may arrive several frames behind the scroll target.
    // Retain a few of those frames: rejecting every late decode starves the
    // canvas on cellular connections even though requests are succeeding.
    const retained = new Set([...cache.keys()]
      .filter((index) => index === 0 || (active && !document.hidden && Math.abs(index - target) <= 48))
      .sort((a, b) => Number(wanted.has(b)) - Number(wanted.has(a)) || Math.abs(a - target) - Math.abs(b - target))
      .slice(0, FRAME_CACHE_LIMIT));
    for (const [index, bitmap] of cache) {
      if (!retained.has(index)) {
        bitmap.close();
        cache.delete(index);
      }
    }
    canvas.dataset.frameCache = String(cache.size);
  };

  const paint = () => {
    paintFrame = 0;
    if (destroyed || !context || document.hidden) return;
    let nearest = -1;
    for (const index of cache.keys()) {
      if (nearest < 0 || Math.abs(index - target) < Math.abs(nearest - target)) nearest = index;
    }
    // Don't flash frame zero while a new target is loading: the canvas keeps
    // its last pixels even when their source bitmap has been released.
    if (nearest < 0 || nearest === painted) return;
    if (painted >= 0 && Math.abs(nearest - target) > Math.abs(painted - target)) return;
    context.drawImage(cache.get(nearest)!, 0, 0, canvas.width, canvas.height);
    painted = nearest;
    canvas.style.visibility = "visible";
    canvas.dataset.renderedFrame = String(nearest);
    canvas.dataset.scVerifyState = `${name}-${nearest}`;
    video.closest<HTMLElement>(".lf-film-sheet")?.classList.add("is-ready");
  };

  const requestPaint = () => {
    if (!paintFrame && !destroyed) paintFrame = requestAnimationFrame(paint);
  };

  const pump = () => {
    if (destroyed || !warmed || document.hidden) return;
    // A transformed, incoming sheet may still be outside native lazy-load
    // geometry. Warming it explicitly starts its poster before decode().
    if (poster?.loading === "lazy") poster.loading = "eager";
    for (const index of wantedFrames()) {
      if (pending.size >= FRAME_REQUEST_LIMIT) break;
      if (cache.has(index) || pending.has(index) || (failures.get(index) || 0) >= 2) continue;
      const controller = new AbortController();
      let timedOut = false;
      const timeout = setTimeout(() => { timedOut = true; controller.abort(); }, 8000);
      pending.set(index, controller);
      const path = `/media/frames/${FRAME_VERSION}/${name}/${String(index).padStart(4, "0")}.webp`;
      const fetchBitmap = () => fetch(path, { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error(`Frame unavailable: ${response.status}`);
          return response.blob();
        })
        .then((blob) => createImageBitmap(blob));
      // The DOM poster already downloaded frame zero. Decode those same pixels
      // instead of issuing a second request (especially costly on first visits).
      const bitmapPromise = index === 0 && poster
        ? poster.decode().then(() => createImageBitmap(poster)).catch(() => {
            if (destroyed || controller.signal.aborted) throw new Error("Frame cancelled");
            return fetchBitmap();
          })
        : fetchBitmap();
      void bitmapPromise
        .then((bitmap) => {
          if (destroyed || controller.signal.aborted || (index !== 0 && (!active || Math.abs(index - target) > 48))) {
            bitmap.close();
            return;
          }
          cache.set(index, bitmap);
          trim();
          requestPaint();
        })
        .catch(() => {
          if (!controller.signal.aborted || timedOut) failures.set(index, (failures.get(index) || 0) + 1);
        })
        .finally(() => {
          clearTimeout(timeout);
          pending.delete(index);
          pump();
        });
    }
  };

  const refresh = () => {
    const wanted = new Set(wantedFrames());
    let keepLateResponse = true;
    for (const [index, controller] of pending) {
      if (document.hidden || (!active && index !== 0) || (index !== 0 && Math.abs(index - target) > 48)) {
        controller.abort();
      } else if (!wanted.has(index)) {
        // Let ONE late frame finish so continuous scrolling cannot starve the
        // screen. Reclaim the speculative slot for the latest target.
        if (keepLateResponse && !controller.signal.aborted) keepLateResponse = false;
        else controller.abort();
      }
    }
    trim();
    requestPaint();
    pump();
  };
  document.addEventListener("visibilitychange", refresh);

  return {
    warm() {
      warmed = true;
      pump();
    },
    setTarget(progress: number, isActive: boolean) {
      const next = Math.round(Math.min(1, Math.max(0, progress)) * (count - 1));
      if (next !== target) direction = next > target ? 1 : -1;
      const changed = next !== target || active !== isActive;
      target = next;
      active = isActive;
      if (active) warmed = true;
      if (changed) refresh();
    },
    destroy() {
      destroyed = true;
      if (paintFrame) cancelAnimationFrame(paintFrame);
      document.removeEventListener("visibilitychange", refresh);
      pending.forEach((controller) => controller.abort());
      cache.forEach((bitmap) => bitmap.close());
      cache.clear();
      canvas.remove();
      video.style.display = previousDisplay;
    },
  };
}
