"use server";

import { ZodError, z } from "zod";
import { uploadPictureToSupabase } from "../supabase/storage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database, Tables } from "@/lib/database";
import { ErrorResult, generateErrorResult } from "../errors/generateErrors";
import { generateSuccessResult } from "../success/generateSuccess";
import { ServerImageFileSchema } from "@/schemas/files/ImageFileSchema";
import { ActivityServerSideSchemaValidation } from "@/schemas/activities/ActivitySchema";
import { TipServerSideSchema } from "@/schemas/tips/TipSchema";
import { getCurrentUserId } from "../auth";

const supabase = createServerComponentClient<Database>({ cookies });

// Tips obtained from the form data and processed afterwards
type ProcessedTip = {
  description: string;
  imageFile: undefined[] | string[] | File[];
};

/**
 * Generates the relative path url of an image uploaded to Supabase
 * @param file - The image file to be uploaded
 * @returns Promise<string | undefined> - A promise with the string path or undefined if the image wasn't uploaded successfully
 */
async function generateImageUrl(
  file: File[] | undefined
): Promise<string | undefined | any> {
  try {
    // Don't generate urls for undefined images
    if (!file) return;

    // Verify image format
    const parsedImage = ServerImageFileSchema.shape.profileImage.parse(file);

    const userId = await getCurrentUserId();

    const imageToUploadUrl = await uploadPictureToSupabase(
      parsedImage[0],
      userId ?? "",
      supabase,
      "tips"
    );

    return imageToUploadUrl;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error);
      return generateErrorResult(error.message);
    }

    console.log(error);
    return generateErrorResult("There was an error uploading the tip image...");
  }
}

/**
 *
 * @param tips - The tips to be uploaded to the database. They come from the activity you're creating.
 * @param activityId - Refers to the created activity ID. This way, you can link tips to a specific activity
 */
async function uploadActivityTips(
  tips: ProcessedTip[],
  activityId: Tables<"activities">["activity_id"]
): Promise<any> {
  // Avoid sending empty tips to the server
  const filteredTips = tips.filter(
    (tip) => tip.imageFile.length > 0 && tip.imageFile[0] !== ""
  );

  const uploadPromises = filteredTips.map(async (tip, index) => {
    try {
      const imageUrl = await generateImageUrl(tip.imageFile as File[]);

      // Don't process tips without images
      if (!imageUrl) {
        return;
      }

      const parsedTips = TipServerSideSchema.parse(filteredTips);

      const userId = await getCurrentUserId();

      const { error } = await supabase.from("tips").insert({
        description: parsedTips[index].description,
        display_image_url: imageUrl,
        activity_id: activityId,
        created_by_user_id: userId,
      });

      if (error) {
        console.log(error);
        return generateErrorResult(
          "There was an error while uploading your tips...",
          error
        );
      }
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.message);
        return generateErrorResult(error.message);
      }

      console.log(error);
      return generateErrorResult(
        "There was an error while uploading your tips..."
      );
    }
  });

  // Upload the tips images at once
  await Promise.all(uploadPromises);

  return generateSuccessResult("Tips uploaded successfully");
}

// Form data values
type ProcessedActivityData = {
  name: string;
  description: string;
  accessibilityMinValue: number;
  accessibilityMaxValue: number;
  category: number;
  participants: number;
  tips: ProcessedTip[];
};

/**
 *
 * @param formData - The activity data obtained from the client
 * @returns - The processed activity data ready to be uploaded to the database
 */
function extractFormData(
  formData: FormData
): ProcessedActivityData | ErrorResult {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const accessibilityMinValue = Number(
      formData.get("accessibilityMinValue") as string
    );
    const accessibilityMaxValue = Number(
      formData.get("accessibilityMaxValue") as string
    );
    const category = Number(formData.get("category") as string) as number;
    const participants = Number(
      formData.get("participants") as string
    ) as number;
    const tips = extractTips(formData);

    const parsedActivity = ActivityServerSideSchemaValidation.parse({
      name,
      description,
      accessibilityMinValue,
      accessibilityMaxValue,
      category,
      participants,
      tips,
    });

    console.log(parsedActivity);

    return { ...parsedActivity };
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.message);
      return generateErrorResult(error.message);
    }

    console.log(error);

    return generateErrorResult(
      "There was an unknown error while extracting form data..."
    );
  }
}

/**
 *
 * @param formData - The form data obtained from the activity. We look for this on this one
 * @returns - The tips from the activity
 */
function extractTips(formData: FormData): ProcessedTip[] {
  const TIP_PREFIX: string = "tip-";
  const IMAGE_TYPE: string = "image";
  const DESCRIPTION_TYPE: string = "description";
  const tips: { imageFile: ProcessedTip["imageFile"]; description: string }[] =
    [];

  formData.forEach((value, key) => {
    if (key.startsWith(TIP_PREFIX)) {
      const [, index, type] = key.split("-");
      const tipIndex = parseInt(index, 10);

      if (type === IMAGE_TYPE) {
        const description = formData.get(
          `${TIP_PREFIX}${index}-${DESCRIPTION_TYPE}`
        ) as string;
        tips[tipIndex] = {
          imageFile: [
            typeof value !== "string" || typeof value !== "undefined"
              ? value
              : (undefined as File | undefined | string),
          ] as File[] | string[] | undefined[],
          description,
        };
      }
    }
  });

  return tips;
}

/**
 *
 * @param name - The activity name
 * @param description - The activity description
 * @param accessibilityMinValue - The shortest value of accessibility
 * @param accessibilityMaxValue - The largest value of accessibility
 * @param category - The activity category id
 * @param participants - The number of participants from the activity
 * @param userId - The user ID who's uploading the activity
 * @returns
 */
async function insertActivityIntoDatabase(
  name: string,
  description: string,
  accessibilityMinValue: number,
  accessibilityMaxValue: number,
  category: number,
  participants: number,
  userId?: string
) {
  if (!userId) {
    return;
  }
  const { data, error } = await supabase
    .from("activities")
    .insert({
      name,
      created_by_user_id: userId,
      accessibility_max_value: accessibilityMaxValue,
      accessibility_min_value: accessibilityMinValue,
      description,
      participants: participants,
      category_id: category,
    })
    .select("activity_id")
    .maybeSingle();

  if (!error && data) {
    return data.activity_id;
  }

  const CREATE_ACTIVITY_ERROR = "There was an error creating your activity...";

  if (error) {
    return generateErrorResult(CREATE_ACTIVITY_ERROR, error);
  }
}

export async function createNewActivity(formData: FormData) {
  const data = extractFormData(formData);

  console.log(data);

  if ("tips" in data) {
    const userId = await getCurrentUserId();
    const activityId = await insertActivityIntoDatabase(
      data.name,
      data.description,
      data.accessibilityMinValue,
      data.accessibilityMaxValue,
      data.category,
      data.participants,
      userId
    );

    if (typeof activityId === "number") {
      const tipsResponse = await uploadActivityTips(data.tips, activityId);

      console.log(tipsResponse);

      if ("message" in tipsResponse && tipsResponse.success !== true) {
        return generateErrorResult(tipsResponse.error);
      }

      return {
        success: true,
        activityId: activityId,
        message: "Activity uploaded successfully!",
      };
    }
  }
}
