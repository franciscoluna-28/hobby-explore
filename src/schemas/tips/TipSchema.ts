import * as tipsConstants from "../../constants/tips/globals";
import { z } from "zod";
import {
  ImageFileSchema,
  ServerImageFileSchema,
} from "../files/ImageFileSchema";

const { MAXIMUM_TIP_DESCRIPTION_VALUE, MINIMUM_TIP_DESCRIPTION_VALUE } =
  tipsConstants;

const DEFAULT_STRING_VALUE: string = "";
const MINIMUM_TIP_DESCRIPTION_MESSAGE: string = `Your tip needs to have at least ${MINIMUM_TIP_DESCRIPTION_VALUE} characters`;
const MAXIMUM_TIP_DESCRIPTION_MESSAGE: string = `Your tip can have at most ${MAXIMUM_TIP_DESCRIPTION_VALUE}`;

// Refers to the tip when you're creating the activity (Client side)
export const TipSchema = z
  .object({
    description: z
      .string()
      .min(MINIMUM_TIP_DESCRIPTION_VALUE, {
        message: MINIMUM_TIP_DESCRIPTION_MESSAGE,
      })
      .max(MAXIMUM_TIP_DESCRIPTION_VALUE, {
        message: MAXIMUM_TIP_DESCRIPTION_MESSAGE,
      })
      .optional(),

    imageFile: ImageFileSchema.shape.document.optional(),
    tipId: z.string().optional(),
  })

  .superRefine((val, ctx) => {
    // If we have an image, then we must need a description.
    // Hence, validate the description for the tip
    if (
      (val.imageFile !== undefined && val.description === undefined) ||
      val.description === DEFAULT_STRING_VALUE
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "You must provide a description for the tip when you create the image",
      });
    }
  });

const ServerTip =  z.object({
  description: z
    .string()
    .min(MINIMUM_TIP_DESCRIPTION_VALUE, {
      message: MINIMUM_TIP_DESCRIPTION_MESSAGE,
    })
    .max(MAXIMUM_TIP_DESCRIPTION_VALUE, {
      message: MAXIMUM_TIP_DESCRIPTION_MESSAGE,
    }),
  imageFile: ServerImageFileSchema.shape.profileImage,
  })
  
export const TipServerSideSchema = z.array(ServerTip);
