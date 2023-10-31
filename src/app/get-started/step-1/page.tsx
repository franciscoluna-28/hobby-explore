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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CREATE_USER_DATA_CONSTANTS } from "@/constants/create-user-data/create-user-data";


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import withToastNotifications from "@/components/hoc/withToastNotifications";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
function GetStartedStepOne() {
  const {
    name,
    home,
    birthDate,
    handleNameChange,
    handleBirthDateChange,
    handleHomeChange,
  } = useAboutUserStore();

  const supabase = createClientComponentClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof AboutUserSchema>>({
    resolver: zodResolver(AboutUserSchema),
    defaultValues: {
      name: name,
      birthDate: birthDate,
      home: home,
    },
  });

  console.log(name, birthDate, home);

  const onSubmit = async () => {
    const userData = {
      name: name,
      home: home,
      birth_date: birthDate.toISOString(),
    };

    try {
      const response = await fetch(`/get-started/api/upload-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Fix typo here
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        if(data.success) {
          toast.success(data.message)
          router.push("/get-started/step-2")
        }
        console.log(data);
      } else {
        // Handle frontend-specific errors
        console.error(
          "Frontend Error: Failed to submit data. Status:",
          response.status
        );
      }
    } catch (error) {
      // Handle network-related errors
      console.error("Network Error: Failed to submit data.", error);
    }
  };

  return (
    <>
      <h1 className="mb-4 text-xl font-bold">Tell us a bit about you!</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Francisco Luna"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleNameChange(e.target.value);
                    }}
                    value={field.value}
                  />
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
            name="home"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Home *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Melbourne, Australia"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleHomeChange(e.target.value);
                    }}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Your current city and country.
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
                <FormLabel>Birth Date *</FormLabel>
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
          <Button type="submit">Next</Button>
        </form>
      </Form>
    </>
  );
}

const GetStartedStepOneWithToast = withToastNotifications(GetStartedStepOne);

export default GetStartedStepOneWithToast;
