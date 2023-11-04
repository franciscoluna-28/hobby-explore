import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { IoIosAdd } from "react-icons/io";
import { ACTIVITY_CATEGORIES } from "@/database/activities-categories";

const supabase = createServerComponentClient({ cookies });

export default async function Test() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="">
      <ul className="flex gap-4 rounded-xl">
        {ACTIVITY_CATEGORIES.map((category) => {
          return (
            <li
              className="bg-gray text-slate-500 p-2 rounded-full px-4"
              key={category.category_id}
            >
              {category.name}
            </li>
          );
        })}
      </ul>

      <div className="cursor-pointer mt-8">
        <div className="flex justify-between items-center gap-4 bg-white border border-slate-500/10 shadow-sm hover:shadow-md duration-200 rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-slate-500 text-sm ">
              Hey Francisco! Get started by creating some activities and
              teaching others your favorite hobbies
            </span>
          </div>

          <div className="flex">
            <div className="bg-mainGreen rounded-full">
              <IoIosAdd className="text-white text-3xl"></IoIosAdd>
            </div>
          </div>
        </div>
      </div>
      {/*       <form action="/auth/sign-out" method="post">
        <button className="button block" type="submit">
            Sign out
        </button>

        <div className="flex gap-4">
          <Link href="/create-activity">
            <Button>Create Activity</Button>
          </Link>
          <Link href="/home/saved-activities">
            <Button>Saved Activities</Button>
          </Link>
        </div>
      </form>

      <h1>Hi! {user?.email} </h1> */}
    </div>
  );
}
