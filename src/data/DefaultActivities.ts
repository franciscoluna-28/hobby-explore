import { ACTIVITIES_CATEGORIES } from "@/constants/activities/categories";
import { Database, Tables } from "@/lib/database";

/** What do you need to preview an activity?
 * - Activity id, category id, created at, name, saved status,
 * number of tipsNumber, user display name, first tip url (photo url),
 * user profile picture url, rating count, rating average */

// What do you think to use for the global state? - Zustand

type Activity = Tables<"activities">;

export type ActivityPreview = Pick<
  Activity,
  "activity_id" | "created_at" | "name" | "category_id"
> & {
  user: {
    profilePictureUrl: string;
    displayName: string;
  };
  firstTipImageUrl: string;
  ratingCount: number;
  ratingAverage: number;
  tipsNumber: number;
};

// Activities used to add interactivity to the landing page instead of using already existing pngs
export const DEFAULT_ACTIVITIES: ActivityPreview[] = [
  {
    activity_id: 1,
    name: "Learn how to compose Synthwave Music",
    created_at: "2024-03-28T14:42:50Z",
    category_id: 6,
    user: {
      profilePictureUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtzL7dNAFBOmNbWSjbpPUDFNdvXzVr02dbKA&usqp=CAU",
      displayName: "CraftyCreator",
    },
    firstTipImageUrl:
      "https://img.freepik.com/free-photo/supersport-car-cyberpunk-city-with-neon-lights-generative-ai_191095-1234.jpg",
    ratingCount: 15,
    ratingAverage: 4.5,
    tipsNumber: 2,
  },
  {
    activity_id: 2,
    name: "Prepare your own Meal at Home",
    created_at: "2024-03-28T14:42:50Z",
    category_id: 6,
    user: {
      profilePictureUrl:
     "https://assets-global.website-files.com/62bdc93e9cccfb43e155104c/654f68ae6cd324acebfc73e9_Dog%2520PFP%2520for%2520Tiktok%25201.png",
      displayName: "CraftyCreator",
    },
    firstTipImageUrl:
      "https://images.unsplash.com/photo-1522249210728-7cd95094022a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ratingCount: 15,
    ratingAverage: 4.5,
    tipsNumber: 2,
  },
];
