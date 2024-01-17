import { SUPABASE_STORAGE_URL } from "@/constants/supabase";
import { Database } from "@/lib/database";
import { FileStringValidatorSchema } from "@/schemas/FieStringValidatorSchema";
import { AcceptedBuckets } from "@/types/files";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * @function getSupabaseFileUrlFromRelativePath - Returns the complete supabase URL from the specified bucket
 * @param bucketName - The name of the bucket to retrieve the file from
 * @param url - This is the relative path to the bucket object. It should look like this: /f44a5a25-b9c2-4bba-bcb1-d917b04e906d0.9392390523508809.jpg
 * @returns - The complete image path string from the supabase API. Example: https://pnfnkpwwfjrotsossegq.supabase.co/storage/v1/object/public/avatars/f44a5a25-b9c2-4bba-bcb1-d917b04e906d0.9392390523508809.jpg
 */

export function getSupabaseFileUrlFromRelativePath(
  url: string,
  bucketName: AcceptedBuckets
): string {

  return `${SUPABASE_STORAGE_URL}${bucketName}${url}`;
}

/**
 * Asynchronously uploads a picture to Supabase storage and returns the file path.
 *
 * @async
 * @param {File} picture - The picture file to be uploaded.
 * @param {AcceptedBuckets} bucketName - The name of the bucket where the picture will be stored.
 * @returns {Promise<string>} The file path of the uploaded picture.
 * @throws Will throw an error if the upload fails.
 */
export const uploadPictureToSupabase = async (
  picture: File,
  userId: string,
  supabase: SupabaseClient<Database>,
  bucketName: AcceptedBuckets
): Promise<string> => {
  const fileExt = picture.name.split(".").pop();
  const filePath = `/${userId}/${Math.random()}.${fileExt}`;
  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, picture);
  if (uploadError) {
    throw uploadError;
  }

  return filePath;
};


