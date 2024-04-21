import { Request, Response } from "express";
import PaymentService from "./payments.service";

export default class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  async processPayment(req: Request, res: Response) {
    const result = await this.paymentService.processPayment(req.body);
    res.status(201).json(result);
  }

  async confirmPayment(req: Request, res: Response) {
    const result = await this.paymentService.confirmPayment(req.query.reference as string);
    res.status(201).json(result);
  }
}