"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const closeMenu = () => {
    setIsMenuOpen(false);
    buttonRef.current?.focus();
  };

  // Close menu on Escape & prevent scroll when open
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) closeMenu();
    };
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Focus first link on open
  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const firstLink = menuRef.current.querySelector("a") as HTMLAnchorElement;
      firstLink?.focus();
    }
  }, [isMenuOpen]);

  // Hide/show header on scroll
  useGSAP(() => {
    const headerEl = navRef.current;
    if (!headerEl) return;
    let isHidden = false;
    let headerHeight = headerEl.offsetHeight;
    gsap.set(headerEl, { y: 0, willChange: "transform" });

    const onResize = () => {
      headerHeight = headerEl.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const st = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        const scrolled = self.scroll();
        if (isMenuOpen) return gsap.to(headerEl, { y: 0, duration: 0.4 });
        if (scrolled <= 0) return gsap.to(headerEl, { y: 0, duration: 0.4 });
        if (self.direction === 1 && !isHidden) {
          isHidden = true;
          gsap.to(headerEl, { y: -headerHeight, duration: 0.45, ease: "power2.out" });
        } else if (self.direction === -1 && isHidden) {
          isHidden = false;
          gsap.to(headerEl, { y: 0, duration: 0.45, ease: "power2.out" });
        }
      },
    });

    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
      gsap.set(headerEl, { y: 0 });
    };
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:px-4 focus:py-2 rounded-md"
      >
        Skip to main content
      </a>

      <header
        ref={navRef}
        className="bg-background fixed inset-x-0 top-2 z-40 mx-auto w-full max-w-6xl rounded-lg px-5 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:bg-background/80"
        role="banner"
      >
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/madaga.png" alt="ATA Logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`px-2 py-1 text-sm font-medium transition-colors ${
                      isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              ref={buttonRef}
              onClick={toggleMenu}
              className="relative h-10 w-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <span
                className={`bg-foreground absolute left-1/2 block h-0.5 w-6 -translate-x-1/2 transition-all ${
                  isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-3"
                }`}
              />
              <span
                className={`bg-foreground absolute left-1/2 block h-0.5 w-6 -translate-x-1/2 transition-all ${
                  isMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="lg:hidden absolute inset-x-0 top-full mt-2 rounded-lg bg-background shadow-lg ring-1 ring-black/5 backdrop-blur-md"
          >
            <ul className="flex flex-col p-4 space-y-2">
              {navLinks.map((link, idx) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="block w-full px-3 py-2 rounded-md text-sm font-medium text-foreground/90 hover:bg-primary hover:text-white transition"
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;