import { redisClient } from './index.js';
import logger from '../services/logger.service.js';

export class CacheService {
  static async get(key) {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error(`Cache get error: ${error.message}`);
      return null;
    }
  }

  static async set(key, value, expiration) {
    try {
      await redisClient.setEx(key, expiration, JSON.stringify(value));
      return true;
    } catch (error) {
      logger.error(`Cache set error: ${error.message}`);
      return false;
    }
  }
}