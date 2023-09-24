import { Database } from "@/lib/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { activity_id, text, image_url } = await request.json();

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { error } = await supabase.from("tips").insert({
      activity_id: activity_id,
      text: text,
      image_url: image_url,
    });

    return NextResponse.json({ error });
  }

  return NextResponse.json({});
}
