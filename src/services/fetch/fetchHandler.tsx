/* import { PostgrestError } from "@supabase/supabase-js";

// Generic function to fetch and process data
export async function fetchData<T extends PostgrestError | null>(
  fetchFunction: () => Promise<T>,
  onSuccess: (data: Exclude<T, PostgrestError>) => void,
  onError: (error: PostgrestError) => void
) {
  const response = await fetchFunction();

  if (response === null) {
    return null;
  }

  if ("code" in response) {
    onError(response);
  } else {
    onSuccess(response as Exclude<T, PostgrestError>);
  }
}
 */