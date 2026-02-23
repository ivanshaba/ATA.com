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

  const [isLoading, setIsLoading] = useState(true);

  /* =========================
     LOGO LOADER ANIMATION
  ========================== */
  useEffect(() => {
    if (!loaderRef.current) return;

    /* 🔥 GLOW PULSE ANIMATION */
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
        glowAnimation.kill(); // stop glow when leaving

        gsap.to(loaderRef.current, {
          y: "-100%",
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: () => setIsLoading(false),
        });
      },
    });

    // Logo enters
    tl.from(".loader-logo", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power3.out",
    });

    // Logo moves up slightly
    tl.to(".loader-logo", {
      y: -20,
      duration: 0.8,
      ease: "power3.inOut",
    });

    // Title fades in
    tl.to(
      ".loader-title",
      {
        opacity: 1,
        y: -10,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Small pause
    tl.to({}, { duration: 1 });

    return () => {
      glowAnimation.kill();
    };
  }, []);

  /* =========================
     MAIN PAGE ANIMATIONS
  ========================== */
  useGSAP(
  () => {
    if (isLoading) return; // WAIT until loader is gone

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
      const slides: HTMLElement[] = gsap.utils.toArray(
        ".slide",
        slideshowRef.current
      );

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
  }, []);




  

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

            <h1 className="loader-title text-3xl font-semibold tracking-wide opacity-0">
             experience, reliability, guarantees            </h1>
          </div>
        </div>
      )}

      {/* PAGE CONTENT (unchanged below) */}
      <div className="flex flex-col items-center flex-nowrap p-5">
        <div
          ref={heroRef}
          className="relative w-full overflow-hidden pt-[116px] pb-[48px] md:pt-[128px] md:pb-[128px]"
        >
          <div
            ref={slideshowRef}
            className="absolute inset-0 z-0 overflow-hidden"
          >
            <div
              className="slide absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/one.jpg')" }}
            />
            <div
              className="slide absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/three.jpg')" }}
            />
            <div
              className="slide absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/two.jpg')" }}
            />
          </div>

          <div className="absolute inset-0 z-10 bg-black/60" />
          <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_70%)]" />

          <div className="relative z-30">
            <SectionHeading
              badge="Industrial Air Conditioning & Raw Material Supply"
              badgeClassName="bg-white/10 text-white border border-purple-400/40 backdrop-blur-sm"
              heading="Reliable Industrial & Commercial HVAC Solutions in Uganda. Installation, Maintenance & Energy Efficient Systems."
              icon={Sparkles}
              size="lg"
              align="center"
              as="h1"
              className="mx-auto max-w-5xl"
              headingClassName="md:mx-auto md:w-2/3 leading-tight text-white drop-shadow-lg"
              showDescriptionToScreenReaders
            />

            <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
                Contact Us
              </Button>

              <Button variant="outline" className="border-white text-black">
                View Our Projects
              </Button>
            </div>

            <div className="relative mt-16">
              <Marquee pauseOnHover>
                {caseStudies.map((caseStudy, index) => (
                  <div
                    key={`${caseStudy.name}-${index}`}
                    className="mx-4 flex-shrink-0"
                  >
                    <img
                      src={caseStudy.logo_src}
                      alt={caseStudy.name}
                      className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </Marquee>
            </div>

            <Carousel
              ref={caseStudiesRef}
              opts={{ align: "start" }}
              plugins={[Autoplay({ delay: 4000 })]}
              className="relative mt-20 w-full"
            >
              <CarouselContent>
                {caseStudies.map((caseStudy, index) => (
                  <CarouselItem
                    key={`${caseStudy.name}-carousel-${index}`}
                    className="md:basis-1/2 lg:basis-1/4"
                  >
                    <div className="w-full max-w-sm space-y-3 text-left">
                      <div className="group relative flex aspect-square items-center justify-center rounded-md bg-white/10 p-4 backdrop-blur-sm">
                        <img
                          src={caseStudy.main_image_src}
                          alt={`${caseStudy.name} preview`}
                          className="relative z-10 max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="space-y-1">
                        <p className="text-md text-white">
                          {caseStudy.project_title}
                        </p>
                        <p className="text-sm text-gray-300">
                          Industrial HVAC
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="left-0 z-50 size-9 border-0 bg-white/20 text-white" />
              <CarouselNext className="right-0 z-50 size-9 border-0 bg-white/20 text-white" />
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
