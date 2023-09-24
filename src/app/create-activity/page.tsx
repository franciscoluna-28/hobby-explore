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
import { Input } from "@/components/ui/input";
import z from "zod";
import { activitySchema } from "@/schemas/activitySchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tipSchema } from "@/schemas/tipSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  INITIAL_COST_VALUE,
  INITIAL_PARTICIPANTS_VALUE,
} from "@/constants/create-activity";
import { Dropzone } from "@/components/create-tips/dropzone";
import { TipList } from "@/components/create-tips/tip-list";
import useImageStore from "@/store/tips-store";
import { useState } from "react";

export default function CreateActivity() {
  const [successMessage, setSuccessMessage] = useState("");
  const tips = useImageStore((state) => state.tips);
  const activityForm = useForm<z.infer<typeof activitySchema>>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      location: "Anywhere",
    },
  });

  const tipForm = useForm<z.infer<typeof tipSchema>>({
    resolver: zodResolver(tipSchema),
  });

  const config = {
    api: {
      bodyParser: false,
    },
  };

  async function submitFormData(formData: FormData) {
    try {
      const response = await fetch("create-activity/api/activities", {
        method: "POST",
        body: formData,
        headers: {
          content: "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSuccessMessage("Activity and tips created successfully!");
        } else {
          console.error("Error:", data.error);
        }
      } else {
        console.error("HTTP Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function onSubmit(values: z.infer<typeof activitySchema>, e: any) {
    try {
      // Create a new form data object
      const formData = new FormData();

      // Append activity values
      formData.append("name", values.name);
      formData.append("location", values.location);
      formData.append("category", values.category);
      formData.append("accessibility", values.accessibility.toString());
      formData.append("participants", values.participants.toString());

      // Append tips values
      tips.forEach((tip, index) => {
        formData.append(`tips[${index}][id]`, tip.id);
        formData.append(`tips[${index}][text]`, tip.text);
        formData.append(`tips[${index}][image]`, tip.image, tip.image.name);
      });

      await submitFormData(formData);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <section className="p-16">
      <h1>Share your activity</h1>
      <Form {...activityForm}>
        <form
          encType="multipart/form-data"
          onSubmit={activityForm.handleSubmit(onSubmit)}
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
          <FormField
            control={activityForm.control}
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
                    <SelectTrigger className="rounded-xl">
                      <SelectValue
                        className="!text-left"
                        placeholder="Choose a category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="recreational">Recreational</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="diy">DIY</SelectItem>
                    <SelectItem value="charity">Charity</SelectItem>
                    <SelectItem value="cooking">Cooking</SelectItem>
                    <SelectItem value="relaxation">Relaxation</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="busywork">Busywork</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <h2>Photos & Tips</h2>

          <TipList />
          <Dropzone />

          <FormField
            control={activityForm.control}
            name="accessibility"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Cost</FormLabel>
                <FormControl>
                  <div className="border p-6 rounded-xl flex flex-col gap-4">
                    <div className="flex justify-between">
                      <span className="block">
                        {value ?? INITIAL_COST_VALUE}
                      </span>
                      <span className="block font-light text-sm">
                        Cost (USD)
                      </span>
                    </div>
                    <Slider
                      defaultValue={[1]}
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
                      <span className="block font-light text-sm">Total</span>
                    </div>
                    <Slider
                      defaultValue={[1]}
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
            onClick={() => onSubmit}
            className="bg-mainGreen rounded-full p-6 px-8"
            type="submit"
          >
            Post
          </Button>
        </form>
      </Form>
    </section>
  );
}
