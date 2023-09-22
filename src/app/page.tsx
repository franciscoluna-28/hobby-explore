"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function Home() {
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

  return (
    <main className="overflow-y-hidden!">
      <section className="w-full flex justify-center flex-col items-center m-auto p-32">
      <h1 className="font-bold text-4xl text-mainBlack">Welcome!</h1>
      <span className="text-mainBlack pt-2 block font-light">Sharing your pro tips of your hobbies with whom also like to do them.</span>
      <div className="mt-4 w-full">
      <Button
        onClick={loginWithGoogle}
        className="bg-mainGray items-center p-4 w-full flex justify-center hover:bg-mainGray"
      >
        <img
          className="h-4 w-4"
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png?20230305195327"
          }
          alt="Google logo"
          width={16} // px width
          height={16} // px height
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="youremail@gmail.com" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-mainGreen" formAction="auth/sign-in" type="submit">
            Login
          </Button>
        </form>
      </Form>
      </div>
      </section>
    </main>
  );
}
