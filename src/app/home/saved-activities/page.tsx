"use client"

import { useEffect, useState } from "react";

export default function SavedActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserActivities() {
      try {
        const response = await fetch("saved-activities/api/created-activities"); // Reemplaza con la URL correcta de tu API route
        if (!response.ok) {
            console.log(error)
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
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Hi, these are your saved activities</h1>
      <ul>
        {activities.map((activity: any) => (
          <li> {activity.name}</li>
        ))}
      </ul>
    </div>
  );
}
