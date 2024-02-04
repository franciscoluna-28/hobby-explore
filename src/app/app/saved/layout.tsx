import { Header } from "@/components/layout/Header";
import { getCurrentUser, handleProtectedRoute } from "@/services/auth";
import { Toaster, toast } from "sonner";
import { SavedActivitiesButtons } from "@/components/activities/containers/SavedActivitiesButtons";

export default async function SavedActivitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SavedActivitiesButtons />
      {children}
    </>
  );
}
