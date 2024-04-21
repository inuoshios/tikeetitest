
import { mockRequest, mockResponse } from "../__mocks__";
import PaymentController from "../modules/payments/payments.controller";

jest.mock("../modules/payments/payments.service");

const handler = new PaymentController();

describe("payment portal", () => {
  // clear mocks
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should move ticket to completed", async () => {
    mockRequest.body = {
      amount: 30000,
      tickedId: "xxxx-xxxx-xxxx"
    };

    await handler.processPayment(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });

  it("should help confirm payment", async () => {
    mockRequest.query = { reference: "xxxx-xxxxx-xxxx" };

    await handler.confirmPayment(mockRequest, mockResponse);
  });
});