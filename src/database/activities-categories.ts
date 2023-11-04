type ActivityType =
| "All"
  | "Gaming"
  | "Education"
  | "Chess"
  | "Social"
  | "Cooking"
  | "Music"
  | "Busywork"
  | "Coding"
  | "Recreational";

type ActivityCategory = {
  category_id: number;
  name: ActivityType;
};

export const ACTIVITY_CATEGORIES: ActivityCategory[] = [
{
    category_id: 0,
    name: "All"
},

    {
    category_id: 1,
    name: "Gaming",
  },
  {
    category_id: 2,
    name: "Education",
  },
  {
    category_id: 3,
    name: "Chess",
  },
  {
    category_id: 4,
    name: "Social",
  },
  {
    category_id: 5,
    name: "Cooking",
  },
  {
    category_id: 6,
    name: "Music",
  },
  {
    category_id: 7,
    name: "Coding",
  },
  {
    category_id: 8,
    name: "Recreational",
  },
];
