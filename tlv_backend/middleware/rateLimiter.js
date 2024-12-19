import rateLimit from 'express-rate-limit';
import { RateLimitError } from '../middleware/errorHandler.js';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    next(new RateLimitError());
  }
});