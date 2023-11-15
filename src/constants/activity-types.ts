export type ActivityType =
  | "Gaming"
  | "Education"
  | "Chess"
  | "Social"
  | "Cooking"
  | "Music"
  | "Busywork"
  | "Coding"
  | "Recreational"
  | "3D - Modelling";

export const AVAILABLE_ACTIVITY_TYPES: { id: number; name: string }[] = [
  { id: 1, name: "Gaming" },
  { id: 2, name: "Education" },
  { id: 3, name: "Chess" },
  { id: 4, name: "Social" },
  { id: 5, name: "Cooking" },
  { id: 6, name: "Music" },
  { id: 7, name: "Busywork" },
  { id: 8, name: "Coding" },
  { id: 9, name: "Recreational" },
  { id: 10, name: "3D - Modelling" },
];
