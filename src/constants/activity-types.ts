export type ActivityType =
  | "education"
  | "recreational"
  | "social"
  | "diy"
  | "charity"
  | "cooking"
  | "relaxation"
  | "music"
  | "busywork";

export const AVAILABLE_ACTIVITY_TYPES: Record<ActivityType, string> = {
  education: "Education",
  recreational: "Recreational",
  social: "Social",
  diy: "DIY",
  charity: "Charity",
  cooking: "Cooking",
  relaxation: "Relaxation",
  music: "Music",
  busywork: "Busywork",
};
