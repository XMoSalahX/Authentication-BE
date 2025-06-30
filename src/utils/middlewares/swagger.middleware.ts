import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as basicAuth from 'basic-auth';

@Injectable()
export class SwaggerAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const credentials = basicAuth(req);
    // If no credentials are provided or they are incorrect
    if (
      !credentials ||
      credentials.name !== process.env.SWAGGER_USER ||
      credentials.pass !== process.env.SWAGGER_PASSWORD
    ) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Swagger UI"');
      res.status(401).send('Unauthorized access to Swagger UI');
      return;
    }

    next(); // Allow access if credentials are valid
  }
}
