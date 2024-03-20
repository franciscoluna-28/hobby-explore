"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { FormField } from "../ui/form";
import { FieldArrayWithId, FieldValues, UseFormReturn } from "react-hook-form";
import ActivitySchema from "@/schemas/activities/ActivitySchema";
import { z } from "zod";
import { FormItem, FormLabel, FormControl } from "../ui/form";
import { CharacterCounter } from "../form/CharacterCounter";
import { MAXIMUM_TIP_DESCRIPTION_VALUE } from "@/constants/tips/globals";
import { Textarea } from "../ui/textarea";
import { Info, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useTipStore from "@/store/useTipStore";

type TipFormProps = {
  form: UseFormReturn<z.infer<typeof ActivitySchema>>;
  index: number;
  item: FieldArrayWithId;
};

export const TipForm = ({ form, index, item }: TipFormProps) => {
  const removeDescriptionFromTip = (index: number): void => {
    form.setValue(`tips.${index}.description`, undefined);
  };

  const removeImageFromTip = (index: number): void => {
    form.setValue(`tips.${index}.imageFile`, undefined);
  };

  const isFirstTipSoItCanBeUsedAsActivityImage = (index: number): boolean => {
    const FIRST_INDEX_VALUE: number = 0;
    if (index === FIRST_INDEX_VALUE) {
      return true;
    }

    return false;
  };

  const getTipById = useTipStore((state) => state.getTipImageUrlById);

  // TODO: UPDATE CARD RESPONSIVE DESIGN BY CHANGING THE MAX-WIDTH USING MEDIA QUERIES
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >

      <Card className="rounded-2xl hover:shadow-sm hover:border-mainGreen duration-200  w-[350px] h-[380px] relative">
        {isFirstTipSoItCanBeUsedAsActivityImage(index) ? (
           <Dialog>
           <DialogTrigger asChild>
             <Button className="absolute bg-white !p-2 w-10 h-10  rounded-full right-4 bottom-4 bg-transparent hover:bg-transparent" variant="outline"><Info className="w-12 h-12 text-mainBlack"/></Button>
           </DialogTrigger>
           <DialogContent className="sm:max-w-[425px]">
             <DialogHeader>
               <DialogTitle>Fist Tip</DialogTitle>
               <DialogDescription>
                 The image you&apos;ve added to the first tip of your activity will be used as the one will be displayed in your activity card.
               </DialogDescription>
             </DialogHeader>
             <DialogFooter>
             <DialogTrigger>
               <Button>Okay, I understand now</Button>
             </DialogTrigger>
             </DialogFooter>
           </DialogContent>
         </Dialog>
        ) : null}
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
            onClick={() => {
              removeDescriptionFromTip(index);
              removeImageFromTip(index);
            }}
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
                maxCharacterCount={MAXIMUM_TIP_DESCRIPTION_VALUE}
              />
            </FormItem>
          )}
        />
      </Card>
    </motion.div>
  );
};
