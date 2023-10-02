import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { IMAGE_CONTENT_TYPE } from "@/constants/content-type";
/**
 * Uploads an image to a specified bucket in Supabase storage.
 *
 * @param {string} user_id - The user ID associated with the image.
 * @param {File} image - The File object representing the image to be uploaded.
 * @param {string} bucketName - The name of the bucket in Supabase storage.
 * @param {SupabaseClient} supabase - The Supabase client instance for authentication.
 * @returns {Promise<string>} A Promise that resolves to the path of the uploaded image.
 * @throws {Error} Throws an error if there's an issue with the image upload.
 */
async function uploadImageToSupabase(
  user_id: string,
  image: File,
  bucketName: string,
  supabase: SupabaseClient
): Promise<string> {
  const imageFileName = `${uuidv4()}_${image.name}`;
  const { data: imageUploadResult, error: imageUploadError } =
    await supabase.storage
      .from(bucketName)
      .upload(`${user_id}/${imageFileName}`, image, {
        contentType: IMAGE_CONTENT_TYPE, 
      });

  if (imageUploadError) {
    throw new Error(imageUploadError.message);
  }

  return imageUploadResult.path;
}

export { uploadImageToSupabase };
