"use client";

import { SectionHeading } from "@/components/custom/SectionHeading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ProcessType {
  title: string;
  tagline: string;
  description: string;
  bg_image: string;
  deliverables: {
    item: string;
  }[];
}

const ProcessCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const process: ProcessType[] = [
    {
      title: "Consultation & Needs Assessment",
      tagline: "Understanding Your HVAC Requirements",
      description:
        "We start by evaluating your facility’s cooling and ventilation needs. Our experts analyze your space, assess airflow, and understand your energy efficiency goals. This ensures we provide solutions that are safe, efficient, and tailored to your operations.",
      deliverables: [
        { item: "Site inspection and measurement" },
        { item: "Energy efficiency analysis" },
        { item: "Custom HVAC solution recommendations" },
      ],
      bg_image: "/process/consultation.jpg",
    },
    {
      title: "Design & System Planning",
      tagline: "Engineering Optimal HVAC Solutions",
      description:
        "Our engineering team designs your HVAC system using the latest tools and industry standards. We plan ductwork, air handling units, and control systems to ensure efficient cooling, ventilation, and integration with your facility.",
      deliverables: [
        { item: "Detailed HVAC system design" },
        { item: "CAD layouts for installation" },
        { item: "Material & equipment specification" },
      ],
      bg_image: "/process/design.jpg",
    },
    {
      title: "Installation & Material Supply",
      tagline: "Bringing the Design to Life",
      description:
        "We handle the delivery of high-quality HVAC components and materials, and professionally install your system. Our team ensures that all installations meet safety standards and provide optimal performance from day one.",
      deliverables: [
        { item: "Delivery of HVAC equipment and raw materials" },
        { item: "Professional system installation" },
        { item: "Quality and safety assurance checks" },
      ],
      bg_image: "/process/installation.jpg",
    },
    {
      title: "Commissioning & Maintenance",
      tagline: "Ensuring Long-Term Performance",
      description:
        "Once installed, we test and commission the HVAC system to ensure everything runs efficiently. We also provide ongoing maintenance support and advice to keep your system operating at peak performance for years.",
      deliverables: [
        { item: "System testing and commissioning" },
        { item: "Maintenance planning and support" },
        { item: "Performance optimization tips" },
      ],
      bg_image: "/process/commissioning.jpg",
    },
  ];

  useGSAP(() => {
    const slides = slidesRef.current;
    if (!slides.length || !headingRef.current || !sectionRef.current) return;

    const headerPin = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 5%",
      endTrigger: slidesRef.current[slidesRef.current.length - 2],
      end: "center top",
      pin: headingRef.current,
      pinSpacing: false,
      anticipatePin: 1,
    });

    slides.forEach((slide) => {
      if (!slide) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slide,
          start: "top 25%",
          end: "bottom top",
          scrub: 1,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        },
      });

      tl.from(slide, {
        scale: 0.8,
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.inOut",
      });
    });

    // Fade in heading
    if (headingRef.current) {
      gsap.effects.fadeUpOnScroll(headingRef.current, {
        start: "top 80%",
        duration: 0.8,
        markers: false,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const addSlideRef = (el: HTMLDivElement | null, index: number) => {
    if (el) slidesRef.current[index] = el;
  };

  return (
    <div ref={sectionRef} className="relative space-y-4 px-4 sm:px-6 lg:px-8">
      <SectionHeading
        ref={headingRef}
        badge="Our Proven HVAC Process"
        heading="How We Deliver Efficient HVAC Solutions"
        description="From initial consultation to long-term maintenance, our structured process ensures high-quality installations and reliable HVAC performance for industrial and commercial clients."
        size="md"
        align="center"
        as="h2"
        id="process-heading"
        className="mb-6 md:mb-14"
      />

      <div ref={containerRef} className="relative space-y-6">
        {process.map((slide, index) => (
          <div
            key={`slide-${index}`}
            ref={(el) => addSlideRef(el, index)}
            className="relative flex h-fit w-full items-center justify-center"
          >
            <div
              className="relative w-full rounded-lg bg-cover p-6 sm:p-8"
              style={{ backgroundImage: `url(${slide.bg_image})` }}
            >
              <div className="w-full space-y-3 rounded-md bg-white/20 p-4 backdrop-blur-lg sm:space-y-4 sm:p-6 md:max-w-7/12">
                <h3 className="text-h4 font-semibold text-heading">{slide.title}</h3>
                <p className="text-xs font-medium text-gray-700 sm:text-sm">💡 {slide.tagline}</p>
                <p className="text-sm text-gray-600 sm:text-base">{slide.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3 md:mt-8">
                  {slide.deliverables.map((dl, ix) => (
                    <li
                      key={`deliverable-${ix}`}
                      className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-xs tracking-wide"
                    >
                      {dl.item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute right-4 bottom-4">
                <span
                  className="text-6xl font-extrabold text-black/10 sm:text-7xl md:text-8xl lg:text-9xl"
                >
                  {index + 1}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessCards;
