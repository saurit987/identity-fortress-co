import type { ReactNode } from "react";

export function PageHero({
  label,
  title,
  intro,
  meta,
}: {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <div className="eyebrow reveal">
          <span className="eyebrow__indicator" />
          {label}
        </div>
        <h1 className="reveal">{title}</h1>
        {intro ? <p className="reveal">{intro}</p> : null}
        {meta ? (
          <div className="reveal" style={{ marginTop: 28 }}>
            {meta}
          </div>
        ) : null}
      </div>
    </section>
  );
}
