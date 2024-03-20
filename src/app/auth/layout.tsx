import { getCurrentUser } from "@/services/auth";
import { redirect } from "next/navigation";

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

  return <>{children}</>;
}
