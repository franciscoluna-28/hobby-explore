import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/types";

type Activity = {
  user_id: string;
};

async function getActivityById(activity_id: string) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if a user is authenticated
  if (!session) {
    return {
      success: false,
      error: "Not authorized",
      status: 401,
    };
  }

  // Fetch activities for the current user
  const { data: activities, error: activitiesError } = await supabase
    .from("activities")
    .select("*")
    .eq("id", activity_id);

  if (activitiesError) {
    return {
      success: false,
      error: activitiesError.message,
      status: 500,
    };
  }

  return {
    success: true,
    activities,
  };
}

export async function POST(request: Request): Promise<NextResponse> {
  const activity_id = await request.json();

  if (!activity_id) {
    return NextResponse.json({
      success: false,
      error: "Please, insert a valid activity id.",
    });
  }

  const result = await getActivityById(activity_id);

  if (!result.success) {
    return NextResponse.json({
      success: false,
      error: result.error,
      status: result.status,
    });
  }

  return NextResponse.json({
    success: true,
    activity: result.activities,
    status: 200,
  });
}
