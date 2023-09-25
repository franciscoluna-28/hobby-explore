import { Tips } from "@/tips/tips";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  extractActivityData,
  extractTips,
  uploadTipsToSupabase,
} from "@/utils/upload-activity/helpers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseClient } from "@supabase/supabase-js";
import { isUserAuthenticated } from "@/utils/auth/is-user-authenticated";

// Supabase client
const supabase = createRouteHandlerClient({ cookies });

export async function POST(request: Request) {
  const { session } = (await supabase.auth.getSession()).data;

  async function uploadActivityToSupabase(
    supabase: SupabaseClient,
    activityData: any,
    user_uuid: string
  ) {
    const isAuthenticated = await isUserAuthenticated(supabase);

    if (!isAuthenticated) {
      return {
        success: false,
      };
    }

    try {
      const { data: activityResult, error: activityError } = await supabase
        .from("activities")
        .upsert([{ ...activityData, user_uuid }])
        .select("id");

      if (activityError) {
        return {
          success: false,
        };
      }

      const activity_id = activityResult[0].id;

      return {
        success: true,
        activity_id,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }

  try {
    const formData = await request.formData();
    const activityData = extractActivityData(formData);
    const tips = extractTips(formData);

    // Check if there are any tips, as an activity must have at least one
    if (tips.length === 0) {
      return NextResponse.json({
        success: false,
        error: "Activity must have at least one tip!",
      });
    }

    // Check if any tip has an empty text
    const emptyTipIndices: number[] = tips
      .map((tip, index) => (tip.text.trim() === "" ? index : -1))
      .filter((index) => index !== -1);

    if (emptyTipIndices.length > 0) {
      return NextResponse.json({
        success: false,
        error: "Tips must not have empty text!",
        emptyTipIndices: emptyTipIndices,
      });
    }

    // Upload the activity data to Supabase using the helper function
    const activityUploadResult = await uploadActivityToSupabase(
      supabase,
      activityData,
      session?.user.id!
    );

    if (!activityUploadResult?.success) {
      return NextResponse.json({
        success: false,
        error: "Failed to upload activity.",
      });
    }

    // Upload the tips data to Supabase, including image URLs
    const tipsWithImageURLs = await uploadTipsToSupabase(
      tips as Tips[],
      session!.user.id,
      activityUploadResult.activity_id,
      supabase
    );

    // Now with the tips processed with the image URL, upload them
    await supabase.from("tips").upsert(tipsWithImageURLs);

    return NextResponse.json({
      success: true,
      activity_id: activityUploadResult.activity_id,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Internal server error.",
    });
  }
}
