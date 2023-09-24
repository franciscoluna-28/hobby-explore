import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const data = await request.formData();

    if (!data) {
      return NextResponse.json({
        success: false,
        error: "No form data found",
        status: 400,
      });
    }

    const formDataValue = data.get("formData");

    if (formDataValue !== null) {
      const { activityData, tipData } = JSON.parse(formDataValue.toString());

      console.log(activityData);

      const supabase = createRouteHandlerClient({ cookies });

      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Check if a user is authenticated
      if (!session) {
        return NextResponse.json({
          success: false,
          error: "Not authorized",
          status: 401,
        });
      }

      const user_id = session.user.id;

      // Upload activity to Supabase
      const { data: activityResult, error: activityError } = await supabase
        .from("activities")
        .upsert([
          {
            ...activityData,
            user_id: session.user.id,
          },
        ])
        .select("id");

      if (activityError) {
        return NextResponse.json({
          success: false,
          error: activityError.message,
          status: 500,
        });
      }

      const activity_id = activityResult[0].id;

      // Upload tips and associate them with the activity
      const tipsWithImageURLs = await Promise.all(
        tipData.map(async (tip: any) => {
          const imageFileName = `${uuidv4()}_${tip.name}`;
          const { data: imageUploadResult, error: imageUploadError } =
            await supabase.storage
              .from("tips")
              .upload(`tips/${user_id}/${imageFileName}`, tip, {
                contentType: tip.type,
              });

          if (imageUploadError) {
            throw new Error(imageUploadError.message);
          }

          return {
            activity_id: activity_id,
            text: tip.text,
            image_url: imageUploadResult.path,
          };
        })
      );

      // Upload tip data to Supabase
      const { error: tipError } = await supabase
        .from("tips")
        .upsert(tipsWithImageURLs);

      if (tipError) {
        return NextResponse.json({
          success: false,
          error: tipError.message,
          status: 500,
        });
      }

      return NextResponse.json({ success: true, activity_id, status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      status: 500,
    });
  }
}
