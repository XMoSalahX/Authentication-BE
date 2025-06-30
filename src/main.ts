import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { AppOptions } from './utils/winston.helper';
import { RejectEmptyValuesPipe } from './utils/pipes/rejectEmptyValues.pipe';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { SwaggerAuthMiddleware } from './utils/middlewares/swagger.middleware';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    AppOptions,
  );
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Set security-related HTTP headers
  app.use(helmet());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", 'https:'],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", 'https:'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    }),
  );

  // Api versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const allowedOrigins: string[] = [];

  process.env.NODE_ENV === 'development' &&
    allowedOrigins.push(
      'https://localhost:3443',
      'http://localhost:3000',
      'http://localhost',
    );

  app.enableCors({
    origin: (origin, callback) => {
      // Check if the origin is in the allowedOrigins list or if it's undefined (same-origin request)
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error('Not allowed by CORS'), false); // Reject the request
      }
    },
    credentials: true, // Allow credentials (cookies)
    exposedHeaders: ['csrf-token'],
  });

  app.useGlobalPipes(
    new RejectEmptyValuesPipe(),
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // swagger config
  const options = new DocumentBuilder()
    .setTitle('Easy Generator Task')
    .setDescription('Authentication API for Easy Generator Task')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', name: 'app', in: 'header' }, 'app')
    .addApiKey({ type: 'apiKey', name: 'version', in: 'header' }, 'version')
    .addApiKey({ type: 'apiKey', name: 'os', in: 'header' }, 'os')
    .addCookieAuth('access_token')
    .addCookieAuth('refresh_token')
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  };

  const document = SwaggerModule.createDocument(app, options);

  // Apply middleware for Swagger route
  app.use(`/${process.env.SWAGGER_ROUTE}`, new SwaggerAuthMiddleware().use);
  app.use(`/${process.env.APP_DOCS}`, new SwaggerAuthMiddleware().use);

  SwaggerModule.setup(
    process.env.SWAGGER_ROUTE ?? 'api',
    app,
    document,
    customOptions,
  );

  await app.listen(process.env.SERVER_PORT ?? 3000);

  logger.log('Application is listening on port ' + process.env.SERVER_PORT);
}
bootstrap();
