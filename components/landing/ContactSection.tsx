"use client";

import { SectionHeading } from "@/components/custom/SectionHeading";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import "@/lib/GSAPAnimations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

function ContactUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    terms: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xxxxxxx"; // replace with your endpoint

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [id]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (!formData.terms) {
      setStatus("error");
      setErrorMessage("You must accept the terms.");
      return;
    }

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", terms: false });
      } else {
        const data = await response.json();
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  useGSAP(() => {
    if (headingRef.current) {
      gsap.effects.fadeUpOnScroll(headingRef.current, {
        start: "top 80%",
        duration: 0.8,
        markers: false,
      });
    }

    if (formRef.current) {
      gsap.effects.staggerFadeUpOnScroll(formRef.current, {
        start: "top 85%",
        duration: 0.5,
        yOffset: 40,
        ease: "sine.out",
        once: true,
        stagger: 0.15,
        childSelector: "form > *",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12 lg:py-24"
      aria-labelledby="contact-heading"
      role="region"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <SectionHeading
        ref={headingRef}
        badge="Contact Us"
        heading="Get in Touch"
        description="Contact ATA for your industrial HVAC needs."
        size="md"
        align="center"
        as="h2"
        id="contact-heading"
        className="mb-6 sm:mb-8 md:mb-14"
        showDescriptionToScreenReaders={true}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 xl:gap-10">
        {/* Left Column – Form */}
        <div className="lg:col-span-1">
          <div ref={formRef} className="space-y-4 sm:space-y-6">
            {status === "success" && (
              <div className="rounded-md bg-green-50 p-4 text-green-800">
                Thank you! Your message has been sent.
              </div>
            )}
            {status === "error" && (
              <div className="rounded-md bg-red-50 p-4 text-red-800">
                {errorMessage || "Failed to send. Please try again."}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-text-heading text-sm font-medium sm:text-base">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="focus:border-primary focus:ring-primary w-full border-gray-200 h-10 sm:h-11"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === "loading"}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-text-heading text-sm font-medium sm:text-base">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="focus:border-primary focus:ring-primary w-full border-gray-200 h-10 sm:h-11"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === "loading"}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-text-heading text-sm font-medium sm:text-base">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Type your message..."
                  rows={4}
                  className="focus:border-primary focus:ring-primary min-h-32 sm:min-h-40 w-full resize-none border-gray-200"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === "loading"}
                />
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  className="mt-1"
                  checked={formData.terms}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, terms: checked === true }))
                  }
                  required
                  disabled={status === "loading"}
                />
                <div className="text-label text-xs sm:text-sm">
                  <label htmlFor="terms" className="cursor-pointer">
                    I accept the{" "}
                    <a
                      href="#"
                      className="text-primary hover:text-primary/80 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms
                    </a>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 w-full py-3 sm:py-4 font-medium text-white text-sm sm:text-base"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column – Live Google Map */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.123456789!2d32.58291671526388!3d0.313456123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc77b307f133%3A0x44050e56f2a2788d!2sATA%20Industrial%20HVAC!5e0!3m2!1sen!2sug!4v1698888888888!5m2!1sen!2sug"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="ATA Industrial HVAC Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;