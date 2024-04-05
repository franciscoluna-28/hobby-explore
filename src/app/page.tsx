"use client";

import "./globals.css";
import { Toaster } from "sonner";
import DarkModeLogo from "../../public/Logo-Dark.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/landing-page/HeroSection";
import { FeaturesSection } from "@/components/landing-page/FeaturesSection";
import { BenefitsSection } from "@/components/landing-page/BenefitsSection";
import { FaqSection } from "@/components/landing-page/FaqSection";
import { Input } from "@/components/ui/input";

export default function Home() {
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
          <ul className="gap-8 flex items-center">
            <li>
              <Button asChild variant="ghost">
                <Link className="text-sm w-full font-medium" href="/auth/login">
                  Login
                </Link>
              </Button>
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
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <FaqSection />
      </main>

      <footer className="w-full bg-mainBlack mt-32">
        <div className="flex flex-col min-w-full max-w-[1100px] items-center justify-center m-auto p-8 ">
          <div>
            <h4 className="text-white font-bold text-3xl max-w-[250px] text-center leading-normal m-auto">
              Subscribe To our Newsletter
            </h4>
            <span className="text-[#9d9d9d] text-sm mt-4 text-center m-auto flex justify-center">
              We&apos;re adding new features often!
            </span>
            <div className="flex mt-8 m-auto justify-center">
              <Input
                className="rounded-r-none w-min"
                placeholder="user@email.com"
              ></Input>
              <Button className="rounded-l-none">Subscribe</Button>
            </div>

            <article className="grid md:grid-cols-2 lg:grid-cols-4 mt-16 gap-16 m-auto justify-center max-w-[1000px] bg-[#252525] p-8 rounded-[16px] shadow-xl">
              <div className="">
                <h5 className="text-white font-semibold">Hobby Explore</h5>
                <span className="!mt-4 block text-footerGray text-sm">
                  We help you discover new interests and hobbies.
                </span>
              </div>
              <div className="">
                <h5 className="text-white font-semibold">Links</h5>
                <ul>
                  <li className="mt-4">
                    <Link
                      className="text-footerGray text-sm hover:text-gray duration-100"
                      href="#"
                    >
                      About
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="text-footerGray text-sm hover:text-gray duration-100"
                      href="#"
                    >
                      Guides
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="text-footerGray text-sm hover:text-gray duration-100"
                      href="#"
                    >
                      Terms and Conditions
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="">
                <h5 className="text-white font-semibold">About the Creator</h5>
                <ul>
                  <li className="mt-4">
                    <Link
                      className="text-footerGray text-sm hover:text-gray duration-100"
                      href="#"
                    >
                      Twitter
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="text-footerGray text-sm hover:text-gray duration-100"
                      href="#"
                    >
                      LinkedIn
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="text-footerGray text-sm hover:text-gray duration-100"
                      href="#"
                    >
                      Portfolio
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="">
                <h5 className="text-white font-semibold">Social Media</h5>
                <ul>
                  <li className="mt-4">
                    <Link
                      className="text-footerGray text-sm hover:text-gray duration-100"
                      href="#"
                    >
                      Twitter
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      className="text-footerGray text-sm hover:text-gray duration-100"
                      href="#"
                    >
                      Instagram
                    </Link>
                  </li>
                </ul>
              </div>
            </article>

            <span className="text-center text-footerGray w-full text-sm mt-16 block">
              © 2024 Hobby Explore. Developed by Francisco Luna.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
