import { NextApiRequest, NextApiResponse } from "next";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { session } = (await supabase.auth.getSession()).data;
    const { name, home, birthDate } = await req.json();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Upload the data to Supabase
    const { data: user, error } = await supabase
      .from("users")
      .update({ name: name, home: home, birthDate: birthDate })
      .eq("id", session.user.id);

    if (error) {
      // Handle specific Supabase errors
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message, status: 500 });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
