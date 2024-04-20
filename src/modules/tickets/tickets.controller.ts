import TicketService from "./tickets.service";

export default class TicketController {
  private ticketService: TicketService;

  constructor() {
    this.ticketService = new TicketService();
  }


}