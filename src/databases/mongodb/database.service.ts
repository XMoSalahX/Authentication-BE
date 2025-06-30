import { Injectable, OnApplicationShutdown, OnModuleDestroy } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleDestroy, OnApplicationShutdown {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  connect(): Connection {
    return this.connection;
  }

  async onModuleDestroy() {
    console.log('Closing MongoDB connection...');
    await this.connection.close();
  }

  async onApplicationShutdown(signal?: string) {
    console.log(`Application shutting down: ${signal}. Closing MongoDB connection...`);
    await this.connection.close();
  }
}
