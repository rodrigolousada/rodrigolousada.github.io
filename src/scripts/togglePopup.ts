// Shared "click a marker to show a positioned info popup" interaction, used
// by:
// - Hero.astro's city markers on the world map.
// - Organizations.astro's study-program markers ("Studied at" logos with a
//   program/grade balloon).
// Both used to implement this independently (open one popup at a time,
// close on outside click/Escape/its own close button, hand focus back to
// whichever marker opened it) as near-identical ~45-line blocks. Extracted
// here so a behavior change only has to be made once, and so the two can't
// quietly drift apart the way they already had (Organizations' copy
// localized its aria-labels through ui.json, Hero's didn't).
export function wireTogglePopups(config: {
  /** Attribute (with its "data-" prefix) on each trigger button, holding the id of the popup it opens, e.g. "data-city-toggle". */
  toggleAttr: string;
  /** Attribute (with its "data-" prefix) on each popup's own close button, e.g. "data-city-close". */
  closeAttr: string;
  /** Class shared by every popup this instance controls, e.g. "city-popup". */
  popupClass: string;
}) {
  const { toggleAttr, closeAttr, popupClass } = config;
  const toggles = document.querySelectorAll<HTMLButtonElement>(`[${toggleAttr}]`);
  const closeButtons = document.querySelectorAll<HTMLButtonElement>(`[${closeAttr}]`);
  // Whichever trigger opened the currently-visible popup, so Escape/close
  // can hand focus back to it — otherwise a keyboard user's focus would be
  // left on a now-hidden close button with nothing announcing where it went.
  let lastTrigger: HTMLButtonElement | null = null;

  function closeAll(restoreFocus = false) {
    document.querySelectorAll<HTMLElement>(`.${popupClass}`).forEach((popup) => {
      popup.classList.add('hidden');
    });
    toggles.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
    if (restoreFocus) lastTrigger?.focus();
    lastTrigger = null;
  }

  toggles.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute(toggleAttr);
      if (!id) return;
      const popup = document.getElementById(id);
      const wasOpen = popup ? !popup.classList.contains('hidden') : false;
      closeAll();
      if (popup && !wasOpen) {
        popup.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        lastTrigger = btn;
        // Move focus into the popup itself (its close button, always
        // present) so a keyboard/screen-reader user actually lands on the
        // content that just appeared, instead of it opening silently
        // somewhere off in the page while focus stays on the marker.
        popup.querySelector<HTMLButtonElement>(`[${closeAttr}]`)?.focus();
      }
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAll(true);
    });
  });

  document.addEventListener('click', () => closeAll());
  // These are plain divs, not native <dialog>, so Escape does nothing for
  // them unless wired up explicitly — every other overlay on the site gets
  // this for free from the browser.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll(true);
  });
}
