"use client";

import ActivitySchema from "@/schemas/activities/ActivitySchema";
import { motion } from "framer-motion";
import { Controller, FieldArrayWithId, UseFormReturn } from "react-hook-form";
import { z, ZodError } from "zod";
import { toast } from "sonner";
import Dropzone from "react-dropzone";
import { readFileAsDataURL } from "@/lib/blob";
import useTipStore from "@/store/useTipStore";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { TipSchema } from "@/schemas/tips/TipSchema";
import { ImageFileSchema } from "@/schemas/files/ImageFileSchema";

type TipDropzoneProps = {
  form: UseFormReturn<z.infer<typeof ActivitySchema>>;
  index: number;
  item: FieldArrayWithId;
};

export function TipDropzone({ form, index, item }: TipDropzoneProps) {
  const handleTip = useTipStore((state) => state.addOrUpdateTip);

  return (
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
        render={({ field: { onChange, onBlur }, fieldState }) => (
          <Dropzone
            noClick
            multiple={false}
            accept={{
              image: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
            }}
            onDropRejected={() => {
              toast.error(
                "We only support images. Please, make sure you're uploading a valid image."
              );
              form.setValue(`tips.${index}.imageFile`, undefined as any);
            }}
            onDrop={async (acceptedFiles) => {
              try {
                const file = acceptedFiles;

                const parsedFile = ImageFileSchema.shape.document.parse(file);

                const dataUrl = await readFileAsDataURL(parsedFile[0]);
                handleTip(item.id, dataUrl as string);

                form.setValue(
                  `tips.${index}.imageFile`,
                  acceptedFiles as unknown as File[],
                  {
                    shouldValidate: true,
                  }
                );

                // Avoid the app from displaying debugging errors when the file is not valid
              } catch (error) {
                if (error instanceof ZodError) {
                  const errorObject = JSON.parse(error as unknown as string);

                  toast.error(errorObject[0].message);
                  form.setValue(`tips.${index}.imageFile`, undefined);
                }

                console.error(error);
              }
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
                  className="flex border-none flex-col items-center justify-center rounded-xl space-y-2 px-2 py-4 text-xs h-full bg-white dark:bg-[#171717]"
                  {...getRootProps()}
                >
                  <div className="text-muted-foreground m-auto">
                    <span className="font-medium">Drag Files to Upload or</span>

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
                      data-testid="dropzone"
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
  );
}
