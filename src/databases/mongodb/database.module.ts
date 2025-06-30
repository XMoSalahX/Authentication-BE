import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        minPoolSize: 5,
        maxPoolSize: 200,
        serverSelectionTimeoutMS: 45000,
        socketTimeoutMS: 45000,
        connectionFactory: (connection) => {
          connection.plugin(require('mongoose-autopopulate'));
          connection.plugin(require('mongoose-paginate-v2'));

          connection.on('error', (err) => console.error('MongoDB Error:', err));
          connection.on('disconnected', () =>
            console.warn('MongoDB Disconnected!'),
          );
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
})
export class DatabaseModule {}
