// Landing glow (Brian picked G1, 2026-11-16): after a jump to a project card or a job (desktop ticks or the phone
// outline), the one you land on gets an amber ring that fades in about 1.8 s. It waits for the page to stop moving
// first (the `scrollend` event isn't in every browser, so it watches the scroll position instead).
const SHOW_MS = 1800;
const timers = new WeakMap<HTMLElement, number>();

export function glowOnLanding(id: string) {
  if (!/^(project|job)-/.test(id)) return; // sections (About, Contact...) don't glow
  const el = document.getElementById(id);
  if (!el) return;
  const start = performance.now();
  let last = Number.NaN;
  let still = 0;
  const watch = (now: number) => {
    const y = window.scrollY;
    still = y === last ? still + 1 : 0;
    last = y;
    if (still < 6 && now - start < 1500) {
      requestAnimationFrame(watch);
      return;
    }
    el.classList.remove("landed");
    void el.offsetWidth; // restarts the fade when the same one is picked twice in a row
    el.classList.add("landed");
    window.clearTimeout(timers.get(el));
    timers.set(el, window.setTimeout(() => el.classList.remove("landed"), SHOW_MS + 100));
  };
  requestAnimationFrame(watch);
}
