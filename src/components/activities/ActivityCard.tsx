import { Tables } from "@/lib/database";

type User = Tables<"users">;
type ProcessedUser = Pick<
  User,
  "displayName" | "profile_picture_url" | "user_id" | "username"
>;
type Activity = Tables<"activities">;

type ActivityCardProps = {
  user: ProcessedUser;
  activity: Activity;
};

export function ActivityCard() {
    
}
