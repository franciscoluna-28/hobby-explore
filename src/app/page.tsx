"use client";

import "./globals.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database";
import { Toaster } from "sonner";
import DarkModeLogo from "../../public/Logo-Dark.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { KeyboardMusic, User } from "lucide-react";
import { FeaturesCard } from "@/components/landing-page/FeaturesCard";
import Comments from "../../public/comments/comment-1.png";
import Comments2 from "../../public/comments/comment-2.png";
import { DEFAULT_ACTIVITIES } from "@/data/DefaultActivities";
import { ActivityCardReadOnly } from "@/components/activities/ActivityCardReadOnly";
import { HeroSection } from "@/components/landing-page/HeroSection";
import { FeaturesSection } from "@/components/landing-page/FeaturesSection";
import { BenefitsSection } from "@/components/landing-page/BenefitsSection";
import { FaqSection } from "@/components/landing-page/FaqSection";

export default function Home() {

  type Feature = {
    title: string;
    description: string;
    imageUrl: string;
  };

  type FAQ = {
    title: string;
    description: string;
  };

  const FEATURES: Feature[] = [
    {
      title: "Share who you are with the world",
      description:
        "Discover exciting pastimes, connect with fellow enthusiasts, and grow personally. Welcome to Hobby Explore, your gateway to a vibrant world of hobbies and innovation.",
      imageUrl: "/profile.png",
    },
    {
      title: "Discover your new passions",
      description:
        "Dive into a world of limitless discovery. At Hobby Explore, we invite you to explore the unexplored, to find new passions that ignite your soul and lead you to exciting adventures. Let curiosity be your guide and uncover what truly excites you!",
      imageUrl: "/profile.png",
    },
    {
      title: "Let the world find your hobbies",
      description:
        "Share your interests with the world and let your hobbies shine. At Hobby Explore, your community awaits to celebrate your passions and connect with fellow enthusiasts. Whether it's a lifelong pursuit or a newfound interest, showcase what makes you uniquely you!",
      imageUrl: "/profile.png",
    },
  ];

  return (
    <>
      <Toaster />
      <header className="w-full h-20 bg-white border-b lg:flex justify-center hidden">
        <div className="max-w-[1100px] w-full flex px-8">
          <div className="flex items-center">
            <Image
              src={DarkModeLogo}
              alt="Hobby Explore"
              className="h-16 w-auto"
            />
          </div>
          <div className="flex flex-row items-center w-full max-w-[1000px]">
            <ul className="flex gap-8 m-auto">
              <li>
                <Link className="text-sm text-mainBlack/80 link" href="#">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-sm text-mainBlack/80 link" href="#">
                  Features
                </Link>
              </li>
              <li>
                <Link className="text-sm text-mainBlack/80 link" href="#">
                  Benefits
                </Link>
              </li>
              <li>
                <Link className="text-sm text-mainBlack/80 link" href="#">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <ul className="gap-8 flex items-center min-w-[150px]">
            <li>
              <Link className="text-sm w-full font-medium" href="/auth/login">
                Login
              </Link>
            </li>
            <Button asChild>
              <Link className="" href="/auth/register">
                Sign Up
              </Link>
            </Button>
          </ul>
        </div>
      </header>
      <main className="flex relative w-full min-h-screen flex-col items-center m-auto">
        <HeroSection/>
        <FeaturesSection/>
        <BenefitsSection/>
        <FaqSection/>
     
      </main>

      <footer className="w-full bg-mainBlack mt-32">
        <div className="text-sm text-[#A6A6A6] m-auto p-4 flex justify-center">
          © 2024 Hobby Explore. All rights reserved.
        </div>
      </footer>
    </>
  );
}
