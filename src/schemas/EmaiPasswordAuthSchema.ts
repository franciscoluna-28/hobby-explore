export const MINIMUM_SUPABASE_PASSWORD_LENGTH: number = 6;
export const MAXIMUM_SUPABASE_PASSWORD_LENGTH: number = 24;

import { z } from "zod";

export const EmailPasswordAuthSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(MINIMUM_SUPABASE_PASSWORD_LENGTH, {
      message: `Your password must have at least ${MINIMUM_SUPABASE_PASSWORD_LENGTH} characters`,
    })
    .max(MAXIMUM_SUPABASE_PASSWORD_LENGTH, {
      message: `Your password must have at most ${MAXIMUM_SUPABASE_PASSWORD_LENGTH}`,
    }),
});
