import z from "zod";

// Schema to validate activities in the client side
const activitySchema = z.object({
  name: z
    .string()
    .min(10, {
      message: "Activity name must be at least 10 characters.",
    })
    .max(65, {
      message: "Activity name should be at most 65 characters.",
    }),
  participants: z.coerce
    .number()
    .min(1, {
      message: "You need at least one participant in this activity!",
    })
    .max(100, {
      message: "A maximum of 100 participants is allowed.",
    }),
  accessibility: z.coerce.number().min(0, {}).max(1),
  cost: z.coerce.number().min(0, {}).max(1),
  category: z.string().min(1, {
    message: "Please select a valid type.",
  }),
  location: z.string().min(1),
});

export { activitySchema };
