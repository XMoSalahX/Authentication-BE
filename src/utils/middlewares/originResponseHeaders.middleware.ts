import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin ?? '*'; // Default to '*' if no origin is provided

    res.setHeader('Access-Control-Allow-Origin', origin);

    next();
  }
}
