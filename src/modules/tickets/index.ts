import { Router } from "express";
import { validationSchema } from "../../middlewares/request-validation";
import TicketController from "./tickets.controller";
import { bookTicketSchema, checkTicketStatusSchema } from "./tickets.validation";

const router = Router();
const handler = new TicketController();

router.post("/ticket/create-ticket", validationSchema(bookTicketSchema), handler.bookTicket);
router.post("/ticket/view-tickets", handler.bookTicket);
router.post(
  "/ticket/create-ticket",
  validationSchema(checkTicketStatusSchema),
  handler.checkTicketStatus
);

export default router;