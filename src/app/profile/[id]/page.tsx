"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  // Add other properties as needed
}

export default function Profile({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const [activityBelongsToCurrentUser, setActivityBelongsToCurrentUser] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function fetchProfileData() {
      const response = await fetch(`/profile/api/get-user-by-id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: params.id,
        }),
      });
      const data = await response.json();

      console.log(data);

      setUser(data.user[0]);
      setActivityBelongsToCurrentUser(data.isCurrentUser);
    }

    fetchProfileData();
  }, [params.id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`/profile/api/update-name-last-name`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        last_name,
      }),
    });
    const data = await response.json();

    console.log(data);

    if (data.success) {
      router.refresh();
    } else {
      // Handle the error case if needed
    }
  };

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Actividad</p>
      {activityBelongsToCurrentUser ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Last name"
            value={last_name}
            onChange={(event) => setLastName(event.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Esto no es tuyo</p>
      )}
    </div>
  );
}
