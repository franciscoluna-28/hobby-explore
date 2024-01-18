import { useEffect, useState } from "react";
import { useAuth } from "@/store/useAuthStore";
import { toast } from "sonner";
import {
  SupabaseClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database";
import { uploadPictureToSupabase } from "@/services/supabase/storage";
import { AcceptedBuckets } from "@/types/files";
import { convertWordFirstLetterToUppercase } from "@/utils/strings";
import { useUploadContext } from "./context/useUploadContext";
import { PostgrestError } from "@supabase/supabase-js";

function getBucketString(bucket: AcceptedBuckets): string {
  if (bucket === "avatars") return "avatar";
  if (bucket === "banners") return "banner";
  return "photo";
}

export function usePictureUpload(userId: string) {
  const supabase = createClientComponentClient<Database>();
  const {
    isUploadingProfile,
    isUploadingBanner,
    setIsUploadingProfile,
    setIsUploadingBanner,
  } = useUploadContext();

  const updateProfilePicture = useAuth((state) => state.setUserProfilePhotoUrl);
  const updateBannerPicture = useAuth((state) => state.setUserBannerPhotoUrl);

  async function updateUserPicture(
    supabase: SupabaseClient<Database>,
    userId: string,
    updateFields: Record<string, string | null>
  ): Promise<void> {
    try {
      // Update user information in the "users" table
      await supabase
        .from("users")
        .update(updateFields)
        .match({ user_id: userId });
    } catch (error) {
      console.error("Error updating user picture:", error);
      throw new Error("Failed to update user picture. Please try again.");
    }
  }

  const uploadPicture = async (
    file: File,
    bucket: AcceptedBuckets,
    updateFunction: (url: string) => void
  ) => {
    try {
      if (bucket === "avatars") {
        setIsUploadingProfile(true);
      } else if (bucket === "banners") {
        setIsUploadingBanner(true);
      }

      toast.loading(`Uploading ${getBucketString(bucket)} picture...`);

      // Upload file to Supabase storage
      const filePath = await uploadPictureToSupabase(
        file,
        userId,
        supabase,
        bucket
      );

      // Update user information
      const fieldToUpdate =
        bucket === "avatars" ? "profile_picture_url" : "banner_picture_url";
      await updateUserPicture(supabase, userId, { [fieldToUpdate]: filePath });

      toast.success(
        `${convertWordFirstLetterToUppercase(
          getBucketString(bucket)
        )} picture updated successfully!`
      );
      updateFunction(filePath ?? "");
    } catch (error: PostgrestError | any) {
      console.log(error.message);

      toast.error(
        `Error uploading ${getBucketString(bucket)} picture: ${error.message}`
      );
    } finally {
      if (bucket === "avatars") {
        setIsUploadingProfile(false);
      } else if (bucket === "banners") {
        setIsUploadingBanner(false);
      }
    }
  };

  return {
    isUploadingProfile,
    isUploadingBanner,
    uploadProfilePicture: (file: File) =>
      uploadPicture(file, "avatars", updateProfilePicture),
    uploadBannerPicture: (file: File) =>
      uploadPicture(file, "banners", updateBannerPicture),
  };
}
