import { NextApiRequest, NextApiResponse } from "next";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { uploadImageToSupabase } from "@/utils/images/upload-image-to-supabase";


export const dynamic = "force-dynamic";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { session } = (await supabase.auth.getSession()).data;
    const image = await req.json();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Convert the blob into a file
    const imageFile = new File([image], "image.jpg", { type: "image/jpeg" });
    console.log(imageFile);

    

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
