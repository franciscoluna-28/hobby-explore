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

export const dynamic = "force-dynamic";

// TODO: Don't upload the activity unless you upload its relationship
// TODO: Make sure you upload a tip before uplading the activity
export async function POST(request: Request) {
  // Supabase client setup
  const supabase = createRouteHandlerClient({ cookies });
  const { session } = (await supabase.auth.getSession()).data;

  async function uploadActivityToSupabase(
    supabase: SupabaseClient,
    activityData: any,
    user_uuid: string
  ) {
    // Check if the user is authenticated
    const isAuthenticated = await isUserAuthenticated(supabase);

    if (!isAuthenticated) {
      return {
        success: false,
      };
    }

    // Extract the required parameters from activity data
    const { name, location, accessibility, participants, category } =
      activityData;

    // Try to upload the activity to the regarding tables of PostgreSQL
    try {
      const { data: activityResult, error: activityError } = await supabase
        .from("activities")
        .upsert([
          {
            name: name,
            location: location,
            accessibility: accessibility,
            participants: participants,
          },
        ])
        .select("activity_id");

      // Error handling in case the activity isn't uploaded properly
      if (activityError) {
        return {
          error: activityError,
        };
      }

      // Get the activity ID from activity result
      const activity_id = activityResult[0].activity_id;

      // Create the respective relationship of the activity according to the normal forms
      const {
        data: activityRelationshipResult,
        error: activityRelationshipError,
      } = await supabase.from("activities_relationships").insert({
        activity_id: activity_id,
        created_by_user_id: user_uuid,
        category_id: Number(category),
      });

      if (activityRelationshipError) {
        return {
          error: activityRelationshipError,
        };
      }

      return {
        success: true,
        activity_id,
        activityRelationshipResult,
      };
    } catch (error) {
      console.log(error);
      return {
        error: error,
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
        error: activityUploadResult.error,
      });
    }

    // Upload the tips data to Supabase, including image URLs
    const tipsWithImageURLs = await uploadTipsToSupabase(
      tips as Tips[],
      session!.user.id,
      supabase
    );

    // Now with the tips processed with the image URL, upload them
    const { data: tipSubmissionResult, error: tipSubmissionError } =
      await supabase.from("tips").upsert(tipsWithImageURLs).select("tip_id");

    if (tipSubmissionError) {
      return NextResponse.json({
        success: false,
        error: tipSubmissionError,
      });
    }

    if (tipSubmissionResult) {
      const tip_id = tipSubmissionResult[0].tip_id;
      const { error: tipRelationshipError } = await supabase
        .from("tips_relationships")
        .insert({
          activity_id: activityUploadResult.activity_id,
          created_by_user_id: session?.user.id,
          tip_id: tip_id,
        });

      if (tipRelationshipError) {
        return NextResponse.json({
          status: 500,
          error: tipRelationshipError,
        });
      }
    }

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
