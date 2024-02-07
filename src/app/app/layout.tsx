import { Header } from "@/components/layout/Header";
import "../globals.css";
import { getCurrentUser, handleProtectedRoute } from "@/services/auth";
import { Toaster } from "sonner";
import ErrorBoundary from "@/components/layout/ErrorBoundary";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  await handleProtectedRoute();

  return (
    <>
      <ErrorBoundary>
        <Toaster richColors />
        <Header profilePictureUrl={user?.profile_picture_url} />
        <main className="flex justify-center flex-col p-8 items-center">
          {children}
        </main>
      </ErrorBoundary>
    </>
  );
}
