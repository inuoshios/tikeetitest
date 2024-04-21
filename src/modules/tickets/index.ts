import { Router } from "express";
import { validationSchemaBody, validationSchemaQuery } from "../../middlewares/request-validation";
import TicketController from "./tickets.controller";
import { bookTicketSchema, checkTicketStatusSchema } from "./tickets.validation";

const router = Router();
const handler = new TicketController();

// tickets routes
router.post(
  "/ticket/book-ticket",
  validationSchemaBody(bookTicketSchema),
  handler.bookTicket
);

router.get("/ticket/view-tickets", handler.bookTicket);

router.get(
  "/ticket/check-ticket-status",
  validationSchemaQuery(checkTicketStatusSchema),
  handler.checkTicketStatus
);

export default router;