import { mockRequest, mockResponse } from "../__mocks__";
import TicketController from "../modules/tickets/tickets.controller";

const handler = new TicketController();
describe("tiketti create booking", () => {
  it("should book a ticket and check for the response code", async () => {
    mockRequest.body = {
      email: "john@email.com",
      fullName: "john doe",
      uniqueIdentifier: "xAdvgh098i",
      expiresAt: "2024-04-21T04:40:00Z"
    };

    await handler.bookTicket(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });
});