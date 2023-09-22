import { Database } from "@/lib/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestBody = await request.json();

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const user_id = session.user.id;

    const { activityData, tipData } = requestBody;

    // Create the activity and get its ID
    const { data: activityResult, error: activityError } = await supabase
      .from("activities")
      .upsert([
        {
          ...activityData,
          user_uuid: user_id,
        },
      ])
      .select("id");

    if (activityError) {
      return NextResponse.json({
        success: false,
        error: activityError.message,
      });
    }

    const activity_id = activityResult[0].id;

    // Create the tip associated with the activity
    const { data, error: tipError } = await supabase.from("tips").insert({
      activity_id: activity_id,
      ...tipData,
    });

    if (tipError) {
      return NextResponse.json({ success: false, error: tipError.message });
    }

    return NextResponse.json({ success: true, activity_id });
  }

  return NextResponse.json({ success: false, error: "No autorizado" });
}
