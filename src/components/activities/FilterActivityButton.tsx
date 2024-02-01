"use client";

import { Button } from "../ui/button";

interface FilterActivityButtonProps {
  activity: string;
  selected: boolean;
  disabled: boolean;
  onClick?: () => void;
}

export const FilterActivityButton: React.FC<FilterActivityButtonProps> = ({
  activity,
  selected,
  onClick,
  disabled
}) => {
  return (
    <Button
      variant={selected ? "secondarySelected" : "secondary"}
      onClick={onClick}
      disabled={disabled}
    >
      {activity}
    </Button>
  );
};
