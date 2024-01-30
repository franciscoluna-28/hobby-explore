export type ExistingActivityCategories =
  | "Gaming"
  | "Education"
  | "Chess"
  | "Social"
  | "Cooking"
  | "Music"
  | "Busywork"
  | "Coding"
  | "Recreational"
  | "3D - Modelling"
  | "Drawing";

export const ACTIVITIES_CATEGORIES: Record<ExistingActivityCategories, number> =
  {
    Gaming: 1,
    Education: 2,
    Chess: 3,
    Social: 4,
    Cooking: 5,
    Music: 6,
    Busywork: 7,
    Coding: 8,
    Recreational: 9,
    "3D - Modelling": 10,
    Drawing: 11,
  };
