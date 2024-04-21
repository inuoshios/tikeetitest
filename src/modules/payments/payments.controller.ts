import { Request, Response } from "express";
import PaymentService from "./payments.service";

export default class PaymentController {
  private paymentService = new PaymentService();

  processPayment = async (req: Request, res: Response) => {
    const result = await this.paymentService.processPayment(req.body);
    res.status(201).json(result);
  };

  confirmPayment = async (req: Request, res: Response) => {
    const result = await this.paymentService.confirmPayment(req.query.reference as string);
    res.status(200).json(result);
  };
}