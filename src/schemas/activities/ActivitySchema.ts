import { z } from "zod";
import { ACTIVITIES_CATEGORIES } from "@/constants/activities/categories";
import * as tipsConstants from "../../constants/tips/globals";
import { TipSchema } from "../tips/TipSchema";
import { ServerImageFileSchema } from "../files/ImageFileSchema";

const {
  MAXIMUM_ALLOWED_TIPS_MESSAGE,
  MINIMUM_ALLOWED_TIPS,
  MINIMUM_ALLOWED_TIPS_MESSAGE,
  MAXIMUM_ALLOWED_TIPS,
} = tipsConstants;

const MINIMUM_ACTIVITY_NAME_VALUE: number = 10;
const MAXIMUM_ACTIVITY_NAME_VALUE: number = 100;
const MAXIMUM_DESCRIPTION_VALUE: number = 150;
const MINIMUM_DESCRIPTION_VALUE: number = 50;
const MINIMUM_ACCESSIBILITY_VALUE: number = 0;
const MAXIMUM_ACCESSIBILITY_VALUE: number = 100;
const MINIMUM_PARTICIPANTS_VALUE: number = 1;
const MAXIMUM_PARTICIPANTS_VALUE: number = 100;
const MINIMUM_ACTIVITY_NAME_VALUE_MESSAGE: string = `Activity name must be at least ${MINIMUM_ACTIVITY_NAME_VALUE} characters long`;
const MAXIMUM_ACTIVITY_NAME_VALUE_MESSAGE: string = `Activity name must be at most ${MAXIMUM_ACTIVITY_NAME_VALUE} characters long`;
const MINIMUM_DESCRIPTION_VALUE_MESSAGE: string = `Activity description must be at least ${MINIMUM_DESCRIPTION_VALUE} characters long`;
const MAXIMUM_DESCRIPTION_VALUE_MESSAGE: string = `Activity description must be at most ${MAXIMUM_DESCRIPTION_VALUE} characters long`;
const MINIMUM_PARTICIPANTS_MESSAGE: string = `Your activity needs to have at least ${MINIMUM_PARTICIPANTS_VALUE} participants`;
const MAXIMUM_PARTICIPANTS_MESSAGE: string = `Your activity needs to have at most ${MAXIMUM_PARTICIPANTS_VALUE} participants`;
const DEFAULT_PARTICIPANTS_ARRAY_VALUE: number = 1;
const ACCESSIBILITY_ARRAY_LENGTH: number = 2;
const DEFAULT_STRING_VALUE = "";
const DEFAULT_PARTICIPANTS_VALUE: number = 1;

const INVALID_PARTICIPANTS_VALUE_TYPE_MESSAGE: string =
  "Type is invalid, make sure you're using a number as a value";

// Refers to the schema when you're creating the activity
const ActivitySchema = z.object({
  name: z
    .string()
    .min(MINIMUM_ACTIVITY_NAME_VALUE, {
      message: MINIMUM_ACTIVITY_NAME_VALUE_MESSAGE,
    })
    .max(MAXIMUM_ACTIVITY_NAME_VALUE, {
      message: MAXIMUM_ACTIVITY_NAME_VALUE_MESSAGE,
    })
    .default(DEFAULT_STRING_VALUE),
  description: z
    .string()
    .min(MINIMUM_DESCRIPTION_VALUE, {
      message: MINIMUM_DESCRIPTION_VALUE_MESSAGE,
    })
    .max(MAXIMUM_DESCRIPTION_VALUE, {
      message: MAXIMUM_DESCRIPTION_VALUE_MESSAGE,
    })
    .default(DEFAULT_STRING_VALUE),
  accessibility: z
    .array(
      z
        .number()
        .min(MINIMUM_ACCESSIBILITY_VALUE)
        .max(MAXIMUM_ACCESSIBILITY_VALUE)
    )
    .length(ACCESSIBILITY_ARRAY_LENGTH),
  activityId: z.string().optional(),
  participants: z
    .number()
    .array()
    .max(DEFAULT_PARTICIPANTS_ARRAY_VALUE)
    .superRefine((val, ctx) => {
      if (val[0] < MINIMUM_PARTICIPANTS_VALUE) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: MINIMUM_PARTICIPANTS_VALUE,
          type: "number",
          inclusive: true,
          message: MINIMUM_PARTICIPANTS_MESSAGE,
          path: ["participants"],
        });
      }
      if (val[0] > MAXIMUM_PARTICIPANTS_VALUE) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: MAXIMUM_PARTICIPANTS_VALUE,
          type: "number",
          inclusive: true,
          message: MAXIMUM_PARTICIPANTS_MESSAGE,
          path: ["participants"],
        });
      }
      if (typeof val[0] !== "number") {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          message: INVALID_PARTICIPANTS_VALUE_TYPE_MESSAGE,
          expected: "number",
          received: typeof val[0],
          path: ["participants"],
        });
      }
    })
    .default([DEFAULT_PARTICIPANTS_VALUE]),
  category: z
    .string()
    .refine(
      (value) => {
        const categoryIds = Object.values(ACTIVITIES_CATEGORIES);
        return categoryIds.includes(Number(value));
      },
      {
        message: "Invalid category",
      }
    )
    .default(""),
  tips: z
    .array(TipSchema)
    .min(MINIMUM_ALLOWED_TIPS, { message: MINIMUM_ALLOWED_TIPS_MESSAGE })
    .max(MAXIMUM_ALLOWED_TIPS, { message: MAXIMUM_ALLOWED_TIPS_MESSAGE })
    .refine(
      (val) => {
        const INITIAL_COUNTER_VALUE = 0;

        let imageCount = INITIAL_COUNTER_VALUE;

        val.forEach((tip) => {
          if (tip.imageFile !== undefined) {
            imageCount++;
          }
        });

        return imageCount >= MINIMUM_ALLOWED_TIPS;
      },
      {
        message: "At least three tips must have an associated image",
      }
    ),
});



// Data processed by form data
export const ActivityServerSideSchemaValidation = z.object({
  name: ActivitySchema.shape.name,
  description: ActivitySchema.shape.description,
  accessibilityMinValue: z
    .number()
    .min(MINIMUM_ACCESSIBILITY_VALUE)
    .max(MAXIMUM_ACCESSIBILITY_VALUE),
  accessibilityMaxValue: z
    .number()
    .min(MINIMUM_ACCESSIBILITY_VALUE)
    .max(MAXIMUM_ACCESSIBILITY_VALUE),
  participants: z
    .number()
    .min(MINIMUM_PARTICIPANTS_VALUE)
    .max(MAXIMUM_PARTICIPANTS_VALUE),
  category: z.number(),

  // We don't really know if the processed tip has a tip image, so we use any
  tips: z.array(z.object({
    description: z.string(),
    imageFile: z.array(z.any())
  })).min(MINIMUM_ALLOWED_TIPS).max(MAXIMUM_ALLOWED_TIPS)
});

export default ActivitySchema;
