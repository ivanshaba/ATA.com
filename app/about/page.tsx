"use client";

import "@/lib/GSAPAnimations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const workplaceContentRef = useRef<HTMLDivElement>(null);
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const imageGroupRefs = useRef<(HTMLDivElement | null)[]>(Array(2).fill(null));

  useGSAP(() => {
    // Hero section animation
    if (heroContentRef.current) {
      gsap.effects.fadeUpOnScroll(heroContentRef.current, {
        duration: 0.8,
        yOffset: 30,
        start: "top 85%",
      });
    }

    // Workplace content animation
    if (workplaceContentRef.current) {
      gsap.effects.fadeUpOnScroll(workplaceContentRef.current, {
        duration: 0.8,
        yOffset: 30,
        start: "top 85%",
      });
    }

    // Stats section animation
    if (statsSectionRef.current) {
      gsap.effects.fadeUpOnScroll(statsSectionRef.current, {
        duration: 0.8,
        yOffset: 30,
        start: "top 85%",
      });
    }

    // Stats grid stagger animation
    if (statsGridRef.current) {
      gsap.effects.staggerFadeUpOnScroll(statsGridRef.current, {
        duration: 0.6,
        yOffset: 20,
        stagger: 0.1,
        start: "top 85%",
      });
    }

    // Image group animations
    imageGroupRefs.current.forEach((ref) => {
      if (ref) {
        gsap.effects.fadeUpOnScroll(ref, {
          duration: 0.7,
          yOffset: 25,
          start: "top 80%",
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main id="main-content" role="main">
      {/* Hero Section */}
      <section className="py-32 mx-auto max-w-6xl px-5" aria-labelledby="about-heading">
        <div className="container">
          <div className="flex flex-col items-center justify-start gap-6 lg:flex-row">
            {/* Left Column */}
            <div className="flex w-full flex-col items-start justify-start gap-24 lg:w-1/2">
              <header ref={heroContentRef} className="pr-6">
                <h1
                  id="about-heading"
                  className="mb-6 text-4xl font-bold md:text-5xl lg:mb-10 lg:text-6xl"
                >
                  Our Story
                </h1>
                <p className="mb-9 text-lg font-medium lg:text-xl">
                  Delivering Reliable HVAC Solutions Across Uganda
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  At Ugandan HVAC Solutions, we specialize in installing, maintaining, and
                  optimizing heating, ventilation, and air conditioning systems for homes,
                  offices, and commercial buildings. Our mission is to provide energy-efficient,
                  cost-effective, and sustainable climate solutions that keep your spaces
                  comfortable year-round. Our expert technicians combine industry experience with
                  modern HVAC technologies to ensure every client receives top-quality service.
                </p>
              </header>

              {/* Hero Images */}
              <figure
                ref={(el) => {
                  imageGroupRefs.current[0] = el as HTMLDivElement;
                }}
                className="flex flex-col items-center justify-center gap-6 md:flex-row"
                role="group"
                aria-label="HVAC team and installations"
              >
                <img
                  src="/mad7.jpeg"
                  alt="HVAC technicians installing air conditioning units in an office"
                  className="aspect-[0.7] w-full rounded-lg object-cover md:w-1/2"
                  loading="eager"
                  decoding="sync"
                  width={400}
                  height={571}
                />
                <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                  <img
                    src="/mad8.jpeg"
                    alt="Commercial HVAC system installed in modern building"
                    className="aspect-[1.1] rounded-lg object-cover"
                    loading="lazy"
                    decoding="async"
                    width={300}
                    height={273}
                  />
                  <img
                    src="/mad3.jpeg"
                    alt="HVAC technician performing maintenance on a ventilation system"
                    className="aspect-[0.7] rounded-lg object-cover"
                    loading="lazy"
                    decoding="async"
                    width={300}
                    height={429}
                  />
                </div>
              </figure>
            </div>

            {/* Right Column */}
            <div className="flex w-full flex-col items-center justify-center gap-12 pt-12 lg:w-1/2 lg:pt-48">
              <figure
                ref={(el) => {
                  imageGroupRefs.current[1] = el as HTMLDivElement;
                }}
                className="flex flex-col items-center justify-center gap-6 md:flex-row"
                role="group"
                aria-label="HVAC installation and service images"
              >
                <img
                  src="/mad4.jpeg"
                  alt="HVAC team discussing project plans in modern office"
                  className="aspect-[0.9] w-full rounded-lg object-cover md:w-1/2"
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={444}
                />
                <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                  <img
                    src="/mad5.jpeg"
                    alt="Advanced HVAC equipment and technology used by the team"
                    className="aspect-[0.8] rounded-lg object-cover"
                    loading="lazy"
                    decoding="async"
                    width={300}
                    height={375}
                  />
                  <img
                    src="/mad6.jpeg"
                    alt="Technician installing HVAC system in building"
                    className="aspect-[0.9] rounded-lg object-cover"
                    loading="lazy"
                    decoding="async"
                    width={300}
                    height={333}
                  />
                </div>
              </figure>

              <article ref={workplaceContentRef} className="px-8">
                <h2 className="mb-8 text-2xl font-semibold lg:mb-6">Our Workplace</h2>
                <p className="mb-9 text-lg font-medium lg:text-xl">
                  Expertise, Safety, and Efficiency
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our team thrives in a culture focused on precision, safety, and customer
                  satisfaction. We train our technicians to handle all HVAC systems with
                  professionalism while leveraging the latest tools and technology. From large
                  commercial installations to residential service calls, we bring the same level
                  of care and quality to every project.
                </p>
              </article>
            </div>
          </div>

          {/* Stats Section */}
          <section
            ref={statsSectionRef}
            className="container flex flex-col gap-16 mt-24"
            aria-labelledby="stats-heading"
          >
            <header>
              <h2
                id="stats-heading"
                className="max-w-3xl text-4xl font-medium md:text-5xl"
              >
                We deliver results that matter
              </h2>
            </header>
            <div
              ref={statsGridRef}
              className="grid grid-cols-2 gap-6 md:grid-cols-3"
              role="region"
              aria-label="HVAC company statistics"
            >
              <div
                className="flex flex-col gap-6 border-b pb-8"
                role="article"
                aria-labelledby="stat-1"
              >
                <p id="stat-1" className="text-4xl font-medium md:text-5xl" aria-label="15 thousand plus">
                  15k+
                </p>
                <p className="text-muted-foreground">Satisfied Clients</p>
              </div>
              <div
                className="flex flex-col gap-6 border-b pb-8"
                role="article"
                aria-labelledby="stat-2"
              >
                <p id="stat-2" className="text-4xl font-medium md:text-5xl" aria-label="10 years">
                  10+
                </p>
                <p className="text-muted-foreground">Years in HVAC Industry</p>
              </div>
              <div
                className="flex flex-col gap-6 border-b pb-8"
                role="article"
                aria-labelledby="stat-3"
              >
                <p id="stat-3" className="text-4xl font-medium md:text-5xl" aria-label="200 projects">
                  200+
                </p>
                <p className="text-muted-foreground">Projects Completed</p>
              </div>
              <div
                className="flex flex-col gap-6 border-b pb-8"
                role="article"
                aria-labelledby="stat-4"
              >
                <p id="stat-4" className="text-4xl font-medium md:text-5xl" aria-label="5000 units installed">
                  5000+
                </p>
                <p className="text-muted-foreground">HVAC Units Installed</p>
              </div>
              <div
                className="flex flex-col gap-6 border-b pb-8"
                role="article"
                aria-labelledby="stat-5"
              >
                <p id="stat-5" className="text-4xl font-medium md:text-5xl" aria-label="120k service calls">
                  120k+
                </p>
                <p className="text-muted-foreground">Maintenance Calls Handled</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
