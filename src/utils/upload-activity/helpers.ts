import { Tips } from "@/tips/tips";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

import { uploadImageToSupabase } from "@/utils/images/upload-image-to-supabase";
import { TIP_IMAGE_BUCKET_VALUE } from "@/constants/bucket-names";
import { getPublicImageUrl } from "@/utils/images/get-public-image-url";

/**
 * Extracts activity information from FormData.
 *
 * @param {FormData} formData - The FormData object containing activity data.
 * @returns {object} - An object containing extracted activity data.
 */
export function extractActivityData(formData: FormData) {
  const { name, location, category, accessibility, participants } =
    Object.fromEntries(formData);
  return {
    name: name,
    location: location,
    category: category,
    accessibility: accessibility,
    participants: participants,
  };
}

/**
 * Extracts tips from form data.
 *
 * @param {FormData} formData - The FormData object containing tips data.
 * @returns {object[]} - An array of tip objects with id, text, and image.
 */
export function extractTips(formData: FormData): Tips[] {
  const tipIndices = Array.from(formData.keys())
    .filter((key) => key.startsWith("tips["))
    .map((key) => parseInt(key.match(/\d+/)![0], 10))
    .filter((value, index, self) => self.indexOf(value) === index);

  return tipIndices.map((tipIndex) => ({
    id: formData.get(`tips[${tipIndex}][id]`),
    text: formData.get(`tips[${tipIndex}][text]`),
    image: formData.get(`tips[${tipIndex}][image]`),
  })) as Tips[];
}

/**
 * Uploads tips to Supabase.
 *
 * @param {Tips[]} tipData - An array of tip objects.
 * @param {string} user_id - The user's ID.
 * @param {string} activity_id - The ID of the associated activity.
 * @param {SupabaseClient} supabase - The Supabase client.
 * @returns {Promise<object[]>} - A promise that resolves to an array of uploaded tip objects.
 */
export async function uploadTipsToSupabase(
  tipData: Tips[],
  user_id: string,
  activity_id: string,
  supabase: SupabaseClient
) {
  return Promise.all(
    tipData.map(async (tip) => {
      try {
        const image_url = await uploadImageToSupabase(
          user_id,
          tip.image,
          TIP_IMAGE_BUCKET_VALUE,
          supabase
        );

        const publicURL = await getPublicImageUrl(
          image_url,
          TIP_IMAGE_BUCKET_VALUE,
          supabase
        );

        return {
          activity_id: activity_id,
          text: tip.text,
          image_url: publicURL,
        };
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    })
  );
}
