import { Header } from "@/components/layout/Header";
import "../globals.css";
import { getCurrentUser } from "@/services/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <>
      <div className="max-h-min">
        <Header profilePictureUrl={user?.profile_picture_url} />
      </div>
      <main className="p-8">{children}</main>
    </>
  );
}
