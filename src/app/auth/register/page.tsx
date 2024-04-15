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
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TipsSliderAuth } from "@/components/tips/TipsSliderAuth";

export default function Register() {
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
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message);
    }

    if (data.session?.user) {
      router.push("/app/explore");
    }
  }

  return (
    <article className="grid lg:grid-cols-2 w-full grid-flow-row">
      <div className="min-h-full items-center hidden lg:flex relative">
      
<TipsSliderAuth/>
      </div>
      <div className="items-center flex justify-center h-screen flex-col w-full">
        <Form {...form}>
          <h1 className="font-semibold text-3xl text-mainBlack my-6 text-center max-w-[300px] leading-normal dark:text-white">
            Share your Unique Hobbies
          </h1>
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
              Sign up
            </Button>
            <LoginWithGoogle supabase={supabase} />
            <div className="text-sm text-center text-darkGray">
              Already have an account?{" "}
              <Link
                className="text-sm font-medium underline"
                href="/auth/login"
              >
                Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </article>
  );
}
