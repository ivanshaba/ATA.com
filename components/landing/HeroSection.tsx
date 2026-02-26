"use client";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { Marquee } from "@/components/magicui/marquee";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { caseStudies } from "@/data/caseStudies";
import "@/lib/GSAPAnimations";
import { useGSAP } from "@gsap/react";
import Autoplay from "embla-carousel-autoplay";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("loaderShown");
    }
    return true;
  });

  useEffect(() => {
    if (sessionStorage.getItem("loaderShown")) {
      setIsLoading(false);
      return;
    }
    if (!loaderRef.current) return;

    const glowAnimation = gsap.to(".loader-logo", {
      boxShadow: "0px 0px 60px rgba(168,85,247,1)",
      filter: "drop-shadow(0px 0px 30px rgba(168,85,247,1))",
      duration: 0.7,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        glowAnimation.kill();
        gsap.to(loaderRef.current, {
          y: "-100%",
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: () => {
            sessionStorage.setItem("loaderShown", "true");
            setIsLoading(false);
          },
        });
      },
    });

    tl.from(".loader-logo", { opacity: 0, scale: 0.8, duration: 1, ease: "power3.out" });
    tl.to(".loader-logo", { y: -20, duration: 0.8, ease: "power3.inOut" });
    tl.to(".loader-title", { opacity: 1, y: -10, duration: 1, ease: "power3.out" }, "-=0.4");
    tl.to({}, { duration: 1 });

    return () => {
      glowAnimation.kill();
    };
  }, []);

  useGSAP(
    () => {
      if (isLoading) return;

      const headingElement = heroRef?.current?.querySelector("h1");
      if (headingElement) {
        SplitText.create(headingElement, {
          type: "lines, words",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.words, {
              duration: 0.6,
              y: 20,
              opacity: 0,
              filter: "blur(6px)",
              stagger: 0.05,
            });
          },
        });
      }

      if (heroRef?.current && caseStudiesRef?.current) {
        gsap.effects.fadeUpOnScroll(caseStudiesRef.current, {
          start: "top 80%",
          duration: 0.8,
        });
      }

      if (slideshowRef.current) {
        const slides: HTMLElement[] = gsap.utils.toArray(".slide", slideshowRef.current);
        if (slides.length > 0) {
          gsap.set(slides[0], { opacity: 1 });
          gsap.set(slides.slice(1), { opacity: 0 });
          const tl = gsap.timeline({ repeat: -1 });
          slides.forEach((slide, index) => {
            const nextIndex = (index + 1) % slides.length;
            tl.to(slide, { opacity: 0, duration: 1, delay: 4 }, ">");
            tl.to(slides[nextIndex], { opacity: 1, duration: 1 }, "-=1");
          });
        }
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { dependencies: [isLoading] }
  );

  return (
    <>
      {isLoading && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
        >
          <div className="flex flex-col items-center space-y-6">
            <img
              src="/madaga.png"
              alt="ATA Logo"
              className="loader-logo h-16 w-auto will-change-transform"
              width="140"
              height="120"
            />
            <h1 className="loader-title text-3xl font-semibold tracking-wide opacity-0" />
          </div>
        </div>
      )}

      <div className="flex flex-col items-center flex-nowrap p-5">
        <div
          ref={heroRef}
          className="relative w-full overflow-hidden pt-[116px] pb-[48px] md:pt-[128px] md:pb-[128px]"
        >
          <div ref={slideshowRef} className="absolute inset-0 z-0 overflow-hidden">
            <div className="slide absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/one.jpg')" }} />
            <div className="slide absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/three.jpg')" }} />
            <div className="slide absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/two.jpg')" }} />
          </div>

          <div className="absolute inset-0 z-10 bg-black/60" />
          <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_70%)]" />

          <div className="relative z-30 max-w-5xl mx-auto px-4 md:px-0">
  {/* Badge */}
  <div className="flex w-full mb-4 justify-start md:justify-center">
    <span className="inline-block bg-white/10 text-white border border-purple-400/40 backdrop-blur-sm text-[10px] md:text-sm px-2 md:px-3 py-1 rounded-md">
      Industrial Air Conditioning & Raw Material Supply
    </span>
  </div>

  {/* Heading */}
  <h1 className="text-white drop-shadow-lg leading-tight text-2xl sm:text-3xl md:text-5xl font-semibold text-left md:text-center">
    Reliable Industrial & Commercial HVAC Solutions in Uganda: 
    <br className="block md:hidden" /> Installation, Maintenance & Supply of HVAC Equipment.
  </h1>

  {/* Buttons */}
  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-start md:justify-center">
    <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      Contact Us
    </Button>
    <Button variant="outline" className="w-full sm:w-auto border-white text-black">
      View Our Projects
    </Button>
  </div>
</div>



          
        </div>
      </div>
    </>
  );
}

export default HomePage;