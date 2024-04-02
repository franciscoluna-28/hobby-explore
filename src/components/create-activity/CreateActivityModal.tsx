"use client";

import ActivitySchema from "@/schemas/activities/ActivitySchema";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Slider } from "@nextui-org/react";

import { Slider as DualSlider } from "@nextui-org/react";
import { createNewActivity } from "@/services/activities/createActiviy";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { ButtonLoading } from "../ui/button-loading";
import { CharacterCounter } from "../form/CharacterCounter";
import { FieldErrors } from "react-hook-form";
import {
  ACCESSIBILITY_VALUE_STEPS,
  DEFAULT_ACCESSIBILITY_MAX_VALUE,
  DEFAULT_ACCESSIBILITY_MIN_VALUE,
  MAXIMUM_ACTIVITY_NAME_VALUE,
  MAXIMUM_DESCRIPTION_VALUE,
  MINIMUM_ACTIVITY_NAME_VALUE,
  MINIMUM_DESCRIPTION_VALUE,
} from "@/constants/activities/form";
import {
  MAXIMUM_ALLOWED_TIPS,
} from "@/constants/tips/globals";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { MAXIMUM_ACCESSIBILITY_VALUE, MINIMUM_ACCESSIBILITY_VALUE } from "../../constants/activities/form";
import { TipDropzone } from "./TipDropzone";
import { TipForm } from "./TipForm";

// Modal requirements:
// Description: Refers to a brief activity description (50 - 100 characters) ✅
// Name: Refers to the activity name to be displayed (50 - 120 characters) ✅
// Accessibility: Refers to how accessible an activity is economically (Numeric value from 0 to 100). The shorten the value, the cheaper the activity ✅
// Category: Refers to the category of the activity that is displayed in a list. Select the most appropriate one for your activity ✅
// Tips: Refers to small short cards with images about your activity. Tips are meant to be short in description (50 - 100). ✅
// Tips - Images: Refers to the image of one tip. A tip can only have one image and you can have a maximum of 4 tips and a minimum of 3 tips. ✅
// Participants: Refers to the number of participants in one activity. (Min. 1 - Max. 100) ✅

// Possible components:
// Tip Card - Starts as an empty dropzone. Once you put an image, you actually start to edit one tip ✅
// Name input - Just a normal input to write text lol ✅
// Category Selector - A selector to select categories ✅
// Description - Textarea thing ✅
// Two slider selection - Slider elector to select the min. accessibility value and the max. one. ✅
// Normal slider - Normal slider to select the amount of participants ✅

// First step, create the Zod Schema
// TODO: ASK IF THE USER WANTS TO DELETE THE IMAGE OR NOT

export function CreateActivityModal() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const router = useRouter();

  const onError = (errors: FieldErrors<z.infer<typeof ActivitySchema>>) => {
    const errorCount = Object.keys(errors).length;
    const errorMessages = Object.values(errors)
      .filter((error) => error.message && error.message.trim() !== "")
      .map((error, index) => `${index + 1}: ${error.message}`);

    if (errors.tips?.root?.message) {
      const lastIndex = errorMessages.length + 1;
      errorMessages.push(`${lastIndex}. ${errors.tips.root.message}.`);
    }

    const errorMessage = `We've encountered ${errorCount} error${
      errorCount > 1 ? "s" : ""
    }. ${errorMessages.join(". ")}`;

    toast.error(errorMessage);
  };

  // Initialize empty tips
  const TIPS_ARRAY = Array.from({ length: MAXIMUM_ALLOWED_TIPS }, () => ({
    description: undefined,
    imageFile: undefined,
  }));
  const categories = Object.entries(ACTIVITIES_CATEGORIES).map(
    ([label, value]) => ({ label, value })
  );

  const form = useForm<z.infer<typeof ActivitySchema>>({
    resolver: zodResolver(ActivitySchema),
    defaultValues: {
      tips: TIPS_ARRAY,
      accessibility: [DEFAULT_ACCESSIBILITY_MIN_VALUE, DEFAULT_ACCESSIBILITY_MAX_VALUE],
    },
  });

  const { control } = form;
  const { register } = form;

  const { fields } = useFieldArray({
    control,
    name: "tips",
  });

  const onSubmit = async (values: z.infer<typeof ActivitySchema>) => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("participants", String(values.participants));
    formData.append("accessibilityFirstValue", String(values.accessibility[0]));
    formData.append("accessibilityLastValue", String(values.accessibility[1]));
    formData.append("category", String(values.category));

    values.tips.forEach((tip, index) => {
      formData.append(
        `tip-${index}-image`,
        tip.imageFile ? tip.imageFile[0] : ("" as unknown as File | string)
      );
      formData.append(`tip-${index}-description`, tip.description ?? "");
    });

    const res = await createNewActivity(formData);
    console.log(res);

    if (res && "activityId" in res) {
      setIsLoading(false);
      toast.success(res.message);
      router.push(`/app/activities/${res.activityId}`);
    }

    if (res?.success === false && !res.message) {
      setIsLoading(false);
      toast.error("There was an unknown error while creating your activity...");
    }

    setIsLoading(false);
  };



  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-6 w-full flex justify-center flex-col items-center"
      >
        <section className="w-full xl:flex xl:justify-center xl:m-auto max-w-[500px] xl:max-w-full gap-4">
          <div className=" w-full max-w-[350px]">
            <h2 className="mb-6">Create Activity 🎹</h2>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormDescription className="">{`The name of your activity must have a minimum of ${MINIMUM_ACTIVITY_NAME_VALUE} characters and a maximum of ${MAXIMUM_ACTIVITY_NAME_VALUE}`}.</FormDescription>
                  <FormControl>
                    <Input placeholder="My Activity" {...field} />
                  </FormControl>
                  <CharacterCounter
                    maxCharacterCount={MAXIMUM_ACTIVITY_NAME_VALUE}
                    field={field}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>Description</FormLabel>
                  <FormDescription className="">{`The description must have a minimum of ${MINIMUM_DESCRIPTION_VALUE} characters and a maximum of ${MAXIMUM_DESCRIPTION_VALUE}`}.</FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Explain briefly what's your activity about. Let the tips do the rest of the work."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <CharacterCounter
                    maxCharacterCount={MAXIMUM_DESCRIPTION_VALUE}
                    field={field}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="participants"
              render={({ field: { onChange, value } }) => (
                <>
                  <FormLabel>Participants</FormLabel>
                  <FormItem className="border rounded-md  flex items-center gap-4 p-4 mt-3">
                    <FormControl>
                      <Slider
                        label="Number of Participants"
                        classNames={{
                          track: "bg-slate-200",
                        }}
                        onChange={onChange}
                        step={1}
                        maxValue={100}
                        color="primary"
                        minValue={1}
                        showOutline
                        disableThumbScale={true}
                        defaultValue={[value ? value[0] : 1]}
                        className="min-w-full text-slate-500 text-sm bg-gray-200 rounded-xl appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </FormControl>
                  </FormItem>
                  <FormDescription className="my-3">
                    Share how many enthusiasts will be joining your activity.
                  </FormDescription>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="accessibility"
              render={({ field: { onChange, value } }) => (
                <>
                  <FormLabel>Accessibility</FormLabel>
                  <FormItem className="border rounded-md p-4 mt-3">
                    <FormControl>
                      <DualSlider
                        onChange={onChange}
                        label="Price Range"
                        step={ACCESSIBILITY_VALUE_STEPS}
                        minValue={MINIMUM_ACCESSIBILITY_VALUE}
                        maxValue={MAXIMUM_ACCESSIBILITY_VALUE}
                        showOutline
                        defaultValue={value ? value : [0, 50]}
                        formatOptions={{ style: "currency", currency: "USD" }}
                        className="max-w-full text-slate-500 text-sm"
                        classNames={{
                          filler: "bg-mainGreen",
                          thumb: [
                            "bg-mainGreen",
                            "data-[dragging=true]:shadow-xl data-[dragging=true]:shadow-black/10",
                            "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
                          ],
                          track: "bg-slate-200",
                        }}
                      />
                    </FormControl>
                  </FormItem>
                  <FormDescription className="my-3">
                    Indicate the economic accessibility of your activity.
                  </FormDescription>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="my-2">Category</FormLabel>
                  <Popover open={openCategory} onOpenChange={setOpenCategory}>
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
                                (category) =>
                                  String(category.value) === field.value
                              )?.label
                            : "Select category"}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search category..."
                          className="h-9"
                        />
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              value={category.label}
                              key={category.value}
                              onSelect={() => {
                                form.setValue(
                                  "category",
                                  String(category.value)
                                );
                                setOpenCategory(false);
                              }}
                            >
                              {category.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  String(category.value) === field.value
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
                    Choose the appropriate category for your hobby or interest.
                  </FormDescription>
                  <FormMessage className="min-h-4" />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full justify-center">
            <ul className="flex flex-col xl:flex-row xl:flex-wrap gap-4 m-auto justify-center ">
              <AnimatePresence mode="wait" initial={false}>
                {fields.map((item, index) => (
                  <motion.li
                    key={item.id}
                    transition={{ duration: 0.5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {form.watch(`tips.${index}.imageFile`) === undefined ? (
                     <TipDropzone form={form} index={index} item={item}/>
                    ) : (
                     <TipForm form={form} index={index} item={item}/>
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </section>
        <ButtonLoading
          className="bg-mainGreen flex xl:mr-auto hover:bg-mainGreen min-w-48"
          isLoading={isLoading}
          type="submit"
        >
          Create Activity
        </ButtonLoading>
      </form>
    </Form>
  );
}
