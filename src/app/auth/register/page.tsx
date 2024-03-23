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
import { redirect } from "next/navigation";

export default function Register() {


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

    if(error) {
      toast.error(error.message);
    }

    if(data.session?.user) {
      redirect("/app/explore");
    }

    console.log(data);
  }

  return (
    <Form {...form}>
      <h1 className="font-semibold text-3xl text-mainBlack my-6">Register</h1>
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
                The email that'll be used for your registration.
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
        <Button type="submit">Register</Button>
        <div>
          <Link className="text-sm font-medium" href="/auth/login">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
