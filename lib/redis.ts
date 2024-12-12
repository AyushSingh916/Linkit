import Redis from 'ioredis';

// Initialize Redis client with better configuration
const client = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 5,
  connectTimeout: 10000,
  retryStrategy: (times) => {
    if (times >= 5) {
      return null; // Stop retrying after 5 attempts
    }
    return Math.min(times * 100, 3000); // Exponential backoff
  },
});

// Log Redis errors
client.on("error", (error) => {
  console.error("Redis connection error:", error);
});

export default client;
