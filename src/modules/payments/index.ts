import { Router } from "express";
import { validationSchemaBody, validationSchemaQuery } from "../../middlewares/request-validation";
import PaymentController from "./payments.controller";
import { confirmPaymentSchema, processPaymentSchema } from "./payments.validation";

const router = Router();
const handler = new PaymentController();

router.post(
  "/payment/gateway",
  validationSchemaBody(processPaymentSchema),
  handler.processPayment
);

router.get(
  "/payment",
  validationSchemaQuery(confirmPaymentSchema),
  handler.confirmPayment
);

export default router;