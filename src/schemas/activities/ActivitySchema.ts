import { z } from "zod";
import { ImageFileSchema } from "../files/ImageFileSchema";

const MINIMUM_ALLOWED_TIPS: number = 1;
const MAXIMUM_ALLOWED_TIPS: number = 5;
const MINIMUM_TIP_DESCRIPTION_VALUE: number = 35;
const MAXIMUM_TIP_DESCRIPTION_VALUE: number = 150;
const MAXIMUM_ALLOWED_TIPS_MESSAGE: string = `You can have a maximum of ${MAXIMUM_ALLOWED_TIPS}`;
const MINIMUM_ALLOWED_TIPS_MESSAGE: string = `You need to have at least ${MINIMUM_ALLOWED_TIPS} tip`;

const MINIMUM_TIP_DESCRIPTION_MESSAGE: string = `Your tip needs to have at least ${MINIMUM_TIP_DESCRIPTION_VALUE} characters`;
const MAXIMUM_TIP_DESCRIPTION_MESSAGE: string = `Your tip can have at most ${MAXIMUM_TIP_DESCRIPTION_VALUE}`;

const TipSchema = z.object({
  description: z
    .string()
    .min(MINIMUM_TIP_DESCRIPTION_VALUE, {
      message: MINIMUM_TIP_DESCRIPTION_MESSAGE,
    })
    .max(MAXIMUM_TIP_DESCRIPTION_VALUE, {
      message: MAXIMUM_TIP_DESCRIPTION_MESSAGE,
    }),
  imageFile: ImageFileSchema,
  tipId: z.string().optional(),
});

const MINIMUM_ACTIVITY_NAME_VALUE: number = 10;
const MAXIMUM_ACTIVITY_NAME_VALUE: number = 100;
const MINIMUM_ACTIVITY_NAME_VALUE_MESSAGE: string = `Activity name must be at least ${MINIMUM_ACTIVITY_NAME_VALUE}`;
const MAXIMUM_ACTIVITY_NAME_VALUE_MESSAGE: string = `Activity name must be at most ${MAXIMUM_ACTIVITY_NAME_VALUE}`;
const MINIMUM_ACCESSIBILITY_VALUE: number = 1;
const MAXIMUM_ACCESSIBILITY_VALUE: number = 100;

const ActivitySchema = z.object({
  name: z
    .string()
    .min(MINIMUM_ACTIVITY_NAME_VALUE, {
      message: MINIMUM_ACTIVITY_NAME_VALUE_MESSAGE,
    })
    .max(MAXIMUM_ACTIVITY_NAME_VALUE, {
      message: MAXIMUM_ACTIVITY_NAME_VALUE_MESSAGE,
    }),
  accesibility: z.coerce
    .number()
    .min(MINIMUM_ACCESSIBILITY_VALUE)
    .max(MAXIMUM_ACCESSIBILITY_VALUE),
  activityId: z.string().optional(),
  tips: z
    .array(TipSchema)
    .min(MINIMUM_ALLOWED_TIPS, { message: MINIMUM_ALLOWED_TIPS_MESSAGE })
    .max(MAXIMUM_ALLOWED_TIPS, { message: MAXIMUM_ALLOWED_TIPS_MESSAGE }),
});
