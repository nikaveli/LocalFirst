/** Page-local seek scheduler. The animation clock never waits for the decoder. */
export function createVideoScrubber(video: HTMLVideoElement) {
  let target = 0;
  let current = 0;
  let frame = 0;
  let lastTime = 0;
  let active = false;
  let destroyed = false;
  let primed = false;
  let priming = false;
  const frameDuration = 1 / 30;

  const wake = () => {
    if (!destroyed && active && !document.hidden && !frame) {
      frame = requestAnimationFrame(tick);
    }
  };

  const tick = (now: number) => {
    frame = 0;
    if (destroyed || !active || document.hidden) { lastTime = 0; return; }
    const duration = video.duration;
    if (video.readyState < 2 || !Number.isFinite(duration)) return;
    const delta = lastTime ? Math.min(now - lastTime, 64) : 1000 / 60;
    lastTime = now;
    // Advance even during an outstanding seek. Otherwise a slow iOS seek also
    // slows the easing clock, leaving it several gestures behind the visitor.
    current += (target - current) * (1 - Math.exp(-delta / 70));
    const seconds = Math.min(Math.round(current * duration / frameDuration) * frameDuration, Math.max(0, duration - frameDuration));
    if (!video.seeking && !priming && Math.abs(video.currentTime - seconds) >= frameDuration * 0.75) {
      try { video.currentTime = seconds; } catch { /* loadeddata/seeked retries */ }
    }
    if (Math.abs(target - current) * duration > frameDuration * 0.25) wake();
    else lastTime = 0;
    // seeked wakes the final pending frame. No perpetual idle polling loop.
  };

  const prime = () => {
    if (primed || priming || !active || video.readyState < 2 || document.hidden) return;
    priming = true;
    void video.play().then(() => {
      video.pause();
      primed = true;
    }).catch(() => {
      // Low Power Mode can reject autoplay. Keep the next touch able to retry;
      // never consume a one-shot gesture before the media actually exists.
    }).finally(() => { priming = false; wake(); });
  };
  const loaded = () => { prime(); wake(); };
  const seeked = () => { video.classList.add("sc-has-clip"); wake(); };
  const visibility = () => {
    if (document.hidden) { video.pause(); cancelAnimationFrame(frame); frame = 0; lastTime = 0; }
    else { prime(); wake(); }
  };
  video.addEventListener("loadeddata", loaded);
  video.addEventListener("seeked", seeked);
  window.addEventListener("touchstart", prime, { passive: true });
  window.addEventListener("pointerdown", prime, { passive: true });
  document.addEventListener("visibilitychange", visibility);

  return {
    setTarget(progress: number, visible: boolean) {
      target = Math.min(1, Math.max(0, progress));
      const entering = visible && !active;
      active = visible;
      if (entering) { current = target; lastTime = 0; prime(); }
      if (!visible) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; }
      else wake();
    },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(frame);
      video.pause();
      video.removeEventListener("loadeddata", loaded);
      video.removeEventListener("seeked", seeked);
      window.removeEventListener("touchstart", prime);
      window.removeEventListener("pointerdown", prime);
      document.removeEventListener("visibilitychange", visibility);
    },
  };
}
