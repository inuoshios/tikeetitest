import { Request, Response } from "express";
import TicketService from "./tickets.service";

export default class TicketController {
  private ticketService = new TicketService();

  bookTicket = async (req: Request, res: Response) => {
    const result = await this.ticketService.bookTicket(req.body);
    res.status(201).json(result);
  };

  viewAllTickets = async (req: Request, res: Response) => {
    const result = await this.ticketService.viewAllTickets(req.params.email);
    res.status(200).json(result);
  };

  checkTicketStatus = async (req: Request, res: Response) => {
    const result = await this.ticketService.checkTicketStatus(req.query.uniqueIdentifier as string);
    res.status(200).json(result);
  };
}