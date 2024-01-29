"use client";

import { Button } from "../ui/button";

interface FilterActivityButtonProps {
  activity: string;
  selected: boolean;
  onClick: () => void;
}

export const FilterActivityButton: React.FC<FilterActivityButtonProps> = ({
  activity,
  selected,
  onClick,
}) => {
  return (
    <Button
      variant={selected ? "secondarySelected" : "secondary"}
      onClick={onClick}
    >
      {activity}
    </Button>
  );
};
