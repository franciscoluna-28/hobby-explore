"use client";

import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AboutUserSchema } from "@/schemas/aboutUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useAboutUserStore from "@/store/about-user-store";
import DatePicker from "react-datepicker";
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
import Image
 from "next/image";
 import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";

export default function GetStartedStepTwo() {
  const { name, birthDate, handleNameChange, handleBirthDateChange } =
    useAboutUserStore();

  const router = useRouter();

  const form = useForm<z.infer<typeof AboutUserSchema>>({
    resolver: zodResolver(AboutUserSchema),
    defaultValues: {
      name: name || "",
      birthDate: birthDate,
    },
  });

  const onSubmit = () => {
    router.push("/get-started/step-2");
  };

  return (
    <>
      <h1 className="mb-4 text-xl font-bold">Customize your profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Name</FormLabel>
                <FormControl>
                <AspectRatio className="" ratio={16 / 9}>
    <Image width={1000} height={400} src="/gradient.jpeg" alt="Image" className="rounded-md object-cover" />
  </AspectRatio>
                </FormControl>
                <FormDescription>
                  Your visible name within the application.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Birth Date</FormLabel>
                <div>
                  <DatePicker
                    maxDate={new Date()}
                    yearDropdownItemNumber={100}
                    closeOnScroll={true}
                    placeholderText="mm/dd/yyyy"
                    className="border text-sm px-2 py-2 rounded-xl"
                    selected={birthDate}
                    onChange={(date) => {
                      field.onChange(date);
                      handleBirthDateChange(date || new Date());
                    }}
                  />
                </div>
                <FormDescription>
                  This date will be used for future recommendations.
                </FormDescription>
                <FormMessage>
                  {birthDate && birthDate > new Date() && (
                    <p className="text-red-500">Invalid date!</p>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
