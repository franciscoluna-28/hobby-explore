import { Header } from "@/components/layout/Header";
import "../globals.css";
import { getCurrentUser, handleProtectedRoute } from "@/services/auth";
import { Toaster, toast } from "sonner";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  await handleProtectedRoute();

  return (
    <>
      <Toaster />
      <Header profilePictureUrl={user?.profile_picture_url} />
      <main className="flex justify-center flex-col p-8 items-center">{children}</main>
    </>
  );
}
