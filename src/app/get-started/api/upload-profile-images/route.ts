import { NextApiRequest, NextApiResponse } from "next";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { uploadImageToSupabase } from "@/utils/images/upload-image-to-supabase";
import { getPublicImageUrl } from "@/utils/images/get-public-image-url";
import { isUserAuthenticated } from "@/utils/auth/is-user-authenticated";

export const dynamic = "force-dynamic";

export async function POST(request: Request, res: NextApiResponse) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { session } = (await supabase.auth.getSession()).data;
    const formData = await request.formData();
    console.log(formData);
    const croppedImageFile: File | null = formData.get(
      "croppedImage"
    ) as unknown as File;

    const isAuthenticated = await isUserAuthenticated(supabase);

    // If the user is not authenticated, return a 401 Unauthorized response.
    if (!isAuthenticated) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const image = await uploadImageToSupabase(
      session?.user!.id!,
      croppedImageFile,
      "profile_pictures",
      supabase
    );
    const image_url = await getPublicImageUrl(
      image,
      "profile_pictures",
      supabase
    );

      console.log(image_url)

    const { data: userResult, error: userError } = await supabase
      .from("users")
      .update({user_profile_url: image_url}).eq("id", session?.user.id);

      console.log(userResult)


    if (userError) {
      return NextResponse.json({success: false})
    }

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}