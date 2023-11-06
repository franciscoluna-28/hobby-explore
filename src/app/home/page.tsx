"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosAdd } from "react-icons/io";
import { ACTIVITY_CATEGORIES } from "@/database/activities-categories";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { activitySchema } from "@/schemas/activitySchema";
import z from "zod";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Test() {

  const supabase = createClientComponentClient();



  return (
    <>
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
      </div>
      <Link href="/create-activity">
        <div className="cursor-pointer mt-8">
          <div className="flex justify-between items-center gap-4 bg-white border border-slate-500/10 shadow-sm hover:shadow-md duration-200 rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
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
      </Link>

      <form action="/auth/sign-out" className="w-fit mt-4" method="POST">
        <Button variant="destructive">Sign Out</Button>
      </form>
    </>
  );
}
