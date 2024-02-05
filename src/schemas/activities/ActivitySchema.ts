import { z } from "zod";
import { ImageFileSchema } from "../files/ImageFileSchema";
import { ACTIVITIES_CATEGORIES } from "@/constants/activities/categories";

const MINIMUM_ALLOWED_TIPS: number = 1;
const MAXIMUM_ALLOWED_TIPS: number = 5;
const MINIMUM_TIP_DESCRIPTION_VALUE: number = 1;
const MAXIMUM_TIP_DESCRIPTION_VALUE: number = 100;
const MINIMUM_ACTIVITY_NAME_VALUE: number = 10;
const MAXIMUM_ACTIVITY_NAME_VALUE: number = 100;
const MAXIMUM_DESCRIPTION_VALUE: number = 100;
const MINIMUM_DESCRIPTION_VALUE: number = 50;
const MINIMUM_ACCESSIBILITY_VALUE: number = 1;
const MAXIMUM_ACCESSIBILITY_VALUE: number = 100;
const MINIMUM_PARTICIPANTS_VALUE: number = 1;
const MAXIMUM_PARTICIPANTS_VALUE: number = 100;

const MINIMUM_ACTIVITY_NAME_VALUE_MESSAGE: string = `Activity name must be at least ${MINIMUM_ACTIVITY_NAME_VALUE} characters long`;
const MAXIMUM_ACTIVITY_NAME_VALUE_MESSAGE: string = `Activity name must be at most ${MAXIMUM_ACTIVITY_NAME_VALUE} characters long`;
const MINIMUM_DESCRIPTION_VALUE_MESSAGE: string = `Activity description must be at least ${MINIMUM_DESCRIPTION_VALUE} characters long`;
const MAXIMUM_DESCRIPTION_VALUE_MESSAGE: string = `Activity description must be at most ${MAXIMUM_DESCRIPTION_VALUE} characters long`;
const MAXIMUM_ALLOWED_TIPS_MESSAGE: string = `You can have a maximum of ${MAXIMUM_ALLOWED_TIPS}`;
const MINIMUM_ALLOWED_TIPS_MESSAGE: string = `You need to have at least ${MINIMUM_ALLOWED_TIPS} tip`;
const MINIMUM_TIP_DESCRIPTION_MESSAGE: string = `Your tip needs to have at least ${MINIMUM_TIP_DESCRIPTION_VALUE} characters`;
const MAXIMUM_TIP_DESCRIPTION_MESSAGE: string = `Your tip can have at most ${MAXIMUM_TIP_DESCRIPTION_VALUE}`;
const MINIMUM_PARTICIPANTS_MESSAGE: string = `Your activity needs to have at least ${MINIMUM_PARTICIPANTS_VALUE} participants`;
const MAXIMUM_PARTICIPANTS_MESSAGE: string = `Your activity needs to have at most ${MAXIMUM_PARTICIPANTS_VALUE} participants`;
const DEFAULT_PARTICIPANTS_ARRAY_VALUE: number = 1;
const INVALID_PARTICIPANTS_VALUE_TYPE_MESSAGE: string =
  "Type is invalid, make sure you're using a number as a value";

const TipSchema = z.object({
  description: z
    .string()
    .min(MINIMUM_TIP_DESCRIPTION_VALUE, {
      message: MINIMUM_TIP_DESCRIPTION_MESSAGE,
    })
    .max(MAXIMUM_TIP_DESCRIPTION_VALUE, {
      message: MAXIMUM_TIP_DESCRIPTION_MESSAGE,
    }),
  imageFile: ImageFileSchema.shape.document,
  tipId: z.string().optional(),
});

const ActivitySchema = z.object({
  name: z
    .string()
    .min(MINIMUM_ACTIVITY_NAME_VALUE, {
      message: MINIMUM_ACTIVITY_NAME_VALUE_MESSAGE,
    })
    .max(MAXIMUM_ACTIVITY_NAME_VALUE, {
      message: MAXIMUM_ACTIVITY_NAME_VALUE_MESSAGE,
    })
    .default(""),
  accessibility: z.coerce
    .number()
    .min(MINIMUM_ACCESSIBILITY_VALUE)
    .max(MAXIMUM_ACCESSIBILITY_VALUE),
  description: z
    .string()
    .min(MINIMUM_DESCRIPTION_VALUE, {
      message: MINIMUM_DESCRIPTION_VALUE_MESSAGE,
    })
    .max(MAXIMUM_DESCRIPTION_VALUE, {
      message: MAXIMUM_DESCRIPTION_VALUE_MESSAGE,
    })
    .default(""),
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
    }),

  category: z.string().refine(
    (value) => {
      const categoryIds = Object.values(ACTIVITIES_CATEGORIES);
      return categoryIds.includes(Number(value));
    },
    {
      message: "Invalid category",
    }
  ),
  tips: z
    .array(TipSchema)
    .min(MINIMUM_ALLOWED_TIPS, { message: MINIMUM_ALLOWED_TIPS_MESSAGE })
    .max(MAXIMUM_ALLOWED_TIPS, { message: MAXIMUM_ALLOWED_TIPS_MESSAGE }),
});

export default ActivitySchema;
