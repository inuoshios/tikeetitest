import { mockRequest, mockResponse } from "../__mocks__";
import TicketController from "../modules/tickets/tickets.controller";

// Mock the TicketService
jest.mock("../modules/tickets/tickets.service");

const handler = new TicketController();

describe("tiketti booking", () => {
  // clear mocks
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should book a ticket and check for the response code", async () => {
    // request body
    mockRequest.body = {
      email: "john@email.com",
      fullName: "john doe",
      uniqueIdentifier: "xAdvgh098i",
      expiresAt: "2024-04-21T04:40:00Z"
    };

    await handler.bookTicket(mockRequest, mockResponse);

    // expect the status code to be called with 201
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });

  it("should be able to view tickets", async () => {
    mockRequest.params = { email: "john@email.com" };

    await handler.viewAllTickets(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it("should check ticket status", async () => {
    mockRequest.query = { uniqueIdentifier: "xxxx-xxxx-xxx" };

    await handler.checkTicketStatus(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});
