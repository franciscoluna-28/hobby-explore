"use server";

import ActivitySchema, { TipSchema } from "@/schemas/activities/ActivitySchema";
import { ZodError, z } from "zod";
import { uploadPictureToSupabase } from "../supabase/storage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database, Tables } from "@/lib/database";
import { redirect } from "next/navigation";
import { generateErrorResult } from "../errors/generateErrors";
import { ImageFileSchema } from "@/schemas/files/ImageFileSchema";
import { generateSuccessResult } from "../sucess/generateSuccess";

const supabase = createServerComponentClient<Database>({ cookies });

type ProcessedTip = {
  description: string;
  imageFile: undefined[] | string[] | File[];
};

async function getCurrentUserId(): Promise<string | undefined> {
  return (await supabase.auth.getUser()).data.user?.id;
}

/**
 * Generates the relative path url of an image uploaded to Supabase
 * @param file - The image file to be uploaded
 * @returns Promise<string | undefined> - A promise with the string path or undefined if the image wasn't uploaded successfully
 */
async function generateImageUrl(
  file: File[] | undefined
): Promise<string | undefined> {
  try {
    // Don't generate urls for undefined images
    if (!file) return;

    // Verify image format
    const parsedImage = ImageFileSchema.shape.document.parse(file);

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
      generateErrorResult(error.message);
    }

    console.error(error);
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
): Promise<void> {
  // Avoid sending empty tips to the server
  const filteredTips = tips.filter(
    (tip) => tip.imageFile[0] !== undefined || tip.imageFile[0] !== ""
  );

  const uploadPromises = filteredTips.map(async (tip) => {
    try {
      const imageUrl = await generateImageUrl(tip.imageFile as File[]);

      // Don't process tips without images
      if (!imageUrl) {
        return;
      }

      const userId = await getCurrentUserId();

      const { error } = await supabase.from("tips").insert({
        description: tip.description,
        display_image_url: imageUrl,
        activity_id: activityId,
        created_by_user_id: userId,
      });

      if (error) {
        return generateErrorResult(
          "There was an error while uploading your tips...",
          error
        );
      }
    } catch (error) {
      console.error("Error uploading tip image...");
    }
  });

  // Upload the tips images at once
  await Promise.all(uploadPromises);
}

// Formdata values
type ProcessedActivityData = {
  name: string;
  description: string;
  accessibilityFirstValue: string;
  accessibilityLastValue: string;
  category: string;
  participants: string;
  tips: ProcessedTip[];
};

/**
 *
 * @param formData - The activity data obtained from the client
 * @returns - The processed activity data ready to be uploaded to the database
 */
function extractFormData(formData: FormData): ProcessedActivityData {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const accessibilityFirstValue = formData.get(
    "accessibilityFirstValue"
  ) as string;
  const accessibilityLastValue = formData.get(
    "accessibilityLastValue"
  ) as string;
  const category = formData.get("category") as string;
  const participants = formData.get("participants") as string;
  const tips = extractTips(formData);

  return {
    name,
    description,
    accessibilityFirstValue,
    accessibilityLastValue,
    category,
    participants,
    tips,
  };
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
          imageFile: [value as File | undefined | string] as
            | File[]
            | string[]
            | undefined[],
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
 * @param accessibilityFirstValue - The shortest value of accessibility
 * @param accessibilityLastValue - The largest value of accessibility
 * @param category - The activity category id
 * @param participants - The number of participants from the activity
 * @param userId - The user ID who's uploading the activity
 * @returns
 */
async function insertActivityIntoDatabase(
  name: string,
  description: string,
  accessibilityFirstValue: string,
  accessibilityLastValue: string,
  category: string,
  participants: string,
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
      accessibility_max_value: Number(accessibilityLastValue),
      accessibility_min_value: Number(accessibilityFirstValue),
      description,
      participants: Number(participants),
      category_id: Number(category),
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
  const {
    name,
    description,
    accessibilityFirstValue,
    accessibilityLastValue,
    category,
    participants,
    tips,
  } = extractFormData(formData);

  const userId = await getCurrentUserId();
  const activityId = await insertActivityIntoDatabase(
    name,
    description,
    accessibilityFirstValue,
    accessibilityLastValue,
    category,
    participants,
    userId
  );

  if (activityId) {
    await uploadActivityTips(tips, activityId);

    redirect(`/app/activities/${activityId}`);

    return generateSuccessResult(
      "Your activity has been created successfully!"
    );
  }
}
