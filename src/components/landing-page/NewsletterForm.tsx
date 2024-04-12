"use client";

import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import subscribeToNewsletterAction from "@/actions/newsletter";
import { useState } from "react";
import { ButtonLoading } from "@/components/ui/button-loading";
import { toast } from "sonner";

export function NewsletterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const NewsletterSchema = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof NewsletterSchema>>({
    resolver: zodResolver(NewsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof NewsletterSchema>) {
    try {
      setIsLoading(true);
      const response = await subscribeToNewsletterAction(values.email);

      console.log(response);

      if ("error" in response) {
        setIsLoading(false);
        toast.error(response.error);
        return;
      }

      if ("message" in response) {
        setIsLoading(false);
        toast.success(response.message);
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }

    console.log(values);
  }

  return (
    <div className="flex mt-8 m-auto justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-min focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="user@email.com"
                    {...field}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ButtonLoading
            className="min-w-[150px]"
            isLoading={isLoading}
            type="submit"
          >
            Subscribe
          </ButtonLoading>
        </form>
      </Form>
    </div>
  );
}
