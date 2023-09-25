import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Get the public URL of an image in a specified bucket.
 *
 * @param {string} path - The path to the image within the bucket.
 * @param {string} bucketName - The name of the bucket in Supabase storage.
 * @param {SupabaseClient} supabase - The Supabase client instance for authentication.
 * @returns {Promise<string>} A Promise that resolves to the public URL of the image.
 * @throws {Error} Throws an error if there's an issue getting the public URL.
 */
async function getPublicImageUrl(
  path: string,
  bucketName: string,
  supabase: SupabaseClient
): Promise<string> {
  try {
    const { data } = supabase.storage.from(bucketName).getPublicUrl(path);

    if (data) {
      return data.publicUrl;
    } else {
      throw new Error("Public URL not found");
    }
  } catch (error) {
    throw new Error(`Failed to get public URL`);
  }
}

export { getPublicImageUrl };
