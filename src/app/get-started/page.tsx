"use client"

import 'react-calendar/dist/Calendar.css';

import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AboutUserSchema } from "@/schemas/aboutUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useAboutUserStore from "@/store/about-user-store";
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
import Calendar from "react-calendar";
import { ChangeEvent } from "react";

export default function GetStarted() {
  const { name, birthDate } = useAboutUserStore();

  const form = useForm<z.infer<typeof AboutUserSchema>>({
    resolver: zodResolver(AboutUserSchema),
    defaultValues: {
      name,
      birthDate,
    },
  });

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    form.setValue("name", event.target.value);
  };

  const handleBirthDateChange = (date: Date) => {
    form.setValue("birthDate", date);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Render the different content only on the client
    if (isClient) {
      // ...
    }
  }, [isClient]);

  return (
    <Form {...form}>
      <form method="post" className="space-y-8 p-32">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  onChange={handleNameChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2">Enter your birth date here</FormLabel>
              <FormControl>
                <Calendar
                  onChange={handleBirthDateChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
