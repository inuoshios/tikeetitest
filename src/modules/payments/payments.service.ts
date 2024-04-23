import Payment from "../../entities/payment.entity";
import Ticket, { TicketStatus } from "../../entities/ticket.entity";
import { BadRequestException, NotFoundException } from "../../utils/custom-exceptions";
import { randomGenerator } from "../../utils/random-generator";
import { ProcessPayment } from "./payments.validation";

export default class PaymentService {
  // process payment
  async processPayment(payload: ProcessPayment) {
    const ticket = await Ticket.findOneBy({ id: payload.ticketId });
    if (!ticket) {
      throw new NotFoundException("Ticket does not exists");
    }

    // if ticket is expired, throw an error
    if (ticket.status === 2) {
      throw new BadRequestException("Ticket has expired, please purchase a new one");
    }

    // check if user already paid, if they already did, raise an exception
    const checkIfUserAlreadyPaid = await Ticket.findOne({
      where: { id: payload.ticketId }, select: ['id']
    });
    if (checkIfUserAlreadyPaid) {
      throw new BadRequestException("You've already paid for this ticket");
    }

    // if no error, record payment
    const payment = await Payment.create({
      amount: payload.amount,
      ticketId: payload.ticketId,
      uniquePaymentReference: randomGenerator("alphanumeric", 40)
    }).save();

    await Ticket.update({ id: payload.ticketId }, { status: TicketStatus.Completed });

    return payment;
  }

  // confirm a payment via its referenceNumber
  async confirmPayment(reference: string) {
    const payment = await Payment.findOne({
      where: { uniquePaymentReference: reference }
    });
    if (!payment) {
      throw new NotFoundException("Invalid reference number");
    }

    return payment;
  }
}