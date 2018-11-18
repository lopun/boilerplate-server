export const redisOptions = {
  host: "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  retry_strategy: options => {
    // reconnect after
    return Math.max(options.attempt * 100, 3000);
  }
};
