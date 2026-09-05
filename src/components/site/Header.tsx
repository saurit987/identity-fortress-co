import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/services", label: "Services" },
  { to: "/about", label: "What we are" },
  { to: "/why-us", label: "Why us" },
  { to: "/individuals", label: "For individuals" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`} id="site-header">
      <div className="container nav">
        <Link to="/" className="brand" aria-label="SYIT home">
          <span className="brand__mark">SYIT</span>
          <span className="brand__label">SECURITY</span>
        </Link>

        <nav className="nav__links" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.to} to={link.to} activeProps={{ className: "active" }}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link to="/contact" className="nav__button">
          Get secured
          <span>↗</span>
        </Link>

        <button
          className="nav__menu"
          type="button"
          aria-label="Open navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu${open ? " open" : ""}`}>
        {links.map((link) => (
          <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link to="/contact" className="mobile-menu__cta" onClick={() => setOpen(false)}>
          Get secured ↗
        </Link>
      </div>
    </header>
  );
}
