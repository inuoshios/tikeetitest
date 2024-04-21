import Ticket from "../../entities/ticket.entity";
import { BadRequestException, NotFoundException } from "../../utils/custom-exceptions";
import { ProcessPayment } from "./payments.validation";

export default class Payment {
  async processPayment(payload: ProcessPayment) {
    try {
      const ticket = await Ticket.findOneBy({ id: payload.ticketId });
      if (!ticket) {
        throw new NotFoundException("Ticket does not exists");
      }

      if (ticket.isExpired) {
        await Ticket.update({ id: payload.ticketId }, { status: 2 });
        throw new BadRequestException("Ticket has already expired, please purchase a new one");
      }


    } catch (err) {
      throw err;
    }
  }
}