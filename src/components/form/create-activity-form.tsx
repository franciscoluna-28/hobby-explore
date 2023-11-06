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
import { AVAILABLE_ACTIVITY_TYPES } from "@/constants/activity-types";
import LoadingSpinner from "../ui/loading-spinner";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import { Dropzone } from "../create-tips/dropzone";
import { TipList } from "../create-tips/tip-list";
import { Terminal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  handleSubmit(values: z.infer<typeof activitySchema>): void;
  isLoading: boolean;
};

export default function CreateActivityForm({ handleSubmit, isLoading }: Props) {
  const activityForm = useForm<z.infer<typeof activitySchema>>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      location: "Anywhere",
      participants: 1,
      accessibility: 1,
    },
  });
  const router = useRouter();
  
  console.log(activityForm.getValues())


  // TODO: Fix default values bugs "[1]"
  return (
    <Form {...activityForm}>
      <form
        encType="multipart/form-data"
        onSubmit={activityForm.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        <div className="flex flex-col lg:flex-row">
          <div className="!space-y-6 p-8 w-full">
            <div className="flex gap-4 w-full justify-start">
              <Button
                type="button"
                onClick={router.back}
                className="p-0 m-0 bg-transparent hover:!bg-transparent w-min disabled:bg-transparent"
              >
                <BiArrowBack className="text-mainBlack text-3xl" />
              </Button>
              <h1 className="text-2xl leading-normal">
                Share your activity 🎹
              </h1>
            </div>
            <Alert className="my-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription className="text-slate-500">
                For the best experience, we recommend using landscape-oriented
                images. This will ensure that your images look their best when
                you and other users preview them.
              </AlertDescription>
            </Alert>
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
            <FormField
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-xl text-black">
                        <SelectValue
                          className="!text-left !text-black"
                          placeholder="Choose a Category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl">
                      {AVAILABLE_ACTIVITY_TYPES.map((option) => (
                        <SelectItem className="text-black" key={option.id} value={String(option.id)}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={activityForm.control}
              name="accessibility"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Cost and Accesibility</FormLabel>
                  <FormControl>
                    <div className="border border-slate-200 p-6 rounded-xl flex flex-col gap-4">
                      <div className="flex justify-between">
                        <span className="block">
                          {value ?? INITIAL_COST_VALUE}
                        </span>
                        <span className="block text-sm">Cost (USD)</span>
                      </div>
                      <Slider
                        defaultValue={[1]}
                        className="cursor-pointer"
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
                    Rate the cost of your activity on a scale from 1 to 10, with
                    1 being the least expensive and 10 being the most expensive.
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
                  <FormLabel>Number of Participants</FormLabel>
                  <FormControl>
                    <div className="border border-slate-200 p-6 rounded-xl flex flex-col gap-4">
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
                        className="cursor-pointer"
                        step={1}
                        onValueChange={(vals) => {
                          onChange(vals[0]);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Adjust the number of participants for your activity using
                    the slider. Move the slider to select the desired number of
                    participants within the range of 1 to 100.
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button
              onClick={activityForm.handleSubmit(handleSubmit)}
              className="bg-mainGreen rounded-full w-auto p-6 px-6 hover:bg-transparent border hover:text-mainGreen hover:border-mainGreen"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex gap-2 items-center">
                  <LoadingSpinner />
                </div>
              ) : (
                "Post"
              )}
            </Button>
          </div>

          <div className="border-l-2 border border-slate-200 w-full p-8">
            <h2 className="font-bold text-2xl">Photos & Tips</h2>

            <p className="text-slate-500 my-4 text-sm">
              Tips are a collection of images and text where you explain more in
              detail about the activity or just provide tips to do it more
              effectively.
            </p>
            <Dropzone />

            <div className="flex flex-col  lg:!grid lg:grid-flow-col w-full mt-8 !mb-8">
              <TipList />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
