"use client"

import { useState } from "react";

export default function CreateActivity() {
  const [name, setName] = useState("");
  const [participants, setParticipants] = useState("");
  const [accessibility, setAccessibility] = useState("");
  const [price, setPrice] = useState("");
  const [tipText, setTipText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [activityId, setActivityId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Estado para almacenar el ID de la actividad creada
  const handleSubmitActivity = async (e) => {
    e.preventDefault();

    // Datos de la actividad a crear
    const activityData = {
      name,
      accessibility: parseInt(accessibility),
      participants: parseInt(participants),
      price: parseInt(price),
    };

    // Datos del tip a crear
    const tipData = {
      text: tipText,
      image_url: imageUrl,
    };

    try {
      const response = await fetch("create-activity/api/activities", {
        method: "POST",
        body: JSON.stringify({ activityData, tipData }), // Send both activity and tip data
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Obtiene el ID de la actividad creada desde la respuesta
          const newActivityId = data.activity_id;
          setActivityId(newActivityId); // Almacena el ID en el estado
          // Limpia los campos del formulario después de la inserción exitosa
          setName("");
          setParticipants("");
          setAccessibility("");
          setPrice("");
          setTipText("");
          setImageUrl("");
          // Muestra el mensaje de éxito
          setSuccessMessage("Activity and tip created successfully!");
        } else {
          console.error("Error al crear actividad:", data.error);
        }
      } else {
        console.error("Error al crear actividad:", response.status);
      }
    } catch (error) {
      console.error("Error al crear actividad:", error);
    }
  };

  return (
    <div>
      <h1>Create Activity</h1>
      <form onSubmit={handleSubmitActivity}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Accessibility:
            <input
              type="text"
              value={accessibility}
              onChange={(e) => setAccessibility(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Participants:
            <input
              type="number"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Tip Text:
            <input
              type="text"
              value={tipText}
              onChange={(e) => setTipText(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Image URL:
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add Activity</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}
