  import { NextResponse } from "next/server";
  import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
  import { cookies } from "next/headers";

  const supabase = createRouteHandlerClient({ cookies });



  async function updateCurrentUserNameAndLastName(
    name: string,
    lastName: string
  ) {

    const { data: userSession } = await supabase.auth.getSession();

    if (!userSession) {
      return NextResponse.json({
        success: false,
        error: "Not authorized.",
        status: 401,
      });
    }

    const { data: user, error } = await supabase
      .from("users")
      .update({ name: name, last_name: lastName })
      .eq("id", userSession.session?.user.id);

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        status: 500,
      });
    }

    const channel = supabase
    .channel('users')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
      },
      (payload) => user,
    )
    .subscribe()


    return NextResponse.json({
      success: true,
      user,
      status: 200,
    });
  }

  export async function POST(request: Request): Promise<NextResponse> {
    const { name, last_name } = await request.json();

    if (!name || !last_name) {
      return NextResponse.json({
        success: false,
        error: "Please, provide a name and last name.",
      });
    }

    const result = await updateCurrentUserNameAndLastName(name, last_name);

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.user,
        status: result.status,
      });
    }

  
    return NextResponse.json({
      success: true,
      user: result.user,
      status: 200,
    });
  }
