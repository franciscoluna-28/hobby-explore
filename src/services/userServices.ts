"use server";

import { Database, Tables } from "@/lib/database";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { uploadPictureToSupabase } from "./supabase/storage";
import { ProfileImagesFileSchema } from "@/schemas/files/ProfileImagesFileSchema";
import { ZodError } from "zod";
import supabaseServer from "@/utils/supabase/server";

type ActionResponse = {
  success?: boolean;
  message?: string;
  error?: PostgrestError;
};

// File used exclusively created for user CRUD operations
const supabase = supabaseServer()

export async function updateUserDescription(
  description: string,
  userId: Tables<"users">["user_id"]
) {
  const { error } = await supabase
    .from("users")
    .update({ description: description })
    .match({ user_id: userId });

  if (error) {
    return {
      ...error,
    };
  }

  revalidatePath("/app/my-profile");

  return {
    success: true,
    message: "User description updated successfully",
  };
}

export async function updateUserUsername(username: string, userId: string) {
  const { error } = await supabase
    .from("users")
    .update({ username })
    .match({ user_id: userId });

  if (error) {
    return {
      ...error,
      success: false,
    };
  }

  revalidatePath("/app/my-profile");

  return {
    success: true,
    message: "Username updated successfully",
  };
}

export async function updateDisplayName(displayName: string, userId: string) {
  const { error } = await supabase
    .from("users")
    .update({ displayName })
    .match({ user_id: userId });

  if (error) {
    return {
      ...error,
    };
  }

  revalidatePath("/app/my-profile");

  return {
    success: true,
    message: "Display name updated successfully",
  };
}

export async function updateUserLocation(
  location: Tables<"users">["location"],
  userId: Tables<"users">["user_id"]
) {
  const { error } = await supabase
    .from("users")
    .update({
      location,
    })
    .match({
      user_id: userId,
    });

  if (error) {
    return {
      ...error,
    };
  }

  // This is the equivalent of setting a new global state
  revalidatePath("/app/my-profile");

  return {
    success: true,
    message: "Location updated successfully!",
  };
}

/**
 * Updates the existing profile picture of the user. Also, updates the cache to reflect the changes in the UI
 * @param profilePictureUrl - The new profile picture url obtained from uploading an object to Supabase storage
 */
export async function updateUserProfilePicture(
  formData: FormData,
  userId: string
) {
  try {
    const file = formData.get("profilePicture") as File | null;

    console.log(file);

    if (!file) {
      throw new Error("You need to upload a profile picture!");
    }

    // Upload file to Supabase storage
    const filePath = await uploadPictureToSupabase(
      file,
      userId,
      supabase,
      "avatars"
    );

    if (!filePath || filePath === "") {
      throw new Error("There was an error uploading the file to Supabase");
    }

    const { error } = await supabase
      .from("users")
      .update({
        profile_picture_url: filePath,
      })
      .match({ user_id: userId });

    if (error) {
      return {
        ...error,
      };
    }

    revalidatePath("/app/my-profile");
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error.errors);

      return {
        success: false,
        message:
          error.errors.length > 1
            ? error.errors[1].message
            : error.errors[0].message,
      };
    }

    return {
      success: true,
      message: "Profile picture updated successfully!",
    };
  }
  return {
    success: false,
    message: "There was an unknown error while updating your banner picture...",
  };
}

/**
 * Updates the existing profile picture of the user. Also, updates the cache to reflect the changes in the UI
 * @param profilePictureUrl - The new profile picture url obtained from uploading an object to Supabase storage
 */
export async function updateUserBannerPicture(
  formData: FormData,
  userId: string
) {
  try {
    const file = formData.get("bannerPicture") as File | null;

    if (!file) {
      throw new Error("You must provide a banner picture to update");
    }

    const parsedImageFile = ProfileImagesFileSchema.parse({
      image: file,
    });

    const filePath = await uploadPictureToSupabase(
      parsedImageFile.image,
      userId,
      supabase,
      "banners"
    );

    if (!filePath || filePath === "") {
      throw new Error("There was an error uploading the file to Supabase");
    }

    const { error } = await supabase
      .from("users")
      .update({
        banner_picture_url: filePath,
      })
      .match({ user_id: userId });

    if (error) {
      return {
        ...error,
      };
    }

    revalidatePath("/app/my-profile");

    return {
      success: true,
      message: "Banner picture updated successfully!",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error.errors);

      return {
        success: false,
        message:
          error.errors.length > 1
            ? error.errors[1].message
            : error.errors[0].message,
      };
    }

    return {
      success: false,
      message:
        "There was an unknown error while updating your banner picture...",
    };
  }
}
