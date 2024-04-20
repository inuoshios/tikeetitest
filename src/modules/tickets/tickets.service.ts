import Ticket from "../../entities/ticket.entity";
import { randomGenerator } from "../../utils/random-generator";
import { BookTicket } from "./tickets.interface";

export default class UserService {
  async bookTicket(payload: BookTicket) {
    const ticket = await Ticket.create({
      email: payload.email.toLowerCase(),
      fullName: payload.fullName,
      uniqueIdentifier: randomGenerator("alphanumeric", 10)
    }).save();

    return ticket;
  };

  async viewAllTickets(email: string) {
    const tickets = await Ticket.find({
      where: { email }
    });

    return tickets;
  }

  async getSingleTicket(uniqueIdentifier: string) {
    const ticket = await Ticket.findOne({
      where: { uniqueIdentifier: uniqueIdentifier }
    });

    return ticket;
  }
}