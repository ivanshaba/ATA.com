"use client";
import { forwardRef, useEffect, useRef, useState, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { SectionHeading as OriginalSectionHeading, SectionHeadingProps } from "@/components/custom/SectionHeading";
gsap.registerPlugin(ScrollTrigger);

/* ===============================
   Types
=================================*/
interface TestimonialType {
  name: string;
  founder_name?: string;
  position?: string;
  testimonial: string;
  rating?: number;
}

/* ===============================
   Testimonial Data
=================================*/
const testimonialsData: TestimonialType[] = [
  {
    name: "Apex Logistics Group",
    founder_name: "Daniel K.",
    position: "Operations Director",
    testimonial: "Their execution was structured, timely, and technically sound. From strategy to delivery, every detail was handled with precision. The results exceeded our internal performance benchmarks.",
    rating: 5,
  },
  {
    name: "NovaTech Solutions",
    founder_name: "Sarah M.",
    position: "Founder & CEO",
    testimonial: "What stood out most was their ability to understand our vision and translate it into measurable outcomes. The level of professionalism and consistency throughout the engagement was exceptional.",
    rating: 5,
  },
  {
    name: "Stratos Digital",
    founder_name: "Michael R.",
    position: "Head of Digital Strategy",
    testimonial: "We needed reliability and scalability — they delivered both. Their approach was methodical, performance-driven, and aligned perfectly with our long-term objectives.",
    rating: 4,
  },
  {
    name: "PrimeEdge Consulting",
    founder_name: "Grace N.",
    position: "Managing Director",
    testimonial: "Working with them improved our operational efficiency and strengthened our market positioning significantly. Communication was clear, deadlines were respected, and execution was flawless.",
    rating: 5,
  },
  {
    name: "Elevate Ventures",
    founder_name: "Brian T.",
    position: "Co-Founder",
    testimonial: "They brought clarity to our processes and elevated our brand presence beyond expectations. The partnership has been instrumental to our growth trajectory.",
    rating: 4,
  },
];

/* ===============================
   SectionHeading with ref support
=================================*/
export const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  (props, ref) => <OriginalSectionHeading ref={ref} {...props} />
);
SectionHeading.displayName = "SectionHeading";

/* ===============================
   Modern Testimonial Card Component
=================================*/
const TestimonialCard: React.FC<{ item: TestimonialType }> = ({ item }) => {
  const rating = item.rating ?? 0;
  return (
    <article className="relative flex h-full flex-col rounded-3xl bg-white/95 shadow-sm ring-1 ring-gray-100/50 p-6 transition-all duration-300 hover:shadow-md hover:scale-[1.01] backdrop-blur-sm">
      {/* Decorative quote */}
      <div className="absolute -top-3 left-4 text-5xl font-serif text-gray-200/50 select-none">“</div>
      <blockquote className="relative z-10 flex-1 text-gray-800 text-base leading-relaxed tracking-wide pt-3">
        {item.testimonial}
      </blockquote>
      {/* Rating */}
      {rating > 0 && (
        <div className="mt-4 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 transition-colors ${
                i < rating ? "text-amber-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}
      <div className="my-4 h-px w-full bg-gray-100" />
      <div className="space-y-0.5">
        <p className="text-gray-900 text-base font-semibold">{item.name}</p>
        {(item.founder_name || item.position) && (
          <p className="text-gray-500 text-xs font-medium">
            {item.founder_name}
            {item.founder_name && item.position && " · "}
            {item.position}
          </p>
        )}
      </div>
    </article>
  );
};

/* ===============================
   Main TestimonialSection Component
=================================*/
export default function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const testimonials = useMemo(() => testimonialsData, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);
  const progressTween = useRef<gsap.core.Tween | null>(null);
  const totalSlides = testimonials.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-play
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const startAutoPlay = () => {
      autoPlayTimer.current = setTimeout(() => {
        nextSlide();
      }, 5000);
    };
    startAutoPlay();
    return () => {
      if (autoPlayTimer.current) {
        clearTimeout(autoPlayTimer.current);
        autoPlayTimer.current = null;
      }
    };
  }, [currentIndex, isPaused, nextSlide, totalSlides]);

  // Progress bar animation
  useEffect(() => {
    if (!progressRef.current || isPaused || totalSlides <= 1) {
      if (progressTween.current) {
        progressTween.current.kill();
        progressTween.current = null;
      }
      return;
    }
    gsap.set(progressRef.current, { scaleX: 0 });
    progressTween.current = gsap.to(progressRef.current, {
      scaleX: 1,
      duration: 5,
      ease: "linear",
    });
    return () => {
      if (progressTween.current) {
        progressTween.current.kill();
        progressTween.current = null;
      }
    };
  }, [currentIndex, isPaused, totalSlides]);

  // Horizontal slide animation
  useEffect(() => {
    if (!slidesContainerRef.current || totalSlides === 0) return;
    const slideWidth = slidesContainerRef.current.children[0]?.clientWidth || 0;
    const gap = 24; // gap-6 = 1.5rem = 24px
    const translateX = -currentIndex * (slideWidth + gap);
    gsap.to(slidesContainerRef.current, {
      x: translateX,
      duration: 0.6,
      ease: "power3.out",
    });
    const cards = slidesContainerRef.current.children;
    gsap.to(cards, {
      opacity: (i) => (i === currentIndex ? 1 : 0.5),
      scale: (i) => (i === currentIndex ? 1 : 0.97),
      duration: 0.5,
    });
  }, [currentIndex, totalSlides]);

  // Heading animation
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (totalSlides === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-white px-4 py-12 sm:px-6 md:px-8 lg:px-12 lg:py-20"
    >
      <SectionHeading
        ref={headingRef}
        badge="Client Feedback"
        heading="Trusted by Industry Leaders"
        description="Our clients rely on us for precision, performance, and long-term reliability."
        size="md"
        align="center"
        as="h2"
        className="mb-12 text-gray-900"
      />
      <div
        className="relative max-w-5xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div ref={carouselRef} className="overflow-hidden px-4">
          <div ref={slidesContainerRef} className="flex gap-6" style={{ willChange: "transform" }}>
            {testimonials.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="w-full flex-shrink-0 md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>
        {/* Navigation */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 lg:-translate-x-5 bg-white/80 rounded-full p-2.5 shadow-sm hover:shadow-md transition-all hover:scale-105 ring-1 ring-gray-200/50"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="h-4 w-4 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 lg:translate-x-5 bg-white/80 rounded-full p-2.5 shadow-sm hover:shadow-md transition-all hover:scale-105 ring-1 ring-gray-200/50"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="h-4 w-4 text-gray-700" />
            </button>
          </>
        )}
        {/* Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-6 bg-indigo-500"
                    : "w-2 bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        )}
        {/* Progress bar */}
        {totalSlides > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-indigo-500 origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        )}
      </div>
    </section>
  );
}