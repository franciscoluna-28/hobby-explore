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
import { Input } from "@/components/ui/input";

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
        <div className="flex flex-col min-w-full max-w-[1100px] items-center justify-center m-auto p-8 ">
          <div>
          <h4 className="text-white font-bold text-3xl max-w-[250px] text-center leading-normal m-auto">Subscribe To our Newsletter</h4>
          <span className="text-[#9d9d9d] text-sm mt-4 text-center m-auto flex justify-center">We're adding new features often!</span>
          <div className="flex mt-8 m-auto flex justify-center">
<Input className="rounded-r-none w-min" placeholder="user@email.com"></Input>
<Button className="rounded-l-none">Subscribe</Button>
</div>

<article className="grid grid-cols-4 mt-16 gap-16 m-auto justify-center max-w-[1000px] bg-[#252525] p-8 rounded-[16px] shadow-xl">
<div className="">
    <h5 className="text-white font-semibold">Hobby Explore</h5>
   <span className="!mt-4 block text-footerGray text-sm">We help you discover new interests and hobbies.</span>
  </div>
  <div className="">
    <h5 className="text-white font-semibold">Links</h5>
    <ul>
      <li className="mt-4">
        <Link className="text-footerGray text-sm" href="#">About</Link>
      </li>
      <li className="mt-4">
        <Link className="text-footerGray text-sm" href="#">Guides</Link>
      </li>
      <li className="mt-4">
        <Link className="text-footerGray text-sm" href="#">Terms and Conditions</Link>
      </li>
    </ul>
  </div>
  <div className="">
    <h5 className="text-white font-semibold">About the Creator</h5>
    <ul>
      <li className="mt-4">
        <Link className="text-footerGray text-sm" href="#">Twitter</Link>
      </li>
      <li className="mt-4">
        <Link className="text-footerGray text-sm" href="#">LinkedIn</Link>
      </li>
      <li className="mt-4">
        <Link className="text-footerGray text-sm" href="#">Portfolio</Link>
      </li>
    </ul>
  </div>
  <div className="">
    <h5 className="text-white font-semibold">Social Media</h5>
    <ul>
      <li className="mt-4">
        <Link className="text-footerGray text-sm" href="#">Twitter</Link>
      </li>
      <li className="mt-4">
        <Link className="text-footerGray text-sm" href="#">Instagram</Link>
      </li>
    </ul>
  </div>

</article>

<span className="text-center text-footerGray w-full text-sm mt-16 block">© 2024 Hobby Explore. Developed by Francisco Luna.</span>

</div>
        </div>
      </footer>
    </>
  );
}
