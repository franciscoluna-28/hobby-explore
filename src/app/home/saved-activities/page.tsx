"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi"
import  { AiTwotoneStar} from "react-icons/ai"

export default function SavedActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(activities);

  useEffect(() => {
    async function fetchUserActivities() {
      try {
        const response = await fetch("saved-activities/api/created-activities"); // Reemplaza con la URL correcta de tu API route
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.success) {
          setActivities(data.activities);
        } else {
          setError(data.error);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserActivities();
  }, [error]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-8">
      <h1>Hi, these are your saved activities</h1>
      <ul>
        {activities.map((activity: any) => (
          <li key={activity.id}>
            <article className="bg-white flex flex-col shadow-xl border rounded-2xl max-w-md">
              <div className="rounded-t-2xl">
                <Image
                  width={600}
                  className="rounded-t-2xl max-h-64"
                  height={200}
                  src={activity.main_image_url}
                  alt="Activity image"
                ></Image>
              </div>
              <div className="p-8">
                <div className="flex">
                <div>
                <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>User</AvatarFallback>
</Avatar>
                </div>
                <div className="flex flex-col ml-4
                ">
<span className="block text-sm font-medium">
  Francisco Luna
</span>
<span className="block text-sm">
  {activity.created_at}
</span>
</div>
                </div>
                <h2 className="font-bold mt-6 text-mainBlack text-2xl">{activity.name}</h2>
                <div className="flex justify-between">
                  <div className="flex gap-2 mt-6 text-sm text-gray-800 font-medium">
                  <HiLocationMarker className="text-xl"/>
               <span>{activity.location}</span>
                  </div>
                  <div className="flex items-end">
<div className="flex items-center gap-2">
                  <AiTwotoneStar className="text-yellow-500"/>
                  <span className="block text-yellow-500">5.0</span>
                  </div> 
                </div>
                </div>
             
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
