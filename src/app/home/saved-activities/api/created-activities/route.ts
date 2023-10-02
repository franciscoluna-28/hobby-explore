import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// Function to fetch activities for the current user
async function fetchUserActivities(user_id: string) {
  const supabase = createRouteHandlerClient({ cookies });
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
    .eq("user_uuid", user_id);

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

// Your GET request handler to fetch user activities
export async function GET(_request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  try {
    // Check if a user is authenticated
    if (!session) {
      return NextResponse.json({
        success: false,
        error: "Not authorized",
        status: 401,
      });
    }

    const user_id = session.user.id;

    const result = await fetchUserActivities(user_id);
    const { email } = session.user;

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error,
        status: result.status,
      });
    }

    return NextResponse.json({
      success: true,
      activities: result.activities,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      status: 500,
    });
  }
}
