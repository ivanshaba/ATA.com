import HeroSection from "@/components/landing/HeroSection";
import CaseStudiesSection from "@/components/landing/CaseStudiesSection";
import ContactSection from "@/components/landing/ContactSection";
import IntroductionSection from "@/components/landing/IntroductionSection";
import ProcessSection from "@/components/landing/ProcessSection";
import TestimonialSection from "@/components/custom/TestimonialSection";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata("home");

export default function Home() {
  return (
    <main id="main-content" role="main">
      <HeroSection />
      <IntroductionSection />
      <CaseStudiesSection />
      <ProcessSection />
      <TestimonialSection />
      <ContactSection />
    </main>
  );
}