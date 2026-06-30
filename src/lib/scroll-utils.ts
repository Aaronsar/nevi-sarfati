export function smoothScrollTo(
  element: HTMLElement | null,
  options: { offset?: number; duration?: number; delay?: number } = {},
) {
  if (!element) return;

  const { offset = 0, duration = 2800, delay = 0 } = options;

  setTimeout(() => {
    const start = window.scrollY;
    const end = element.getBoundingClientRect().top + window.scrollY + offset;
    const distance = end - start;
    let startTime: number | null = null;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, start + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, delay);
}

export function lockScroll(locked: boolean) {
  document.body.style.overflow = locked ? "hidden" : "";
}
