"use client";

import "./globals.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database";
import { LoginWithGoogle } from "@/components/auth/LoginWithGoogle";
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
import Card1 from "../../public/cards/card-1.png"
import Card2 from "../../public/cards/card-2.png"
import Card3 from "../../public/cards/card-3.png"
import Card4 from "../../public/cards/card-4.png"
import Comments from "../../public/comments/comment-1.png";
import Comments2 from "../../public/comments/comment-2.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// Note: The 'use client' directive is needed for Google Authentication
const supabase = createClientComponentClient<Database>();

// TODO: CREATE SECTIONS AND REUSABLE COMPONENTS FOR CARDS AND ACCORDIONS
export default function Home() {
  return (
    <>
      <Toaster />
      <header className="w-full h-20 bg-white border-b px-4 lg:flex justify-center hidden ">
        <div className="max-w-[1050px] w-full flex">
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
      <main className="flex relative w-full min-h-screen flex-col items-center justify-between max-w-[1100px] m-auto px-8 lg:p-0">
        <section className="flex flex-col md:flex-row gap-16 w-full my-16 justify-between">
          <div className="lg:max-w-[500px] m-auto">
            <h1 className="font-semibold text-6xl leading-normal">
              Find your New Hobbies Today
            </h1>
            <p className="text-mainBlack/80 text-[18px] mt-8">
              Discover exciting pastimes, connect with fellow enthusiasts, and
              grow personally. Welcome to&nbsp;Hobby Explore, your gateway to a
              vibrant world of hobbies and innovation.
            </p>
            <Button className="mt-12">Try it for free</Button>
          </div>
          <div>
            <div className="relative mr-auto">
              <Swiper
                className="min-w-full lg:max-w-[500px] overflow-hidden p-4 shadow-md rounded-[36px] h-full min-h-full"
                spaceBetween={50}
                slidesPerView={1}
                
              >
                <SwiperSlide>
                  <Image width={0} height={0} className="w-full h-auto " src={Card1} alt="Activity 1"></Image>
                </SwiperSlide>
                <SwiperSlide>
                  <Image width={0} height={0} className="w-full h-auto" src={Card2} alt="Activity 2"></Image>
                </SwiperSlide>
                <SwiperSlide>
                  <Image width={0} height={0} className="w-full h-auto" src={Card3} alt="Activity 3"></Image>
                </SwiperSlide>
                <SwiperSlide>
                  <Image width={0} height={0} className="w-full h-auto" src={Card4} alt="Activity 4"></Image>
                </SwiperSlide>

              </Swiper>
            </div>
          </div>
        </section>
        <section className="w-full">
          <h2 className="font-semibold text-5xl text-left my-16 leading-normal">
            Our Features
          </h2>
          <ul className="flex gap-8 lg:gap-16 flex-col lg:flex-row">
            <FeaturesCard
              cardRole="profileVariant"
              title="User Profile"
              description="Share who you are to other users to let them know more about you."
            >
              <User fill="white" stroke="transparent" />
            </FeaturesCard>
            <FeaturesCard
              cardRole="profileVariant"
              title="Activities"
              description="Create your own activities and share them with the world."
            >
              <KeyboardMusic fill="transparent" stroke="white" />
            </FeaturesCard>
            <FeaturesCard
              cardRole="profileVariant"
              title="Tips"
              description="Explain your activities through tips. You can give advice or
              give explanations."
            >
              <ImagePlus fill="transparent" stroke="white" />
            </FeaturesCard>
          </ul>
        </section>

        <section className="w-full mt-16">
          <h2 className="font-semibold text-5xl text-left my-16 max-w-[500px] leading-normal">
            How Hobby Explore Will Help You
          </h2>
          <div className="flex gap-8 w-full flex-col lg:flex-row">
            <div className="w-full">
            <ul className="flex flex-col gap-8 lg:max-w-[500px]">
              <li className="flex gap-4 items-center">
                <div className="bg-mainGreen w-8 h-8 rounded-full flex items-center justify-center">
                  <Check className="text-white min-w-[40px]" />
                </div>
                <p className="text-mainBlack/80">
                  Explore a variety of hobbies and find new interests with ease.
                </p>
              </li>
              <li className="flex gap-4 items-center">
                <div className="bg-mainGreen w-8 h-8 rounded-full flex items-center justify-center">
                  <Check className="text-white min-w-[40px]" />
                </div>
                <p className="text-mainBlack/80">
                  Save favorite hobbies, rate them, and access helpful tips.
                </p>
              </li>
              <li className="flex gap-4 items-center">
                <div className="bg-mainGreen w-8 h-8 rounded-full flex items-center justify-center">
                  <Check className="text-white min-w-[40px]" />
                </div>
                <p className="text-mainBlack/80">
                  Share tips and insights to inspire others, while getting
                  inspired by their experiences.
                </p>
              </li>
              <li className="flex gap-4 items-center">
                <div className="bg-mainGreen w-8 h-8 rounded-full flex items-center justify-center">
                  <Check className="text-white w-4 min-w-[40px]" />
                </div>
                <p className="text-mainBlack/80">
                  Whether it&apos;s art, coding, or anything in between, find
                  your niche on our app with the categories.
                </p>
              </li>
              <li className="flex gap-4 items-center">
                <div className="bg-mainGreen w-8 h-8 rounded-full flex items-center justify-center">
                  <Check className="text-white w-4 min-w-[40px]" />
                </div>
                <p className="text-mainBlack/80">
                  Whether it&apos;s art, coding, or anything in between, find
                  your niche on our app with the categories.
                </p>
              </li>
            </ul>
            </div>

<div className="max-w-[500px] space-y-8 mt-6 lg:m-auto">
<Image width={0} height={0} className="w-full relative h-auto shadow-md rounded-[36px] border" src={Comments2} alt="Comments"></Image>
<Image width={0} height={0} className="w-full relative h-auto shadow-md rounded-[36px] border" src={Comments} alt="Comments"></Image>
</div>

          </div>




        </section>

        <section className="w-full mt-16">
          <h2 className="font-semibold text-5xl text-left my-16 max-w-[400px] leading-relaxed">
            Frequently Asked Questions
          </h2>

          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className=" text-[18px]">
                What is Hobby Explore?{" "}
              </AccordionTrigger>
              <AccordionContent className="text-darkGray">
                Hobby Explore is a unique application designed to help you
                discover exciting hobbies and activities. Whether you&apos;re
                seeking new adventures to embark on or looking to explore your
                interests further, Hobby Explore is your go-to platform.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className=" text-[18px]">
                How can Hobby Explore benefit me?{" "}
              </AccordionTrigger>
              <AccordionContent className="text-darkGray">
                Hobby Explore offers a treasure trove of hobby ideas and
                activities suited to your interests. By using our app, you can
                uncover new passions, connect with like-minded individuals, and
                enrich your life with fulfilling experiences.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className=" text-[18px]">
                How does Hobby Explore work?
              </AccordionTrigger>
              <AccordionContent className="text-darkGray">
                Hobby Explore simplifies your search for new hobbies. Browse our
                curated collection, select your interests, and get personalized
                recommendations. You can even create your own hobbies for a
                truly unique experience.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className=" text-[18px]">
                How can I get started with Hobby Explore?
              </AccordionTrigger>
              <AccordionContent className="text-darkGray">
                Visit our website, create an account, and start exploring.
                Whether you&apos;re a seasoned hobbyist or a newcomer, Hobby
                Explore welcomes you with open arms. Sign up effortlessly using
                your Google account with OAuth, or by registering with your
                email and password.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className=" text-[18px]">
                Is Hobby Explore suitable for all ages?
              </AccordionTrigger>
              <AccordionContent className="text-darkGray">
                Absolutely! Hobby Explore is designed to cater to individuals of
                all ages and interests. Whether you&apos;re a teenager eager to
                discover new hobbies or a retiree seeking fulfilling pastimes,
                our platform offers something for everyone. Our recommended age
                for users is 16 and above, ensuring a safe and enriching
                experience for all.{" "}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className=" text-[18px]">
                Why I built Hobby Explore?
              </AccordionTrigger>
              <AccordionContent className="text-darkGray">
                Hobby Explore is my dream realized - a place where we can freely
                share our creative passions and grow together as a community.
                Join me in building a space where every hobbyist&apos;s voice is
                celebrated.{" "}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

<footer className="w-full bg-mainBlack mt-32">
    <div className="text-sm text-[#A6A6A6] m-auto p-4 flex justify-center">
    © 2024 Hobby Explore. All rights reserved.
    </div>
</footer>

    </>
  );
}
