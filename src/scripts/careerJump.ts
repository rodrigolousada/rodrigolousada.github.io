// Shared "scroll to it, then pop the modal(s) open" animation, used by:
// - Organizations.astro's cross-links ("Worked at" / "Clients" logos, and
//   the testimonial letter) jumping into a career stop and, where known,
//   straight into one of its projects.
// - The `?p=` deep-link resolver (ProjectDeepLink.astro) opening the exact
//   project a shared link points to, on page load.
// Extracted here so both call sites produce the identical sequence rather
// than two versions drifting apart.

// Smooth-scroll to the target at a normal pace — the pause that makes a
// jump feel deliberate (rather than an accidental scroll+open) belongs
// before the destination modal appears, not in the scroll itself.
export function scrollToStop(el: HTMLElement, duration = 600) {
  const rect = el.getBoundingClientRect();
  const startY = window.scrollY;
  const targetY = startY + rect.top - window.innerHeight / 2 + rect.height / 2;
  const diff = targetY - startY;
  const startTime = performance.now();

  function step(now: number) {
    const t = Math.min((now - startTime) / duration, 1);
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    window.scrollTo(0, startY + diff * eased);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/** Scrolls to a career stop, opens its modal, then (if given) drills into one
 * of its projects' own modal a beat later. `stopEl` is the element carrying
 * `data-stop-anchor`/`data-modal-id` (CareerStopRow.astro); `projectEl` is the
 * project row's `<button>` carrying `data-modal-id` (ProjectRow.astro). */
export function openStop(stopEl: HTMLElement, projectEl: HTMLElement | null = null) {
  const details = stopEl.closest('details');
  if (details && !details.open) details.open = true;

  scrollToStop(stopEl, 600);
  // Start the pulse once the scroll has actually settled, not at the same
  // moment it starts moving — lit up while the page is still sliding into
  // place it was mostly spent (and unnoticed) by the time anyone could
  // look at it.
  const highlightTarget = stopEl.querySelector<HTMLElement>(':scope > button') ?? stopEl;
  setTimeout(() => {
    highlightTarget.classList.add('scroll-highlight');
    setTimeout(() => highlightTarget.classList.remove('scroll-highlight'), 1600);
  }, 600);

  const stopModalId = stopEl.dataset.modalId;
  const stopDialog = stopModalId && document.getElementById(stopModalId);
  if (stopDialog instanceof HTMLDialogElement) {
    setTimeout(() => {
      if (!stopDialog.open) stopDialog.showModal();
      if (projectEl) {
        // Give the project row its own hover-style highlight so it's clear
        // which box is about to open, then hold on it for a beat before
        // that second popup appears — two modals landing back-to-back
        // felt like a glitch rather than a deliberate drill-down.
        projectEl.classList.add('scroll-highlight');
        setTimeout(() => projectEl.classList.remove('scroll-highlight'), 1600);
        const projModalId = projectEl.dataset.modalId;
        const projDialog = projModalId && document.getElementById(projModalId);
        if (projDialog instanceof HTMLDialogElement && !projDialog.open) {
          setTimeout(() => projDialog.showModal(), 500);
        }
      }
    }, 1600);
  }
}

/** The side-project equivalent of `openStop`: there's no parent career-stop
 * dialog to open first, so this just scrolls to the cartridge, highlights
 * it, then opens its own modal a beat later. */
export function openSideProject(cartridgeEl: HTMLElement) {
  scrollToStop(cartridgeEl, 600);
  setTimeout(() => {
    cartridgeEl.classList.add('scroll-highlight');
    setTimeout(() => cartridgeEl.classList.remove('scroll-highlight'), 1600);
  }, 600);

  const modalId = cartridgeEl.dataset.modalId;
  const dialog = modalId && document.getElementById(modalId);
  if (dialog instanceof HTMLDialogElement && !dialog.open) {
    setTimeout(() => dialog.showModal(), 1600);
  }
}
