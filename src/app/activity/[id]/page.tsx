"use client";

import { useEffect, useState } from "react";

export default function Activity({ params }: { params: { id: string } }) {
  const [activity, setActivity] = useState(null);
  const [activityBelongsToCurrentUser, setActivityBelongsToCurrentUser] =
    useState(null);

  useEffect(() => {
    async function fetchActivityData() {
      const response = await fetch(`/activity/api/get-activity-by-id  `, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activity_id: params.id,
        }),
      });
      const data = await response.json();

      console.log(data);

      setActivity(data.activity[0]);
      setActivityBelongsToCurrentUser(data.isActivityFromCurrentUser);
    }

    fetchActivityData();
  }, [params.id]);

  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{activity.name}</h1>
      <p>Actividad</p>

        {activityBelongsToCurrentUser ? (
          <p>Epa chamo esta actividad es tuya</p>
        ) : (
          <p>Hey! Esto no es tuyo</p>
        )}

    </div>
  );
}
