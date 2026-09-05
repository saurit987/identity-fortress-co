import { Link } from "@tanstack/react-router";

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="container final-cta__inner reveal">
        <span className="section-number">SYIT / SECURITY INFRASTRUCTURE</span>
        <h2>
          Build fast.
          <br />
          <span>Stay secure.</span>
        </h2>
        <Link to="/contact" className="button button--light">
          Start a conversation
          <span>↗</span>
        </Link>
      </div>
    </section>
  );
}
