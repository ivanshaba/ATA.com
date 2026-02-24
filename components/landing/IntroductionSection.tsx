"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { CheckCircle2, Users, Wrench, Clock } from "lucide-react";
import { SectionHeading } from "@/components/custom/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "15+", label: "Years Experience", icon: Clock },
  { value: "200+", label: "Projects Completed", icon: Wrench },
  { value: "500+", label: "Happy Clients", icon: Users },
  { value: "24/7", label: "Support Available", icon: CheckCircle2 },
];

const IntroductionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (textRef.current) {
      gsap.effects.fadeUpOnScroll(textRef.current, {
        start: "top 80%",
        duration: 0.8,
      });
    }
    if (statsRef.current) {
      gsap.effects.staggerFadeUpOnScroll(statsRef.current, {
        start: "top 85%",
        duration: 0.6,
        stagger: 0.2,
        childSelector: ".stat-item",
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 py-16 md:py-24 lg:px-8"
      aria-labelledby="introduction-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <div ref={textRef} className="mb-12 text-center md:mb-16">
          <SectionHeading
            badge="About ATA"
            heading="Your Trusted HVAC Partner in Uganda"
            description="With over 15 years of experience, we deliver robust industrial and commercial HVAC solutions tailored to East Africa's unique climate and business needs."
            align="center"
            size="lg"
            as="h2"
            id="introduction-heading"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left column: detailed text */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              ATA is a premier provider of industrial air conditioning, 
              ventilation, and raw material supply across Uganda. We specialize in 
              designing, installing, and maintaining HVAC systems for factories, 
              hospitals, office complexes, and retail chains.
            </p>
            <p className="text-gray-600">
              Our team of certified engineers understands the challenges of operating 
              in tropical climates. We combine international standards with local 
              expertise to ensure your facilities stay comfortable, efficient, and 
              operational year‑round.
            </p>
            <ul className="space-y-3">
              {[
                "Custom HVAC design for new constructions and retrofits",
                "Energy audits and efficiency optimization",
                "Reliable maintenance and 24/7 emergency support",
                "Genuine raw materials and spare parts supply",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: stats and possibly an image */}
          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="stat-item flex flex-col items-center rounded-xl bg-blue-50 p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <Icon className="mb-3 h-8 w-8 text-blue-600" />
                  <span className="text-2xl font-bold text-blue-900">{stat.value}</span>
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </div>
              );
            })}
            <div className="col-span-2 mt-4 text-center text-sm text-gray-500">
              *Serving Kampala, Entebbe, Jinja, and nationwide
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;