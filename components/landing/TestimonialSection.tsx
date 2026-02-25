"use client";

import { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  SectionHeading as OriginalSectionHeading,
  SectionHeadingProps,
} from "@/components/custom/SectionHeading";

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
   Data
=================================*/
const testimonialsData: TestimonialType[] = [
  {
    name: "Apex Logistics Group",
    founder_name: "Daniel K.",
    position: "Operations Director",
    testimonial:
      "Their execution was structured, timely, and technically sound. From strategy to delivery, every detail was handled with precision. The results exceeded our internal performance benchmarks.",
    rating: 5,
  },
  {
    name: "NovaTech Solutions",
    founder_name: "Sarah M.",
    position: "Founder & CEO",
    testimonial:
      "What stood out most was their ability to understand our vision and translate it into measurable outcomes. The level of professionalism and consistency throughout the engagement was exceptional.",
    rating: 5,
  },
  {
    name: "Stratos Digital",
    founder_name: "Michael R.",
    position: "Head of Digital Strategy",
    testimonial:
      "We needed reliability and scalability — they delivered both. Their approach was methodical, performance-driven, and aligned perfectly with our long-term objectives.",
    rating: 4,
  },
  {
    name: "PrimeEdge Consulting",
    founder_name: "Grace N.",
    position: "Managing Director",
    testimonial:
      "Working with them improved our operational efficiency and strengthened our market positioning significantly. Communication was clear, deadlines were respected, and execution was flawless.",
    rating: 5,
  },
  {
    name: "Elevate Ventures",
    founder_name: "Brian T.",
    position: "Co-Founder",
    testimonial:
      "They brought clarity to our processes and elevated our brand presence beyond expectations. The partnership has been instrumental to our growth trajectory.",
    rating: 4,
  },
];

/* ===============================
   SectionHeading with ref support
=================================*/
export const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  (props, ref) => {
    return <OriginalSectionHeading ref={ref} {...props} />;
  }
);
SectionHeading.displayName = "SectionHeading";

/* ===============================
   Testimonial Card
=================================*/
const TestimonialCard: React.FC<{ item: TestimonialType }> = ({ item }) => {
  const rating = item.rating ?? 0;

  return (
    <article className="testimonial-card group relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary-200 hover:shadow-xl">
      <div className="absolute -top-6 left-6 text-8xl font-serif text-primary-100 select-none">“</div>

      <blockquote className="relative z-10 flex-1 text-gray-700 text-lg leading-relaxed">
        {item.testimonial}
      </blockquote>

      {rating > 0 && (
        <div className="mt-4 flex items-center gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-5 w-5 ${i < rating ? "fill-current" : "fill-gray-300"}`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      <div className="my-6 h-px w-full bg-gray-200" />

      <div className="space-y-1">
        <p className="text-gray-900 text-base font-semibold">{item.name}</p>
        {(item.founder_name || item.position) && (
          <p className="text-gray-500 text-sm">
            {item.founder_name}
            {item.founder_name && item.position && " — "}
            {item.position}
          </p>
        )}
      </div>
    </article>
  );
};

/* ===============================
   Main Testimonial Component
=================================*/
export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonials = useMemo(() => testimonialsData, []);

  /* Slide navigation */
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 < 0 ? testimonials.length - 1 : prev - 1));

  /* GSAP Animations */
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

      gsap.from(".testimonial-card", {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Auto-slide for mobile */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000); // slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-gray-50 px-4 py-16 sm:px-6 md:px-8 lg:px-12 lg:py-24"
    >
      <SectionHeading
        ref={headingRef}
        badge="Client Feedback"
        heading="Trusted by Industry Leaders"
        description="Our clients rely on us for precision, performance, and long-term reliability."
        size="md"
        align="center"
        as="h2"
        className="mb-16"
      />

      {/* Desktop Grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((item, index) => (
          <TestimonialCard key={`${item.name}-${index}`} item={item} />
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="relative lg:hidden">
        <div className="overflow-hidden min-h-[300px]">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((item, index) => (
              <div key={`mobile-${item.name}-${index}`} className="w-full flex-shrink-0 px-4">
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {testimonials.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-700" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}