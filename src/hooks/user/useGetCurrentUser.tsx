import { getCurrentUser } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export function useGetCurrentUser() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const response = await getCurrentUser();
        if (!response) {
          throw new Error("Error fetching user");
        }

        return response;
      } catch (error) {
        throw new Error("Error fetching current user.");
      }
    },
  });

  return {
    data,
    isLoading,
    isError,
  };
}
