"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/operating-model", label: "Operating Model" },
  { href: "/trust", label: "Trust Center" },
  { href: "/apply", label: "Apply" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-ink-950/95 backdrop-blur-xl border-b border-white/[0.06] shadow-luxury"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="h-2 w-2 rounded-full bg-gold-300 animate-pulseSoft" />
          <span className="text-sm font-semibold tracking-tightLuxury text-ivory-50 group-hover:text-gold-100 transition-colors">
            Executive AI Concierge
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, -1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-200 ${
                pathname === link.href
                  ? "text-ivory-50"
                  : "text-platinum-300 hover:text-ivory-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/apply"
            className="rounded-full bg-ivory-50 px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-gold-100 transition-all duration-200"
          >
            Request Consultation
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-px w-6 bg-ivory-50 transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ivory-50 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ivory-50 transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-ink-900/98 backdrop-blur-xl border-b border-white/[0.06] px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base transition-colors duration-200 ${
                pathname === link.href
                  ? "text-ivory-50 font-medium"
                  : "text-platinum-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/apply"
            className="mt-2 rounded-full bg-ivory-50 px-5 py-3 text-sm font-semibold text-ink-950 text-center hover:bg-gold-100 transition-all duration-200"
          >
            Request Consultation
          </Link>
        </div>
      </div>
    </header>
  );
}
