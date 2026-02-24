"use client";

import { SectionHeading } from "@/components/custom/SectionHeading";
import type { CaseStudyType } from "@/data/caseStudies";
import { caseStudies } from "@/data/caseStudies";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect, useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

interface TestimonialCardProps {
  item: CaseStudyType;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ item, index }) => {
  const hasTestimonial =
    Boolean(item.testimonial && item.testimonial.trim().length > 0);

  if (!hasTestimonial) return null;

  return (
    <article
      className="testimonial-card group relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary-200 hover:shadow-xl"
      role="article"
    >
      {/* Large opening quote mark */}
      <div className="absolute -top-6 left-6 text-8xl font-serif text-primary-100 select-none">
        “
      </div>

      {/* Testimonial text */}
      <blockquote className="relative z-10 flex-1 text-gray-700 text-lg leading-relaxed">
        {item.testimonial}
      </blockquote>

      {/* Rating stars – only render if rating exists */}
      {item.rating && (
        <div className="mt-4 flex items-center gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-5 w-5 ${i < item.rating! ? "fill-current" : "fill-gray-300"}`}
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="my-6 h-px w-full bg-gray-200" />

      {/* Company/person info */}
      <div className="space-y-1">
        <p className="text-gray-900 text-base font-semibold">{item.name}</p>
        {/* Show founder and position if either exists */}
        {(item.founder_name || item.position) && (
          <p className="text-gray-500 text-sm">
            {item.founder_name && item.founder_name}
            {item.founder_name && item.position && " — "}
            {item.position && item.position}
          </p>
        )}
      </div>
    </article>
  );
};

function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Memoize filtered testimonials to avoid re-filtering on every render
  const testimonials = useMemo(
    () =>
      caseStudies.filter(
        (cs) => cs.testimonial && cs.testimonial.trim().length > 0
      ),
    []
  );

  // Reset currentSlide if it goes out of bounds (e.g., if data changes)
  useEffect(() => {
    if (currentSlide >= testimonials.length) {
      setCurrentSlide(0);
    }
  }, [testimonials.length, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev - 1 < 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useGSAP(() => {
    if (!sectionRef.current) return;

    const triggers: ScrollTrigger[] = [];

    // Heading animation
    if (headingRef.current) {
      const headingAnim = gsap.from(headingRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        paused: true,
      });
      const trigger = ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 85%",
        onEnter: () => headingAnim.play(),
        onEnterBack: () => headingAnim.play(),
        once: true,
      });
      triggers.push(trigger);
    }

    // Cards stagger animation
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".testimonial-card");
      if (cards.length) {
        const cardsAnim = gsap.from(cards, {
          opacity: 0,
          y: 50,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          paused: true,
        });
        const trigger = ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 85%",
          onEnter: () => cardsAnim.play(),
          onEnterBack: () => cardsAnim.play(),
          once: true,
        });
        triggers.push(trigger);
      }
    }

    // Clean up only our ScrollTriggers
    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []); // Empty deps – animations run once on mount; if testimonials could change, add testimonials as dep.

  return (
    <section
      ref={sectionRef}
      className="bg-gray-50 px-4 py-16 sm:px-6 md:px-8 lg:px-12 lg:py-24"
      aria-labelledby="testimonials-heading"
    >
      <SectionHeading
        ref={headingRef}
        badge="Client Feedback"
        heading="Trusted by Industry Leaders"
        description="Our clients rely on us for precision, performance, and long-term reliability."
        size="md"
        align="center"
        as="h2"
        id="testimonials-heading"
        className="mb-16"
      />

      {/* Desktop Grid */}
      <div
        ref={gridRef}
        className="hidden lg:grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {testimonials.map((item, index) => (
          <TestimonialCard
            key={`${item.name}-${index}`}  // Use combination of name and index for uniqueness
            item={item}
            index={index}
          />
        ))}
      </div>

      {/* Mobile/Tablet Carousel (only if testimonials exist) */}
      {testimonials.length > 0 && (
        <div className="relative lg:hidden" aria-live="polite">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out will-change-transform"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((item, index) => (
                <div
                  key={`mobile-${item.name}-${index}`}  // Use name and index for uniqueness
                  className="w-full flex-shrink-0 px-4"
                  aria-hidden={index !== currentSlide}
                >
                  <TestimonialCard item={item} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel controls (only if more than one) */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="h-5 w-5 text-gray-700" />
              </button>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-6" role="tablist">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 w-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      i === currentSlide
                        ? "bg-primary-600 w-4"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                    role="tab"
                    aria-selected={i === currentSlide}
                    aria-controls={`testimonial-slide-${i}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default Testimonial;