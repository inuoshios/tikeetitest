import { z } from "zod";

export const processPaymentSchema = z.object({
  amount: z.number({
    required_error: "Amount is required",
    invalid_type_error: "Invalid amount. Try again"
  }).gte(0, {
    message: "Invalid amount. Try again"
  }),
  ticketId: z.string({
    required_error: "Ticket ID is required",
    invalid_type_error: "Ticket ID is invalid"
  })
});

export type ProcessPayment = z.infer<typeof processPaymentSchema>;