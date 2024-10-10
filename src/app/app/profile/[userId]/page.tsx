import UserProfilePage from "@/components/profile/pages/UserProfilePage";
import { getUserByUserId } from "@/services/auth";
export default async function Page({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  const user = await getUserByUserId(params.userId);

  return <UserProfilePage user={user} />;
}
