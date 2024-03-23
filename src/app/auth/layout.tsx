import { getCurrentUser } from "@/services/auth";
import { redirect } from "next/navigation";
import "../globals.css"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Make sure the user is redirected to the main app screen if they're already authenticated
  if (user) {
    redirect("/app/explore");
  }

  return <main className="flex flex-col max-w-[600px] items-center w-full m-auto h-screen justify-center">{children}</main>;
}
