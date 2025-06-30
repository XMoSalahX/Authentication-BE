import { Injectable, Inject } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(@Inject('REDIS') private readonly redisClient: Redis.Redis) {}

  async setCache(key: string, value: string, ttl: number) {
    return await this.redisClient.set(key, value, 'EX', ttl);
  }

  async setMultipleCache(records: Record<string, string>, ttl: number) {
    // Prepare arguments for MSET
    const multiArgs = Object.entries(records).flatMap(([key, value]) => [
      key,
      value,
    ]);

    // Use MSET to set multiple key-value pairs
    await this.redisClient.mset(...multiArgs);

    // Set expiration for each key using a pipeline
    const pipeline = this.redisClient.pipeline();
    Object.keys(records).forEach((key) => {
      pipeline.expire(key, ttl); // Set expiration for each key
    });

    // Execute the pipeline for setting expiration
    await pipeline.exec();
  }

  async getCache(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async deleteCache(key: string) {
    await this.redisClient.del(key);
  }
}
