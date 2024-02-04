 import { getUserByUserId } from "@/services/auth";

export default async function UserProfilePage({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  const user = await getUserByUserId(params.userId);

  console.log(user);

  // TODO: CREATE DYNAMIC PAGE TO HANDLE BOTH THE CURRENT USER LAYOUT AND ANOTHER USER PAGE.
  // The current user is able to edit its profile and see their settings. However, when you visit other profiles
  // You must be able only to see their profile information
  return (<div>{user?.email}</div>);
}
