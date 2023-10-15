"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AiOutlineMail } from "react-icons/ai";
import { BsLock } from "react-icons/bs";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { TIPS } from "@/database/tips-placeholder";
import { useState } from "react";
import Animatepresence, { AnimatePresence, motion } from "framer-motion";
import Motion from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import ImageSlider from "@/components/landing-page/ImageSlider";

const formSchema = z.object({
  email: z.string().min(2).email({
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function Home() {
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);

  const router = useRouter();
  const supabase = createClientComponentClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    if (data) {
      router.refresh();
    }
  }
  async function loginWithTwitter() {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (data) {
    }
  }

  // Cambia de tip cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTipIndex((prevIndex: number) => (prevIndex + 1) % TIPS.length);
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const variants = {
    initial: { x: -100, opacity: 0 }, // Fuera de la pantalla a la izquierda
    animate: { x: 0, opacity: 1 }, // En pantalla
    exit: { x: 100, opacity: 0 }, // Fuera de la pantalla a la derecha
  };

  return (
    <main className="overflow-y-hidden h-screen">
      <section className="grid grid-cols-1 md:grid-cols-2 h-screen">
        {/* Landing page aesthetics and details */}
        <div className="h-screen items-center justify-center relative w-full hidden md:flex">
        <ImageSlider rotationDegree={-10}/>

        <ImageSlider rotationDegree={10}/>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTipIndex}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              className="opacity-0 absolute lg:opacity-100 bg-mainYellow z-50 rounded-2xl p-4 shadow-lg bottom-16 max-xl:bottom-32 "
            >
              <div className="">
                <Badge>Tip #{currentTipIndex + 1}</Badge>
                <p className="text-sm mt-2">{TIPS[currentTipIndex]}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Actual form where users are able to login */}
        <div className="h-screen bg-white flex items-center justify-center flex-col relative p-8 md:p-16 lg:p-32">
          <div className="flex flex-col">
            <h1 className="font-normal text-3xl max-w-lg text-mainBlack uppercase text-center leading-relaxed">
              Share your unique
            </h1>
            <div className="m-auto">
              <TypeAnimation
                className="flex justify-center text-center !uppercase !text-3xl !text-mainBlack"
                sequence={[
                  "Hobbies",
                  2000,
                  "Experiences",
                  2000,
                  "Memories",
                  2000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{
                  fontSize: "2em",
                  display: "inline-block",
                  justifyContent: "center",
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              />
            </div>
            <span className="text-mainBlack/80 leading-relaxed pt-2 block text-center ">
              Explore exciting hobbies and learn how to create and share them
              with others.
            </span>
          </div>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 text-mainBlack/80 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
              or
            </span>
          </div>
          <div className="mt-4 w-full flex gap-2 justify-center max-w-sm">
            <Button
              onClick={loginWithGoogle}
              className="bg-white border transition-shadow duration-300 hover:shadow-lg rounded-xl hover:bg-white items-center p-4 w-full flex justify-center"
            >
              <Image
                className="h-6 w-6"
                src={"/images/google.svg"}
                alt="Google logo"
                width={16}
                height={16}
              />
            </Button>
            <Button
              onClick={loginWithTwitter}
              className="bg-white border transition-shadow duration-300 hover:shadow-lg rounded-xl hover:bg-white items-center p-4 w-full flex justify-center"
            >
              <Image
                className="h-6 w-6"
                src={"/images/x.svg"}
                alt="Google logo"
                width={16}
                height={16}
              />
            </Button>
          </div>
          <div className="w-full mt-4">
            <Form {...form}>
              <form method="post" className="space-y-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-2">Email </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter a valid email direction"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-2">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="bg-mainBlack w-full !py-4 rounded-full"
                  formAction="auth/sign-in"
                  type="submit"
                >
                  Login
                </Button>
                <div className="!mt-6 flex justify-between">
                  <Link
                    className="text-sm no-underline hover:underline underline-offset-4"
                    href="/register"
                  >
                    Sign Up
                  </Link>
                  <Link
                    className="text-sm no-underline hover:underline underline-offset-4"
                    href="/register"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
}
