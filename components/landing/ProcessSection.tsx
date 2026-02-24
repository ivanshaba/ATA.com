"use client";

import { SectionHeading } from "@/components/custom/SectionHeading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface ProcessType {
  title: string;
  tagline: string;
  description: string;
  deliverables: {
    item: string;
  }[];
}

const ProcessCards: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const process: ProcessType[] = [
    {
      title: "Consultation & Needs Assessment",
      tagline: "Understanding Your HVAC Requirements",
      description:
        "We begin by evaluating your facility’s cooling and ventilation needs. Our experts assess airflow, operational demands, and energy efficiency goals to develop a tailored HVAC solution.",
      deliverables: [
        { item: "Site inspection and measurement" },
        { item: "Energy efficiency analysis" },
        { item: "Custom HVAC solution recommendations" },
      ],
    },
    {
      title: "Design & System Planning",
      tagline: "Engineering Optimal HVAC Solutions",
      description:
        "Our engineering team designs your HVAC system using modern tools and industry best practices. We ensure seamless integration, optimal airflow performance, and long-term reliability.",
      deliverables: [
        { item: "Detailed HVAC system design" },
        { item: "CAD layouts and schematics" },
        { item: "Material and equipment specification" },
      ],
    },
    {
      title: "Installation & Material Supply",
      tagline: "Bringing the Design to Life",
      description:
        "We supply high-quality HVAC equipment and execute professional installation. Every system is installed in compliance with safety standards and performance requirements.",
      deliverables: [
        { item: "Delivery of HVAC components" },
        { item: "Professional system installation" },
        { item: "Quality and safety inspections" },
      ],
    },
    {
      title: "Commissioning & Maintenance",
      tagline: "Ensuring Long-Term Performance",
      description:
        "After installation, we test and commission the system to ensure optimal functionality. We also provide maintenance planning and technical support for long-term efficiency.",
      deliverables: [
        { item: "System testing and commissioning" },
        { item: "Maintenance planning and support" },
        { item: "Performance optimization guidance" },
      ],
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from(".process-card", {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 sm:px-6 lg:px-8 py-20 bg-gray-50"
    >
      <SectionHeading
        badge="Our Proven HVAC Process"
        heading="How We Deliver Efficient HVAC Solutions"
        description="From consultation to commissioning, our structured process ensures efficient installations and reliable HVAC performance for industrial and commercial environments."
        size="md"
        align="center"
        as="h2"
        id="process-heading"
        className="mb-16"
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Vertical Timeline Line */}
        <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200 hidden md:block" />

        <div className="space-y-16">
          {process.map((step, index) => (
            <div
              key={index}
              className="process-card relative flex flex-col md:flex-row gap-6"
            >
              {/* Step Indicator */}
              <div className="relative flex items-start">
                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-semibold shadow-md">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
                <p className="text-sm font-medium text-primary mb-2">
                  {step.tagline}
                </p>

                <h3 className="text-xl font-semibold text-heading mb-4">
                  {step.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {step.description}
                </p>

                <div>
                  <h4 className="text-sm font-semibold uppercase text-gray-500 mb-3 tracking-wide">
                    Key Deliverables
                  </h4>

                  <ul className="space-y-2">
                    {step.deliverables.map((dl, ix) => (
                      <li
                        key={ix}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                        {dl.item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessCards;