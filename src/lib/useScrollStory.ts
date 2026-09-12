import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Progressive scroll-motion layer:
 *  - staggered entrances for card/step/faq grids
 *  - the home hero content flows away as you scroll into the rest of the page
 *  - the ambient blue glow intensifies with scroll depth
 *
 * Everything is gated behind prefers-reduced-motion and cleaned up on unmount.
 * Animates transform / opacity only.
 */
export function useScrollStory() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      document
        .querySelectorAll<HTMLElement>(".services__grid, .feature-grid, .steps, .faq")
        .forEach((grid) => {
          const items = grid.querySelectorAll<HTMLElement>(
            ".service-card, .feature-card, .step, details",
          );
          if (!items.length) return;

          gsap.from(items, {
            autoAlpha: 0,
            y: 28,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: grid,
              start: "top 84%",
              once: true,
            },
          });
        });

      const heroContent = document.querySelector<HTMLElement>(".hero__content");
      if (heroContent) {
        gsap.to(heroContent, {
          autoAlpha: 0,
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: heroContent,
            start: "top top",
            end: "+=85%",
            scrub: 0.5,
          },
        });
      }

      const blueGlow = document.querySelector<HTMLElement>(".background__glow--blue");
      if (blueGlow) {
        gsap.fromTo(
          blueGlow,
          { opacity: 0.11 },
          {
            opacity: 0.24,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.8 },
          },
        );
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);
}
