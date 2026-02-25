"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Github } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", description: "Return to homepage" },
    { name: "About", href: "/about", description: "Learn more about our company" },
    { name: "Services", href: "/services", description: "HVAC" },
    { name: "Blog", href: "/blog", description: "HVAC" },
    { name: "Contact", href: "/contact", description: "HVAC" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveIndex(-1);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveIndex(-1);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % navLinks.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + navLinks.length) % navLinks.length);
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(navLinks.length - 1);
        break;
      case "Escape":
        closeMenu();
        break;
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const firstLink = menuRef.current.querySelector("a") as HTMLAnchorElement;
      firstLink?.focus();
    }
  }, [isMenuOpen]);

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

        if (isMenuOpen) {
          gsap.to(headerEl, { y: 0, duration: 0.4, ease: "power2.out" });
          return;
        }

        if (scrolled <= 0) {
          gsap.to(headerEl, { y: 0, duration: 0.4, ease: "power2.out" });
          return;
        }

        if (self.direction === 1 && !isHidden) {
          isHidden = true;
          gsap.to(headerEl, {
            y: -headerHeight,
            duration: 0.45,
            ease: "power2.out",
          });
        } else if (self.direction === -1 && isHidden) {
          isHidden = false;
          gsap.to(headerEl, {
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          });
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
        className="focus:bg-primary focus:text-primary-foreground focus:ring-ring !sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
      >
        Skip to main content
      </a>

      {/* ✅ UPDATED HEADER WITH BORDER + SHADOW */}
      <header
        ref={navRef}
        className="bg-background fixed inset-x-0 top-2 z-40 mx-auto w-full max-w-6xl rounded-lg px-5 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:bg-background/80"
        role="banner"
        aria-label="Main navigation"
      >
        <div className="container mx-auto">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-md transition-opacity hover:opacity-80"
              >
                <img
                  src="/madaga.png"
                  alt="ATA Logo"
                  className="h-8 w-auto"
                  width="140"
                  height="120"
                />
              </Link>
            </div>

            <ul className="hidden items-center space-x-6 lg:flex">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`px-2 py-1 text-sm font-medium transition-colors ${
                        isActive
                          ? "text-foreground"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="lg:hidden">
              <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-md"
              >
                <span
                  className={`bg-foreground absolute left-1/2 block h-0.5 w-6 -translate-x-1/2 transition-all ${
                    isMenuOpen
                      ? "top-1/2 -translate-y-1/2 rotate-45"
                      : "top-3"
                  }`}
                />
                <span
                  className={`bg-foreground absolute left-1/2 block h-0.5 w-6 -translate-x-1/2 transition-all ${
                    isMenuOpen
                      ? "top-1/2 -translate-y-1/2 -rotate-45"
                      : "top-5"
                  }`}
                />
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;