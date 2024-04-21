import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { CustomException } from "../utils/custom-exceptions";

// express custom error handler
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    const zodErrors = err.errors.map((zodIssue) => ({
      message: zodIssue.message
    }));
    console.error("zod validation error", zodErrors);
    return res.status(400).json({
      message: "Validation Error", details: zodErrors
    });
  }

  if (err instanceof CustomException) {
    console.error("an error occurred", { reason: err.message });
    return res.status(err.code).json({
      message: err.message
    });
  }

  console.error("an exception occurred", {
    reason: err.message
  });
  return res.status(500).json({
    message: "An error occurred, please try again"
  });
}