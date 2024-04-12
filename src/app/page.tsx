import "./globals.css";
import { Toaster } from "sonner";
import { HeroSection } from "@/components/landing-page/HeroSection";
import { FeaturesSection } from "@/components/landing-page/FeaturesSection";
import { BenefitsSection } from "@/components/landing-page/BenefitsSection";
import { FaqSection } from "@/components/landing-page/FaqSection";
import LandingPageHeader from "@/components/layout/LandingPageHeader";
import LandingPageFooter from "@/components/layout/LandingPageFooter";
import { getCurrentUser } from "@/services/auth";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <Toaster richColors />
      <LandingPageHeader user={user} />
      <main className="flex relative w-full min-h-screen flex-col items-center m-auto">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <FaqSection />
        <LandingPageFooter />
      </main>
    </>
  );
}
