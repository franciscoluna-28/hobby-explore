import { Header } from "@/components/layout/Header";
import "../globals.css";
import { getCurrentUser } from "@/services/auth";
import { Toaster } from "sonner";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <>
        <Toaster/>
        <Header profilePictureUrl={user?.profile_picture_url} />
      <main className="p-8">{children}</main>
    </>
  );
}
