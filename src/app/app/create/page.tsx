import { CreateActivityModal } from "@/components/create-activity/CreateActivityModal";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { handleProtectedRoute } from "@/services/auth";

export default async function CreateActivity() {
  await handleProtectedRoute();

  return (
    <ErrorBoundary>
      <CreateActivityModal />
    </ErrorBoundary>
  );
}
