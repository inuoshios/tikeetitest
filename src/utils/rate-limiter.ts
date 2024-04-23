import { rateLimit } from "express-rate-limit";

// ratelimter
export const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 100,
  message: {
    message: "Too many request, please try again later"
  }
});