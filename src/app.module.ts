import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './databases/mongodb/database.module';
import { LoggerMiddleware } from './utils/middlewares/logger.middleware';
import { CorsMiddleware } from './utils/middlewares/originResponseHeaders.middleware';
import { CacheModule } from './cache/cache.module';
import { APP_GUARD } from '@nestjs/core';
import { HeaderValidationGuard } from './utils/guard/header-validation.guard';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailerModule } from './mailer/mailer.module';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import Redis from 'ioredis';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    CacheModule,
    AuthModule,
    UsersModule,
    MailerModule,
    RateLimiterModule.register({
      type: 'Redis',
      points: 10,
      duration: 60,
      keyPrefix: 'global_limit',
      storeClient: new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'documentation'),
      serveRoot: '/docs',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: HeaderValidationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
