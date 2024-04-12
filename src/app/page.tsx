import "./globals.css";
import { Toaster } from "sonner";
import { HeroSection } from "@/components/landing-page/HeroSection";
import { FeaturesSection } from "@/components/landing-page/FeaturesSection";
import { BenefitsSection } from "@/components/landing-page/BenefitsSection";
import { FaqSection } from "@/components/landing-page/FaqSection";
import LandingPageHeader from "@/components/layout/LandingPageHeader";

export default function Home() {
  return (
    <>
      <Toaster richColors />
      <LandingPageHeader />

      <main className="flex relative w-full min-h-screen flex-col items-center m-auto">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />

        <FaqSection />
      </main>
    </>
  );
}
