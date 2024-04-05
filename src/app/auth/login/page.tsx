"use client";

import { LoginWithGoogle } from "@/components/auth/LoginWithGoogle";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmailPasswordAuthSchema } from "@/schemas/EmaiPasswordAuthSchema";
import Link from "next/link";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import Tip from "../../../../public/tip.png"

export default function Login() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof EmailPasswordAuthSchema>>({
    resolver: zodResolver(EmailPasswordAuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const supabase = createClientComponentClient();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EmailPasswordAuthSchema>) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    console.log(error);

    if (error) {
      toast.error(error.message);
    }

    if (data.session) {
      router.push("/app/explore");
    }

    console.log(data);
  }

  return (
    <article className="grid lg:grid-cols-2 w-full grid-flow-row">
      <div className="min-h-full hidden lg:flex items-center relative">
        <Image
          alt="test"
          src="/login.png"
          width="1920"
          height="1080"
          className="aspect-square max-h-[700px] bg-cover object-cover"
        ></Image>
        <div className="absolute bottom-16 left-16 bg-ratingYellow p-4 rounded-[16px] shadow-lg">
        <span className="text-mainBlack font-semibold">Tip #1</span>
       <p className="text-sm mt-2 text-mainBlack">Still your body when you enter the water, and relax your hands and legs</p>
        </div>
      </div>
      <div className="items-center flex justify-center h-screen flex-col">
        <Form {...form}>
          <h1 className="font-semibold text-3xl text-mainBlack my-6 text-center max-w-[300px] leading-normal">
            Share your Unique Hobbies
          </h1>
          <div></div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="user@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    The email you&apos;ve created your account with.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="●●●●●●●●●" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Login
            </Button>
            <LoginWithGoogle supabase={supabase} />
            <div className="text-sm text-center text-darkGray">
              Don&apos;t have an account?{" "}
              <Link
                className="text-sm font-medium underline"
                href="/auth/register"
              >
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </article>
  );
}
