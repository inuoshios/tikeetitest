import { Router } from "express";
import { validationSchema } from "../../middlewares/request-validation";
import TicketController from "./tickets.controller";
import { bookTicketSchema, checkTicketStatusSchema } from "./tickets.validation";

const router = Router();
const handler = new TicketController();

router.post("/ticket/create-ticket", validationSchema(bookTicketSchema), handler.bookTicket);
router.get("/ticket/view-tickets", handler.bookTicket);
router.get(
  "/ticket/check-ticket-status",
  validationSchema(checkTicketStatusSchema),
  handler.checkTicketStatus
);

export default router;