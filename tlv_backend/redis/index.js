import { createClient } from "redis";
import { DEFAULT_EXPIRATION } from "../data/configs/constant.js";
import { CacheService } from "./CacheService.js";
import logger from "../services/logger.service.js";

const redisClient = createClient();

async function getOrSetCache(key, cb) {
  const cache = await CacheService.get(key);
  if (cache != null) {
    logger.info("Cached found for key:", key);
    return JSON.parse(cache);
  }

  const value = await cb();

  if (value != null) {
    await CacheService.set(key, JSON.stringify(value), DEFAULT_EXPIRATION);
  }

  return value;
}

const configureRedis = () => {
  redisClient.on("error", (err) => console.error("Redis Client Error", err));
  redisClient
    .connect()
    .then(() => console.log("Redis Client Connected"))
    .catch((err) => console.error("Redis Client Connection Error", err));
};

export { redisClient, getOrSetCache, configureRedis };
