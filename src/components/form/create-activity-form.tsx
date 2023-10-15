"use client";
import {
  FormField,
  Form,
  FormItem,
  FormDescription,
  FormMessage,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { activitySchema } from "@/schemas/activitySchema";
import z from "zod";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { INITIAL_COST_VALUE } from "@/constants/create-activity";
import React from "react";
import { Button } from "../ui/button";
import { INITIAL_PARTICIPANTS_VALUE } from "@/constants/create-activity";
import { CategorySelector } from "./category-selector";
import { AVAILABLE_ACTIVITY_TYPES } from "@/constants/activity-types";  
import LoadingSpinner from "../ui/loading-spinner";

type Props = {
  handleSubmit(values: z.infer<typeof activitySchema>): void;
  children: React.ReactNode;
  isLoading: boolean;
};

export default function CreateActivityForm({ handleSubmit, children, isLoading }: Props) {
  const activityForm = useForm<z.infer<typeof activitySchema>>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      location: "Anywhere",
    },
  });

 

  // TODO: Fix default values bugs "[1]"
  return (
    <Form {...activityForm}>
      <form
        encType="multipart/form-data"
        onSubmit={activityForm.handleSubmit(handleSubmit)}
        className="space-y-6 mt-4"
      >
        <FormField
          control={activityForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity</FormLabel>
              <FormControl>
                <Input
                  className="rounded-xl"
                  placeholder="What's the activity?"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={activityForm.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="rounded-xl"
                    placeholder="Location"
                    {...field}
                  ></Input>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <CategorySelector
          name="category"
          label="Category"
          options={Object.keys(AVAILABLE_ACTIVITY_TYPES)}
        />

        <h2>Photos & Tips</h2>

        {children}

        <FormField
          control={activityForm.control}
          name="accessibility"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Cost</FormLabel>
              <FormControl>
                <div className="border p-6 rounded-xl flex flex-col gap-4">
                  <div className="flex justify-between">
                    <span className="block">{value ?? INITIAL_COST_VALUE}</span>
                    <span className="block text-sm">Cost (USD)</span>
                  </div>
                  <Slider
                    defaultValue={[INITIAL_COST_VALUE]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Rate the cost of your activity on a scale from 1 to 10, with 1
                being the least expensive and 10 being the most expensive.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={activityForm.control}
          name="participants"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Participants</FormLabel>
              <FormControl>
                <div className="border p-6 rounded-xl flex flex-col gap-4">
                  <div className="flex justify-between">
                    <span className="block">
                      {value ?? INITIAL_PARTICIPANTS_VALUE}
                    </span>
                    <span className="block text-sm">Total</span>
                  </div>
                  <Slider
                    defaultValue={[INITIAL_PARTICIPANTS_VALUE]}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
              <FormDescription>
                Adjust the number of participants for your activity using the
                slider. Move the slider to select the desired number of
                participants within the range of 1 to 100.
              </FormDescription>
            </FormItem>
          )}
        />


        
        <Button
          onClick={activityForm.handleSubmit(handleSubmit)}
          className="bg-mainGreen rounded-full p-6 px-6 disabled:"
          type="submit"
          disabled={isLoading}
        >
           {isLoading ? (<div className="flex gap-2 items-center"><LoadingSpinner/></div>) : 'Post'}
        </Button>
      </form>
    </Form>
  );
}
