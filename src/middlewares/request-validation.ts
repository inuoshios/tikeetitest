import { NextFunction, Request, Response } from "express";
import { z } from "zod";

// custom zod middleware to validate request body
export function validationSchemaBody(zodSchema: z.ZodObject<any, any>) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      zodSchema.parse(req.body);
      next();
    } catch (err) {
      throw err;
    }
  };
}

// custom zod middleware to validate query parameters
export function validationSchemaQuery(zodSchema: z.ZodObject<any, any>) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      zodSchema.parse(req.query);
      next();
    } catch (err) {
      throw err;
    }
  };
}