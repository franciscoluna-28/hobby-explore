import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

const supabase = createServerComponentClient({ cookies });

export default async function Test() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  return (
    <div>
      <h1>Hi! {user?.email}</h1>
      <form action="/auth/sign-out" method="post">
        <button className="button block" type="submit">
          Sign out
        </button>
        <Link href="/create-activity">
        <Button>Create Activity</Button>
        </Link>
        <Link href="/home/saved-activities">
        <Button>Saved Activities</Button>
        </Link>
      </form>
    </div>
  );
}
