import { NextFunction, Request, Response } from "express";
import { CustomException } from "../utils/custom-exceptions";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof CustomException) {
    console.log("an error occurred", { reason: err.message });
    return res.status(err.code).json({
      message: err.message
    });
  }

  console.log("an exception occurred", {
    reason: err.message, stack: err?.stack
  });
  return res.status(500).json({
    message: "An error occurred, please try again"
  });
}