"use server";

import ActivitySchema from "@/schemas/activities/ActivitySchema";
import { z } from "zod";
import { uploadPictureToSupabase } from "../supabase/storage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database, Tables } from "@/lib/database";
import { redirect } from "next/navigation";

const supabase = createServerComponentClient<Database>({ cookies });

type Activity = z.infer<typeof ActivitySchema>;

async function getCurrentUserId(): Promise<string | undefined> {
  return (await supabase.auth.getUser()).data.user?.id;
}

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

  console.log(imageToUploadUrl);

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

  const uploadPromises = filteredTips.map(async (tip, index) => {
    try {
      const imageUrl = await generateImageUrl(
        tip.imageFile ? tip.imageFile : undefined
      );

      console.log(imageUrl);

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

      console.log(error);

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

export async function createNewActivity(formData: FormData) {
  console.log(formData);

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
        tips[tipIndex] = {
          imageFile: value as File | undefined | string,
          description,
        };
      }
    }
  });

  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("activities")
    .insert({
      name: name,
      created_by_user_id: userId,
      accessibility_max_value: Number(accessibilityLastValue),
      accessibility_min_value: Number(accessibilityFirstValue),
      description: description,
      participants: Number(participants),
      category_id: Number(category),
    })
    .select("activity_id")
    .maybeSingle();

  console.log(data);

  if (!error && data) {
    // TODO: Handle null or undefined id
    const activityId = data.activity_id;

    // TODO: Handle errors
    await uploadActivityTips(tips, activityId);

    redirect(`/app/activities/${activityId}`);
  }
}
