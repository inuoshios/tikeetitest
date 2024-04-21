import { z } from "zod";

export const bookTicketSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a valid email address"
  }).email({
    message: "Please use a valid email address"
  }),
  fullName: z.string({
    required_error: "Full name is required",
    invalid_type_error: "Full name should be a valid name"
  }),
});

export const checkTicketStatusSchema = z.object({
  uniqueIdentifier: z.string({
    required_error: "A unique identifier is required",
    invalid_type_error: "Please input a correct unique identifier"
  })
});

export type BookTicket = z.infer<typeof bookTicketSchema>;