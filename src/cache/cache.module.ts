import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CacheController],
  providers: [
    CacheService,
    {
      provide: 'REDIS',
      useFactory: (configService: ConfigService) => {
        return new Redis({
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          username: configService.get<string>('REDIS_USERNAME'),
          password: configService.get<string>('REDIS_PASSWORD'),
          // tls: {}, // if ssl supported. currently not used for this task but it very important to protect your data from sniffing or man-in-the-middle attacks
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS', CacheService],
})
export class CacheModule {}
