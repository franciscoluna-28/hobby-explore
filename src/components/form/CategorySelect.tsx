"use client";

import { Select } from "@nextui-org/react";
import { SelectItem } from "@nextui-org/react";
import { ACTIVITIES_CATEGORIES } from "@/constants/activities/categories";

export function CategorySelect() {
  return (
    <Select
      labelPlacement="inside"
      variant="bordered"
      label="Category"
      placeholder="Choose a category"
      className="text-left"
    >
      {Object.entries(ACTIVITIES_CATEGORIES).map(([name, id]) => (
        <SelectItem key={name} value={id}>
          {name}
        </SelectItem>
      ))}
    </Select>
  );
}
