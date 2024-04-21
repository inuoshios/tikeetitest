import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function validationSchema(zodSchema: z.ZodObject<any, any>) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      zodSchema.parse(req.body);
      next();
    } catch (err) {
      throw err;
    }
  };
}