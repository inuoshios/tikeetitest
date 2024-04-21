import { In } from "typeorm";
import Ticket from "../../entities/ticket.entity";
import { BadRequestException, NotFoundException } from "../../utils/custom-exceptions";
import { randomGenerator } from "../../utils/random-generator";
import { BookTicket } from "./tickets.validation";

export default class TicketService {
  async bookTicket(payload: BookTicket) {
    // set expiration minutes
    const expirationMin = 15;
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + expirationMin);
    expirationTime.setSeconds(0, 0);

    const ticket = await Ticket.create({
      email: payload.email.toLowerCase(),
      fullName: payload.fullName,
      uniqueIdentifier: randomGenerator("alphanumeric", 10),
      expiresAt: expirationTime
    }).save();

    return ticket;
  };

  async viewAllTickets(email: string) {
    const tickets = await Ticket.find({
      where: { email, status: In([0, 1]) }
    });

    if (!tickets.length) {
      return { message: "You have no tickets" };
    }

    return tickets;
  }

  async checkTicketStatus(uniqueIdentifier: string) {
    const ticket = await Ticket.findOne({
      where: { uniqueIdentifier: uniqueIdentifier }
    });
    if (!ticket) {
      throw new NotFoundException("Please enter a valid unique identifier");
    }

    if (ticket.status === 2) {
      throw new BadRequestException("Ticket has expired, please purchase a new one");
    }

    return ticket;
  }
}