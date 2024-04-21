import { z } from "zod";

export const processPaymentSchema = z.object({
  amount: z.number({
    required_error: "Amount is required",
    invalid_type_error: "Invalid amount. Try again"
  }).int({
    message: "Invalid number format"
  }).gte(0, {
    message: "Invalid amount. Try again"
  }),
  ticketId: z.string({
    required_error: "Ticket ID is required",
    invalid_type_error: "Ticket ID is invalid"
  })
});

export const confirmPaymentSchema = z.object({
  reference: z.string({
    required_error: "Please input a reference number",
    invalid_type_error: "Please input a valid reference number"
  })
});

export type ProcessPayment = z.infer<typeof processPaymentSchema>;