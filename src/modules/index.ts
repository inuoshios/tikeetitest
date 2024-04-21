import { Router } from "express";
import paymentRoute from "./payments";
import ticketRoute from "./tickets";

const router = Router();

router.use(ticketRoute);
router.use(paymentRoute);

export default router;