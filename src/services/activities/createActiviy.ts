"use server";

import ActivitySchema, { TipSchema } from "@/schemas/activities/ActivitySchema";
import { z } from "zod";
import { uploadPictureToSupabase } from "../supabase/storage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database, Tables } from "@/lib/database";
import { redirect } from "next/navigation";

const supabase = createServerComponentClient<Database>({ cookies });

type Tips = z.infer<typeof TipSchema>

async function getCurrentUserId(): Promise<string | undefined> {
  return (await supabase.auth.getUser()).data.user?.id;
}

/**
 * Generates the relative path url of an image uploaded to Supabase
 * @param file - The image file to be uploaded
 * @returns Promise<string | undefined> - A promise with the string path or undefined if the image wasn't uploaded successfully
 */
async function generateImageUrl(
  file: File | undefined
): Promise<string | undefined> {
  console.log(file);

  if (!file) return;

  const userId = await getCurrentUserId();

  // TODO: Verify image format
  const imageToUploadUrl = await uploadPictureToSupabase(
    file,
    userId ?? "",
    supabase,
    "tips"
  );

  return imageToUploadUrl;
}

type ProcessedTips = {
  description: string | undefined;
  imageFile: File | undefined;
};

async function uploadActivityTips(
  tips: ProcessedTips[],
  activityId: Tables<"activities">["activity_id"]
) {
  // Avoid sending empty tips to the server
  const filteredTips = tips.filter(
    (tip) => tip.imageFile !== undefined || tip.imageFile !== ""
  );

  console.log(filteredTips);

  const uploadPromises = filteredTips.map(async (tip) => {
    try {
      const imageUrl = await generateImageUrl(
        tip.imageFile ? tip.imageFile : undefined
      );

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

      if (!error) {
        console.log("Tip image uploaded successfully:", imageUrl);
      }
    } catch (error) {
      console.error("Error uploading tip image");
    }
  });

  // Upload the tips images at once
  await Promise.all(uploadPromises);
}

type ProcessedActivityData = {
  name: string,
  description: string,
  accessibilityFirstValue: string | number,
  accessibilityLastValue: string | number,
  category: string | number,
  participants: string | number,
  tips: 
}


function extractFormData(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const accessibilityFirstValue = formData.get(
    "accessibilityFirstValue"
  ) as string;
  const accessibilityLastValue = formData.get(
    "accessibilityLastValue"
  ) as string;
  const category = formData.get("category") as string;
  const participants = Number(formData.get("participants") as string);
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

function extractTips(formData: FormData) {
  const TIP_PREFIX: string = "tip-";
  const IMAGE_TYPE: string = "image";
  const DESCRIPTION_TYPE: string = "description";
  const tips: { imageFile: File | string; description: string }[] = [];

  formData.forEach((value, key) => {
    if (key.startsWith(TIP_PREFIX)) {
      const [, index, type] = key.split("-");
      const tipIndex = parseInt(index, 10);

      if (type === IMAGE_TYPE) {
        const description = formData.get(
          `${TIP_PREFIX}${index}-${DESCRIPTION_TYPE}`
        ) as string;
        tips[tipIndex] = { imageFile: value as File | undefined, description };
      }
    }
  });

  return tips;
}

async function insertActivityIntoDatabase(
  name: string,
  description: string,
  accessibilityFirstValue: string,
  accessibilityLastValue: string,
  category: string,
  participants: string,
  userId: string
) {
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
  }
}
