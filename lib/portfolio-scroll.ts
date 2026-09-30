/**
 * Section-scoped React adaptation of scroll-world's references/scrub-engine.js.
 * Retains blob seeking, coalesced decodes, first-frame posters, touch priming,
 * responsive encodes and stable touch resize. These are separate portfolio films,
 * not a connector chain: no full-window overlays or synthetic seams are needed.
 * Unlike the standalone engine, every listener, fetch and object URL is disposable.
 */
export function mountPortfolioScroll(root: HTMLElement, base: string) {
  // Twice the original track length: half the video travel per scroll gesture.
  const scrollViewports = 5.2;
  const video = root.querySelector<HTMLVideoElement>('video')!;
  const stage = root.querySelector<HTMLElement>('[data-preview-stage]')!;
  const heading = root.querySelector<HTMLElement>('.wd-project-heading')!;
  const media = root.querySelector<HTMLElement>('.wd-preview-media')!;
  const caption = root.querySelector<HTMLElement>('.wd-preview-caption')!;
  const tools = root.querySelector<HTMLElement>('.wd-preview-tools')!;
  const fill = root.querySelector<HTMLElement>('[data-preview-progress]')!;
  const status = root.querySelector<HTMLElement>('[data-preview-status]')!;
  const play = root.querySelector<HTMLButtonElement>('[data-preview-play]')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const small = matchMedia('(max-width: 767px)');
  const coarse = matchMedia('(pointer: coarse)').matches;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const phone = Math.min(screen.width, screen.height) <= 600;
  let tier = phone || small.matches ? 'mobile' : 'desktop';
  let active = true, near = false, inView = false, blocked = false, cramped = false;
  let loading: AbortController | null = null, objectURL = '', failed = false;
  let frame = 0, revealFrame = 0, layoutFrame = 0, paintCallback = 0, generation = 0;
  let target = 0, current = 0, priming = false, manual = false;
  let width = innerWidth, viewport = innerHeight;
  let pinned = stage, introHeight = 0, stickyTop = 24;
  const clamp = (n: number) => Math.max(0, Math.min(1, n));
  const staticMode = () => reduced.matches || !!connection?.saveData || blocked || cramped;
  const setStatus = (message: string) => { if (status.textContent !== message) status.textContent = message; };

  function reveal() {
    if (!active || video.readyState < 2 || !objectURL) return;
    // Keep the poster on top until a decoded frame can actually be presented.
    if ('requestVideoFrameCallback' in video) {
      if (!paintCallback) paintCallback = video.requestVideoFrameCallback(() => {
        paintCallback = 0;
        if (active && objectURL) root.dataset.painted = 'true';
      });
    } else {
      cancelAnimationFrame(revealFrame);
      revealFrame = requestAnimationFrame(() => {
        revealFrame = requestAnimationFrame(() => { if (active && objectURL) root.dataset.painted = 'true'; });
      });
    }
  }

  function schedule() { if (active && !frame) frame = requestAnimationFrame(tick); }
  function tick() {
    frame = 0;
    if (!active || !inView || document.hidden || staticMode() || manual || priming || video.readyState < 2) return;
    // A slow decoder must finish its current seek before receiving the latest one.
    if (video.seeking) return;
    current += (target - current) * .24;
    const duration = Math.max(0, video.duration - 1 / 30);
    const time = clamp(current) * duration;
    if (Math.abs(video.currentTime - time) > (coarse ? .025 : .012)) video.currentTime = time;
    else if (Math.abs(target - current) > .001) schedule();
    reveal();
  }

  function release() {
    generation++;
    loading?.abort(); loading = null;
    cancelAnimationFrame(frame); frame = 0;
    cancelAnimationFrame(revealFrame);
    if (paintCallback) video.cancelVideoFrameCallback(paintCallback);
    paintCallback = 0;
    priming = false; manual = false;
    video.pause(); video.controls = false;
    delete root.dataset.painted;
    video.removeAttribute('src'); video.load();
    if (objectURL) URL.revokeObjectURL(objectURL);
    objectURL = '';
    play.textContent = 'Play preview';
  }

  async function prime(explicit = false) {
    if (!objectURL || priming || (!explicit && staticMode())) return;
    const version = generation;
    priming = true;
    try {
      await video.play();
      if (!active || version !== generation) return;
      reveal();
      if (!manual) video.pause();
    } catch {
      if (!active || version !== generation) return;
      if (!explicit) {
        blocked = true;
        layout();
        setStatus('Scroll preview paused by your device. Tap Play preview.');
      } else setStatus('Playback is unavailable. The website preview is shown above.');
    } finally {
      if (version === generation) { priming = false; schedule(); }
    }
  }

  async function load(explicit = false) {
    if (!active || loading || objectURL || (staticMode() && !explicit) || (failed && !explicit)) return;
    failed = false;
    const controller = new AbortController(); loading = controller;
    const version = generation;
    setStatus('Loading preview…');
    try {
      const response = await fetch(`${base}-${tier}.mp4`, { signal: controller.signal });
      if (!response.ok) throw new Error('Preview unavailable');
      const blob = await response.blob();
      if (!active || controller.signal.aborted || version !== generation) return;
      objectURL = URL.createObjectURL(blob);
      video.src = objectURL;
      video.load();
    } catch {
      if (!controller.signal.aborted && active && version === generation) {
        failed = true;
        setStatus('Preview could not load. Tap Play preview to retry.');
      }
    } finally { if (loading === controller) loading = null; }
  }

  function read() {
    if (!active) return;
    const rect = root.getBoundingClientRect();
    inView = rect.bottom > 0 && rect.top < innerHeight;
    target = clamp((stickyTop - rect.top - introHeight) / Math.max(1, root.offsetHeight - introHeight - pinned.offsetHeight));
    fill.style.transform = `scaleX(${target})`;
    if (!inView && !video.paused) video.pause();
    if (rect.bottom < -viewport || rect.top > viewport * 2) {
      if (objectURL || loading) release();
    } else if (near && !document.hidden) void load();
    schedule();
  }

  function layout() {
    root.dataset.tier = tier;
    const source = root.querySelector('picture source');
    source?.setAttribute('media', tier === 'mobile' ? 'all' : 'not all');
    // Phones show the complete description before the film, then pin a compact
    // title with the large preview. Keeping the full paragraph pinned made the
    // portrait movie shrink to a thumbnail on real browser viewports.
    const compact = small.matches;
    pinned = compact ? media : stage;
    introHeight = compact ? heading.offsetHeight : 0;
    stickyTop = compact ? 12 : 24;
    const beside = matchMedia('(min-width: 600px) and (max-height: 600px)').matches;
    const usable = compact ? viewport - 24 - 12 : viewport - 48 - 16 - (coarse ? 64 : 0);
    const filmHeight = usable - tools.offsetHeight - (compact ? Math.max(48, caption.offsetHeight) : beside ? 0 : heading.offsetHeight);
    cramped = filmHeight < 180 || (!compact && beside && heading.offsetHeight > usable);
    root.style.setProperty('--wd-frame-height', `${Math.max(180, filmHeight)}px`);
    root.dataset.mode = staticMode() ? 'static' : 'scroll';
    root.style.height = staticMode() ? '' : `${introHeight + pinned.offsetHeight + viewport * scrollViewports}px`;
    setStatus(staticMode() ? 'Still preview · Play the video when you’re ready.' : 'Scroll to explore · Scroll up to rewind');
    read();
  }
  function resize() {
    if (coarse && width === innerWidth) return; // Ignore iOS toolbar-only resizes.
    width = innerWidth; viewport = innerHeight;
    const next = phone || small.matches ? 'mobile' : 'desktop';
    if (next !== tier) { release(); tier = next; }
    layout();
  }
  function ready() {
    setStatus(manual ? 'Video playback · Scroll mode resumes when paused.' : 'Scroll to explore · Scroll up to rewind');
    if (manual) video.controls = true;
    void prime(manual);
    schedule();
  }
  function seeked() { reveal(); schedule(); }
  function pause() {
    if (!manual || priming) return;
    manual = false;
    video.controls = false;
    play.textContent = 'Play preview';
    schedule();
  }
  function playPreview() {
    manual = true;
    video.controls = true;
    play.textContent = 'Restart preview';
    if (objectURL) { video.currentTime = 0; void prime(true); }
    else void load(true);
  }
  function error() { setStatus('Video unavailable. The website preview is shown above.'); }
  function preference() { release(); blocked = false; layout(); }
  function gesture() { if (inView && objectURL && !priming && !manual && !staticMode()) void prime(); }
  const observer = new IntersectionObserver(([entry]) => { near = entry.isIntersecting; read(); }, { rootMargin: '180px' });
  // Defer geometry writes outside ResizeObserver delivery, especially when the
  // mobile caption appears or the pinned element changes after rotation.
  const sizeObserver = new ResizeObserver(() => {
    if (!active || layoutFrame) return;
    layoutFrame = requestAnimationFrame(() => { layoutFrame = 0; if (active) layout(); });
  });
  root.dataset.ready = 'true';
  play.hidden = false;
  video.addEventListener('loadeddata', ready);
  video.addEventListener('seeked', seeked);
  video.addEventListener('pause', pause);
  video.addEventListener('ended', pause);
  video.addEventListener('error', error);
  play.addEventListener('click', playPreview);
  window.addEventListener('scroll', read, { passive: true });
  window.addEventListener('resize', resize);
  window.addEventListener('touchstart', gesture, { passive: true });
  document.addEventListener('visibilitychange', read);
  reduced.addEventListener('change', preference);
  observer.observe(root);
  sizeObserver.observe(stage);
  sizeObserver.observe(heading);
  sizeObserver.observe(media);
  sizeObserver.observe(caption);
  sizeObserver.observe(tools);
  layout();
  return () => {
    active = false;
    cancelAnimationFrame(layoutFrame);
    observer.disconnect(); sizeObserver.disconnect();
    window.removeEventListener('scroll', read);
    window.removeEventListener('resize', resize);
    window.removeEventListener('touchstart', gesture);
    document.removeEventListener('visibilitychange', read);
    reduced.removeEventListener('change', preference);
    video.removeEventListener('loadeddata', ready);
    video.removeEventListener('seeked', seeked);
    video.removeEventListener('pause', pause);
    video.removeEventListener('ended', pause);
    video.removeEventListener('error', error);
    play.removeEventListener('click', playPreview);
    release();
    delete root.dataset.ready;
    root.dataset.mode = 'static';
    root.style.height = '';
    root.style.removeProperty('--wd-frame-height');
  };
}
