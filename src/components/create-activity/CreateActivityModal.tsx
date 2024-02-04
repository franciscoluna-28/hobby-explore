"use client";

import ActivitySchema from "@/schemas/activities/ActivitySchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ACTIVITIES_CATEGORIES } from "@/constants/activities/categories";
import { CheckIcon, ChevronDown } from "lucide-react";

// Modal requirements:
// Description: Refers to a brief activity description (50 - 100 characters) ✅
// Name: Refers to the activity name to be displayed (50 - 120 characters) ✅
// Accessibility: Refers to how accessible an activity is economically (Numeric value from 0 to 100). The shortest the value, the cheaper the activity
// Category: Refers to the category of the activity that is displayed in a list. Select the most appropriate one for your activity ✅
// Tips: Refers to small short cards with images about your activity. Tips are meant to be short in description (50 - 100).
// Tips - Images: Refers to the image of one tip. A tip can only have one image and you can have a maximum of 4 tips and a minimum of 3 tips.
// Participants: Refers to the number of participants in one activity. (Min. 1 - Max. 100)

// Possible components:
// Tip Card - Starts as an empty dropzone. Once you put an image, you actually start to edit one tip
// Name input - Just a normal input to write text lol ✅
// Category Selector - A selector to select categories ✅
// Description - Textarea thing ✅
// Two slider selection - Slider elector to select the min. accessibility value and the max. one.
// Normal slider - Normal slider to select the amount of participants

// First step, create the Zod Schema

// TODO: ADD DEFAULT VALUES FROM API WHEN EDITING
export function CreateActivityModal() {
  const categories = Object.entries(ACTIVITIES_CATEGORIES).map(
    ([label, value]) => ({ label, value })
  );

  const form = useForm<z.infer<typeof ActivitySchema>>({
    resolver: zodResolver(ActivitySchema),
  });

  console.log(form.getValues());

  function onSubmit(values: z.infer<typeof ActivitySchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My Activity" {...field} />
              </FormControl>
              <FormDescription>The name of your activity.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Explain briefly what's your activity about. Let the tips do the
                rest of the work.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? categories.find(
                            (language) => String(language.value) === field.value
                          )?.label
                        : "Select language"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            form.setValue("category", String(language.value));
                          }}
                        >
                          {language.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              String(language.value) === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is your activity category. Use a proper one according to
                what you're posting.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
