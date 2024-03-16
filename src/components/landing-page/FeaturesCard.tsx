import { cva } from "class-variance-authority";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const featuresCardVariants = cva(
  "w-12 h-12 rounded-full flex items-center justify-center mb-4",
  {
    variants: {
      variant: {
        profileVariant: "bg-mainGreen",
        activitiesVariant: "bg-ratingYellow",
        tipsVariant: "bg-mainPurple",
      },
    },
    defaultVariants: {
      variant: "profileVariant",
    },
  }
);

type CardRole = "profileVariant" | "activitiesVariant" | "tipsVariant";

type FeaturesCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  cardRole: CardRole;
};

export function FeaturesCard({
  title,
  description,
  children,
  cardRole,
}: FeaturesCardProps) {
  const variantClass = featuresCardVariants({ variant: cardRole });

  return (
    <Card
      className={`lg:max-w-[350px] w-full border-b-8 hover:border-mainGreen duration-200`}
    >
      <CardHeader>
        <div className={variantClass}>{children}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="!mt-4">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
