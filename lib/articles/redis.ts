import "server-only";

import { Redis } from "@upstash/redis/cloudflare";

let client: Redis | null = null;

export function storeConfigured() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

export function getRedis() {
  if (!storeConfigured()) {
    throw new Error("Upstash Redis belum dikonfigurasi.");
  }

  client ??= new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  return client;
}
