import Ticket from "../../entities/ticket.entity";
import { randomGenerator } from "../../utils/random-generator";
import { BookTicket } from "./tickets.interface";

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

      return ticket;
    } catch (err) {
      throw err;
    }
  }
}