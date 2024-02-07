

import { CreateActivityModal } from "@/components/create-activity/CreateActivityModal";
import ErrorBoundary from "@/components/layout/ErrorBoundary";

export default function CreateActivity() {
    return (
        <ErrorBoundary>
        <CreateActivityModal/>
        </ErrorBoundary>
    )
}