import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getUserById(user_id: string) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session: userSession },
  } = await supabase.auth.getSession();

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user_id);

  if (userError) {
    return {
      success: false,
      error: userError.message,
      status: 500,
    };
  }

  console.log(userSession?.user.id);
  console.log(user[0].id);

  const isCurrentSessionUser = userSession?.user.id === user[0].id;

  return {
    success: true,
    user,
    isCurrentSessionUser,
  };
}

export async function POST(request: Request): Promise<NextResponse> {
  const { user_id } = await request.json();

  console.log(user_id);

  if (!user_id) {
    return NextResponse.json({
      success: false,
      error: "Please, insert a valid user id.",
    });
  }

  const result = await getUserById(user_id);

  if (!result.success) {
    return NextResponse.json({
      success: false,
      error: result.error,
      status: result.status,
    });
  }

  return NextResponse.json({
    success: true,
    user: result.user,
    isCurrentUser: result.isCurrentSessionUser,

    status: 200,
  });
}
