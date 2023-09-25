import { Tips } from "@/tips/tips";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  extractActivityData,
  extractTips,
  uploadTipsToSupabase,
} from "@/utils/upload-activity/helpers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { uploadActivityToSupabase } from "@/utils/upload-activity/upload-activity-to-supabase";

// Supabase client
const supabase = createRouteHandlerClient({ cookies });

export async function POST(request: Request) {
  const { session } = (await supabase.auth.getSession()).data;

  try {
    const formData = await request.formData();
    const activityData = extractActivityData(formData);
    const tips = extractTips(formData);

    // Check if there are any tips, as an activity must have at least one
    if (tips.length === 0) {
      return NextResponse.json({
        success: false,
        error: "Activity must have at least one tip!",
        status: 400,
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
        status: 400,
      });
    }

    // Upload the activity data to Supabase
    const activityUploadResult = await uploadActivityToSupabase(
      supabase,
      activityData,
      session?.user.id!
    );

    if (!activityUploadResult?.success) {
      throw new Error(activityUploadResult?.error);
    }

    // Upload the tips data to Supabase, including image URLs
    const tipsWithImageURLs = await uploadTipsToSupabase(
      tips as Tips[],
      session!.user.id,
      activityUploadResult!.activity_id,
      supabase
    );

    // Now with the tips processed with the image URL, upload them
    await supabase.from("tips").upsert(tipsWithImageURLs);

    return NextResponse.json({
      success: true,
      activity_id: activityUploadResult!.activity_id,
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        status: 500,
      });
    }
  }
}
