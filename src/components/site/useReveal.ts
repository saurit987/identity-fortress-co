import { useEffect } from "react";

/** Adds the `visible` class to `.reveal` / `.reveal-scale` elements as they enter view. */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    console.log("[reveal] init");
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .reveal-scale"),
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          window.setTimeout(() => target.classList.add("visible"), index * 70);
          observer.unobserve(target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
