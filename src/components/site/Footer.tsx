import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__brand">
            <Link to="/" className="brand">
              <span className="brand__mark">SYIT</span>
            </Link>
            <p>Security infrastructure for teams moving fast — and for people protecting their own data.</p>
          </div>

          <div className="footer__links">
            <div>
              <span>EXPLORE</span>
              <Link to="/services">Services</Link>
              <Link to="/about">What we are</Link>
              <Link to="/why-us">Why us</Link>
              <Link to="/individuals">For individuals</Link>
            </div>

            <div>
              <span>COMPANY</span>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy policy</Link>
              <Link to="/terms">Terms &amp; conditions</Link>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} SYIT</span>
          <span>SOC 2 / ISO 27001 — Coming Soon</span>
          <span>Built for security.</span>
        </div>
      </div>
    </footer>
  );
}
