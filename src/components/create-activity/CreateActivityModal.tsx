"use client";

import ActivitySchema from "@/schemas/activities/ActivitySchema";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ZodError, z } from "zod";
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
import { CheckIcon, ChevronDown, Plus } from "lucide-react";
import { Slider } from "@nextui-org/react";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { X } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider as DualSlider } from "@nextui-org/react";
import { createNewActivity } from "@/services/activities/createActiviy";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { ButtonLoading } from "../ui/button-loading";
import { CharacterCounter } from "../form/CharacterCounter";
import {
  MAXIMUM_ACTIVITY_NAME_VALUE,
  MAXIMUM_DESCRIPTION_VALUE,
} from "@/constants/activities/form";
import {
  MAXIMUM_ALLOWED_TIPS,
  MAXIMUM_TIP_DESCRIPTION_VALUE,
} from "@/constants/tips/globals";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import useTipStore from "@/store/useTipStore";

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
// TODO: REMOVE DESCRIPTION WHEN THE IMAGE IS DELETED
// TODO: ASK IF THE USER WANTS TO DELETE THE IMAGE OR NOT
// TODO: USE FILE READER FOR READING IMAGES TO MAKE THE FORM WORK ON FIREFOX

export function CreateActivityModal() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleTip = useTipStore((state) => state.addOrUpdateTip);
  const getTipById = useTipStore((state) => state.getTipImageUrlById)
  const tipImages = useTipStore((state) => state.tipImages)



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
      accessibility: [0, 50],
    },
  });

  console.log(form.getValues());

  // Maybe setting default values?
  

  const { control } = form;
  const { register } = form;

  console.log(form.formState.errors);

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
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className="space-y-6"
      >
        <section className="flex">
          <div className="w-1/3">
            <h2 className="mb-6">Create Activity 🎹</h2>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
                        className="min-w-full text-slate-500 text-sm bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
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
                        step={1}
                        minValue={0}
                        maxValue={100}
                        showOutline
                        defaultValue={value ? value : [0, 50]}
                        formatOptions={{ style: "currency", currency: "USD" }}
                        className="max-w-full text-slate-500 text-sm"
                        classNames={{
                          filler: "bg-mainGreen",
                          thumb: [
                            "bg-mainGreen",
                            "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/10",
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
          <div className="w-full m-auto flex-1 ml-6 justify-center">
            <p className="text-red-500 font-medium h-6 text-sm w-[350px]">
              {form.formState?.errors &&
                form.formState.errors?.tips &&
                form.formState.errors.tips.root?.message}
            </p>

            <ul className="flex flex-wrap gap-4 flex-grow justify-center">
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
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Controller
                          control={form.control}
                          name={`tips.${index}.imageFile`}
                          rules={{
                            required: {
                              value: true,
                              message: "This field is required",
                            },
                          }}
                          render={({
                            field: { onChange, onBlur },
                            fieldState,
                          }) => (
                            <Dropzone
                              noClick
                              accept={{
                                image: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
                              }}
                              onDropRejected={() => {
                                toast.error(
                                  "We only support images. Please, make sure you're uploading a valid image."
                                );
                                form.setValue(
                                  `tips.${index}.imageFile`,
                                  undefined as any
                                );
                              }}
                              onDrop={(acceptedFiles) => {
                                const file = acceptedFiles[0];
                                const reader = new FileReader();
                                reader.onload = function (event) {
                                handleTip(item.id, reader.result as string)
                                };

                                reader.readAsDataURL(file);

                                form.setValue(
                                  `tips.${index}.imageFile`,
                                  acceptedFiles as unknown as File[],
                                  {
                                    shouldValidate: true,
                                  }
                                );
                              }}
                            >
                              {({
                                getRootProps,
                                getInputProps,
                                open,
                                isDragActive,
                                acceptedFiles,
                              }) => (
                                <Card
                                  className={`relative hover:cursor-pointer duration-200 border-2 border-dashed z-10 w-[350px] h-[380px]`}
                                >
                                  <CardContent
                                    className="flex border-none flex-col items-center justify-center rounded-lg space-y-2 px-2 py-4 text-xs h-full bg-white"
                                    {...getRootProps()}
                                  >
                                    <div className="text-muted-foreground m-auto">
                                      <span className="font-medium">
                                        Drag Files to Upload or
                                      </span>

                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="lg"
                                        className="block text-center m-auto text-xs"
                                      >
                                        Click Here
                                      </Button>
                                      <div className="ml-auto block bg-mainGreen p-1 rounded-full text-white w-fit m-auto">
                                        <Plus className="text-white" />
                                      </div>

                                      <label
                                        onClick={() => {
                                          open();
                                        }}
                                        className="h-full w-full top-0 left-0 absolute opacity-0"
                                      >
                                        Upload Tip
                                      </label>

                                      <input
                                        className="h-full"
                                        {...getInputProps({
                                          id: "spreadsheet",
                                          onChange,
                                          onBlur,
                                        })}
                                      />
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                            </Dropzone>
                          )}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Card className="rounded-2xl hover:shadow-sm hover:border-mainGreen relative duration-200  w-[350px] h-[380px]">
                          <div className="relative">
                            <Image
                              width={0}
                              height={0}
                              className="object-cover rounded-t-2xl w-full max-h-[210px] h-[250px]"
                              src={getTipById(item.id)}
                              alt={`Tip #${index + 1}`}
                            />
                            <Button
                              type="button"
                              onClick={() =>
                                form.setValue(
                                  `tips.${index}.imageFile`,
                                  undefined as any
                                )
                              }
                              className="bg-white p-1 rounded-full absolute top-4 right-4 w-8 h-8 hover:bg-white/90"
                            >
                              <X className="text-mainBlack text-sm" />
                            </Button>
                          </div>
                          <FormField
                            control={form.control}
                            name={`tips.${index}.description`}
                            render={({ field }) => (
                              <FormItem className="p-4">
                                <FormLabel className=" text-gray text-sm">
                                  Tip #{index + 1}
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    className="!outline-none resize-none !p-0 !focus-visible:ring-transparent !focus-visible:ring-offset-transparent !border-none rounded-none max-h-[50px]"
                                    placeholder="Share some tips or your thoughts..."
                                    {...field}
                                  />
                                </FormControl>
                                <CharacterCounter
                                  field={field}
                                  maxCharacterCount={
                                    MAXIMUM_TIP_DESCRIPTION_VALUE
                                  }
                                />
                              </FormItem>
                            )}
                          />
                        </Card>
                      </motion.div>
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </section>
        <ButtonLoading
          className="bg-mainGreen hover:bg-mainGreen min-w-48"
          isLoading={isLoading}
          type="submit"
        >
          Create Activity
        </ButtonLoading>
      </form>
    </Form>
  );
}
