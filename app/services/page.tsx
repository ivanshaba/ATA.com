"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import "@/lib/GSAPAnimations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Link from "next/link";
import { useRef, useState } from "react";

// Service data with icons (using emoji as placeholders)
const servicesData = [
  {
    id: 1,
    title: "Residential HVAC Installation",
    description:
      "Expert installation of heating, ventilation, and air conditioning systems for homes, ensuring optimal comfort and energy efficiency.",
    icon: "🏠",
    category: "Installation",
    slug: "residential-hvac-installation",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Commercial HVAC Maintenance",
    description:
      "Comprehensive maintenance plans for commercial buildings to maximize system lifespan, reduce downtime, and maintain indoor air quality.",
    icon: "🏢",
    category: "Maintenance",
    slug: "commercial-hvac-maintenance",
    isFeatured: true,
  },
  {
    id: 3,
    title: "Industrial Cooling Systems",
    description:
      "Design, installation, and servicing of large-scale cooling solutions for industrial facilities, including chillers and cooling towers.",
    icon: "🏭",
    category: "Industrial",
    slug: "industrial-cooling-systems",
    isFeatured: true,
  },
  {
    id: 4,
    title: "Smart Thermostat Integration",
    description:
      "Upgrade your HVAC with smart thermostats for remote control, energy savings, and seamless integration with home automation systems.",
    icon: "📱",
    category: "Smart Home",
    slug: "smart-thermostat-integration",
    isFeatured: false,
  },
  {
    id: 5,
    title: "Ductwork Design & Installation",
    description:
      "Custom ductwork solutions for optimal airflow, energy efficiency, and improved indoor air quality in residential and commercial spaces.",
    icon: "🔧",
    category: "Installation",
    slug: "ductwork-design-installation",
    isFeatured: false,
  },
  {
    id: 6,
    title: "Indoor Air Quality Solutions",
    description:
      "Advanced air purification, humidification, and ventilation systems to create healthier indoor environments.",
    icon: "💨",
    category: "Air Quality",
    slug: "indoor-air-quality-solutions",
    isFeatured: false,
  },
  {
    id: 7,
    title: "Emergency Repair Services",
    description:
      "24/7 emergency repair services for all HVAC systems, ensuring quick response and reliable fixes when you need them most.",
    icon: "🚨",
    category: "Repair",
    slug: "emergency-repair-services",
    isFeatured: false,
  },
  {
    id: 8,
    title: "Energy Efficiency Audits",
    description:
      "Detailed assessments of your HVAC system to identify energy-saving opportunities and reduce utility costs.",
    icon: "📊",
    category: "Consultation",
    slug: "energy-efficiency-audits",
    isFeatured: false,
  },
];

const serviceCategories = [
  "All",
  ...new Set(servicesData.map((s) => s.category)),
];

gsap.registerPlugin(ScrollTrigger);

function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const featuredRef = useRef(null);
  const servicesGridRef = useRef(null);
  const ctaRef = useRef(null);

  const filteredServices =
    selectedCategory === "All"
      ? servicesData.filter((s) => !s.isFeatured)
      : servicesData.filter(
          (s) => !s.isFeatured && s.category === selectedCategory
        );

  const featuredServices = servicesData.filter((s) => s.isFeatured);

  useGSAP(() => {
    // Hero heading
    SplitText.create(".services-heading", {
      type: "lines, words",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.words, {
          duration: 0.6,
          y: 10,
          opacity: 0.5,
          filter: "blur(6px)",
          autoAlpha: 0,
          stagger: 0.06,
        });
      },
    });

    // Process section
    if (processRef.current) {
      gsap.effects.fadeUpOnScroll(processRef.current, {
        start: "top 80%",
        duration: 0.8,
      });
    }

    // Featured services
    if (featuredRef.current) {
      gsap.effects.staggerFadeUpOnScroll(featuredRef.current, {
        start: "top 80%",
        duration: 0.7,
        stagger: 0.15,
        childSelector: ".featured-card",
      });
    }

    // Services grid
    if (servicesGridRef.current) {
      gsap.effects.staggerFadeUpOnScroll(servicesGridRef.current, {
        start: "top 85%",
        duration: 0.7,
        stagger: 0.1,
        childSelector: ".service-card",
      });
    }

    // CTA section
    if (ctaRef.current) {
      gsap.effects.fadeUpOnScroll(ctaRef.current, {
        start: "top 85%",
        duration: 0.8,
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="min-h-screen w-full">
      <main id="main-content" role="main">
        <div className="mx-auto max-w-6xl px-5">
          {/* Hero Section */}
          <section
            ref={heroRef}
            className="hero space-y-4 text-center pt-[116px] pb-[48px] md:pt-[128px] md:pb-[64px] lg:pt-[140px] lg:pb-[80px]"
            role="banner"
          >
            <div className="bg-tag-bg w-fit rounded-3xl px-6 py-1 mx-auto">
              <p className="text-tag align-middle text-sm">
                <span className="mt-1.5 mr-2 inline-block self-center" aria-hidden="true">
                  🔧
                </span>
                Professional HVAC Services in Kampala & Uganda
              </p>
            </div>

            <h1 className="services-heading text-h1 text-text-heading !text-center font-semibold md:mx-auto md:w-2/3">
              Comprehensive HVAC Solutions for Every Need
            </h1>

            <p className="text-caption text-label md:mx-auto md:w-2/3">
              From installation and maintenance to emergency repairs and energy audits, our expert
              team delivers reliable, efficient HVAC services tailored to residential, commercial,
              and industrial clients.
            </p>
          </section>

          {/* How We Work Process Section */}
          <section
            ref={processRef}
            className="mb-20"
            aria-labelledby="process-heading"
          >
            <h2 id="process-heading" className="text-h2 text-text-heading font-semibold text-center mb-12">
              Our Process
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Consultation",
                  desc: "We assess your needs, inspect your current system, and discuss your goals.",
                },
                {
                  step: "2",
                  title: "Customized Proposal",
                  desc: "We provide a detailed plan with transparent pricing and timelines.",
                },
                {
                  step: "3",
                  title: "Professional Execution",
                  desc: "Our certified technicians deliver top-quality service with minimal disruption.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-h5 font-semibold mb-2">{item.title}</h3>
                  <p className="text-label text-caption">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Core Services */}
          <section
            ref={featuredRef}
            className="mb-20"
            aria-labelledby="core-services-heading"
          >
            <h2 id="core-services-heading" className="text-h2 text-text-heading font-semibold mb-8">
              Core Services
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {featuredServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="featured-card group block p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4" aria-hidden="true">
                    {service.icon}
                  </div>
                  <h3 className="text-h5 font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-label text-caption mb-4">{service.description}</p>
                  <Badge variant="outline">{service.category}</Badge>
                </Link>
              ))}
            </div>
          </section>

          {/* All Services with Filter */}
          <section
            ref={servicesGridRef}
            className="mb-20"
            aria-labelledby="all-services-heading"
          >
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <h2 id="all-services-heading" className="text-h2 text-text-heading font-semibold">
                All Services
              </h2>
              <div className="flex flex-wrap gap-2" role="tablist">
                {serviceCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    role="tab"
                    aria-selected={selectedCategory === category}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="service-card group block p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4" aria-hidden="true">
                    {service.icon}
                  </div>
                  <h3 className="text-h5 font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-label text-caption mb-4 line-clamp-3">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{service.category}</Badge>
                    <span className="text-sm font-medium text-primary group-hover:underline">
                      Learn More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-label text-lg">No services found for this category.</p>
                <Button variant="outline" className="mt-4" onClick={() => setSelectedCategory("All")}>
                  Show All
                </Button>
              </div>
            )}
          </section>

          {/* Call to Action */}
          <section
            ref={ctaRef}
            className="mb-16 p-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl text-center"
            aria-labelledby="cta-heading"
          >
            <h2 id="cta-heading" className="text-h3 font-semibold mb-4">
              Ready to optimize your HVAC system?
            </h2>
            <p className="text-label text-lg mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote. Our team is ready to help you achieve
              comfort and efficiency.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ServicesPage;