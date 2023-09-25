import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import React from "react";

type CategorySelectorProps = {
  name: string;
  label: string;
  options: string[];
};

export function CategorySelector({
  name,
  label,
  options,
}: CategorySelectorProps) {
  const { register } = useFormContext();

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            {...field}
            onValueChange={field.onChange}
            defaultValue={field.value}
            {...register(name)}
          >
            <FormControl>
              <SelectTrigger className="rounded-xl">
                <SelectValue
                  className="!text-left"
                  placeholder={`Choose a ${label}`}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="rounded-xl">
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
