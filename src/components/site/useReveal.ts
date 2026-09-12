import { useEffect } from "react";

/** Adds the `visible` class to `.reveal` / `.reveal-scale` elements as they enter view. */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .reveal-scale"));

    const reveal = (el: HTMLElement) => el.classList.add("visible");

    // No IntersectionObserver → just show everything.
    if (!("IntersectionObserver" in window)) {
      elements.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          window.setTimeout(() => {
            target.classList.add("visible");
            observer.unobserve(target);
          }, index * 70);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 150px 0px" },
    );

    // Fallback for fast jumps (keyboard End, anchor links): reveal anything
    // that has already passed through (or into) the viewport.
    const revealPassed = () => {
      const pending = elements.filter((el) => !el.classList.contains("visible"));
      if (!pending.length) {
        window.removeEventListener("scroll", onScroll);
        return;
      }
      for (const el of pending) {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.9) {
          reveal(el);
          observer.unobserve(el);
        }
      }
    };
    const onScroll = () => requestAnimationFrame(revealPassed);

    elements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    revealPassed();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
