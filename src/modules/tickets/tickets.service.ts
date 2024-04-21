import Ticket from "../../entities/ticket.entity";
import { NotFoundException } from "../../utils/custom-exceptions";
import { randomGenerator } from "../../utils/random-generator";
import { BookTicket } from "./tickets.validation";

export default class TicketService {
  async bookTicket(payload: BookTicket) {
    try {
      const ticket = await Ticket.create({
        email: payload.email.toLowerCase(),
        fullName: payload.fullName,
        uniqueIdentifier: randomGenerator("alphanumeric", 10)
      }).save();

      return ticket;
    } catch (err) {
      throw err;
    }
  };

  async viewAllTickets(email: string) {
    try {
      const tickets = await Ticket.find({
        where: { email }
      });

      return tickets;
    } catch (err) {
      throw err;
    }
  }

  async checkTicketStatus(uniqueIdentifier: string) {
    try {
      const ticket = await Ticket.findOne({
        where: { uniqueIdentifier: uniqueIdentifier }
      });
      if (!ticket) {
        throw new NotFoundException("Ticket does not exists, or is expired");
      }

      return ticket;
    } catch (err) {
      throw err;
    }
  }
}