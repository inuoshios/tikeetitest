import Payment from "../../entities/payment.entity";
import Ticket from "../../entities/ticket.entity";
import { BadRequestException, NotFoundException } from "../../utils/custom-exceptions";
import { randomGenerator } from "../../utils/random-generator";
import { ProcessPayment } from "./payments.validation";

export default class PaymentService {
  async processPayment(payload: ProcessPayment) {
    const ticket = await Ticket.findOneBy({ id: payload.ticketId });
    if (!ticket) {
      throw new NotFoundException("Ticket does not exists");
    }

    if (ticket.status === 2) {
      // await Ticket.update({ id: payload.ticketId }, { status: 2 });
      throw new BadRequestException("Ticket has expired, please purchase a new one");
    }

    const payment = await Payment.create({
      amount: payload.amount,
      ticketId: payload.ticketId,
      uniquePaymentReference: randomGenerator("alphanumeric", 40)
    }).save();

    return payment;
  }

  async confirmPayment(reference: string) {
    const payment = await Payment.findOne({
      where: { uniquePaymentReference: reference }
    });
    if (!payment) {
      throw new NotFoundException("Payment does not exist");
    }

    return payment;
  }
}