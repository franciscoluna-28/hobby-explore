import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  console.log(email, password);

  const supabase = createRouteHandlerClient({ cookies });

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.json({status: 301, message: error.message})
  }

  

/*   if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not authenticate user`,
      {
        status: 301,
      }
    );
  } */

  console.log(data);
  

  if(data.user) {
 return NextResponse.json({status: 200, message: "User created successfully"})   
  
  ;
}
}
