// "Locked" (Coming soon) feedback: a locked project, side project, or
// career stop (ProjectRow.astro / GameCartridge.astro / CareerStopRow.astro,
// each marked via `[data-locked]`) is a real, clickable button rather than
// a disabled one — clicking it shakes and flashes red (`.locked-shake` in
// global.css) plus a short blocked-sounding beep, so it reads as
// intentionally locked rather than broken. Wired up once here, delegated
// off `document`, rather than once per rendering component, since all
// three share the exact same feedback.
export function wireLockedItems() {
  let audioCtx: AudioContext | null = null;

  function playLockedSound() {
    try {
      audioCtx ??= new AudioContext();
      const ctx = audioCtx;
      if (ctx.state === 'suspended') void ctx.resume();
      const now = ctx.currentTime;
      // Two quick low blips, like an access-denied buzzer.
      [0, 0.09].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(160, now + offset);
        gain.gain.setValueAtTime(0.06, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.09);
      });
    } catch {
      // Audio unavailable (autoplay policy, unsupported browser, etc) — the
      // shake alone still reads as "blocked".
    }
  }

  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-locked]');
    if (!target) return;
    playLockedSound();
    target.classList.remove('locked-shake');
    // Force reflow so a second click mid-animation restarts it cleanly.
    void target.offsetWidth;
    target.classList.add('locked-shake');
    target.addEventListener('animationend', () => target.classList.remove('locked-shake'), { once: true });
  });
}
