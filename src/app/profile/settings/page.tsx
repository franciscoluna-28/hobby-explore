import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserProfileSettings() {
    return (
        <div>
            <h2>User Profile Settings</h2>
            <Button asChild>
      <Link href="/profile">Go Back</Link>
    </Button>
        </div>
    )
}