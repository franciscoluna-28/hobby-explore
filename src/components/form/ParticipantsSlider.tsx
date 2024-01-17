"use client";

import { Slider } from "@nextui-org/react";

export function ParticipantsSlider() {
  return (
    <Slider
      label="Donuts to buy"
      size="sm"
      maxValue={60}
      getValue={(donuts) => `${donuts} of 60 Donuts`}
      className="max-w-md"
    />
  );
}
