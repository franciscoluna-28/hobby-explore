import { getCurrentUser } from "@/services/auth";
import { redirect } from "next/navigation";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";

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

  return (
    <>
      <Toaster richColors closeButton />
      <main className="flex flex-col items-center w-full m-auto h-screen justify-center max-w-[1200px]">
        {children}
      </main>
    </>
  );
}
