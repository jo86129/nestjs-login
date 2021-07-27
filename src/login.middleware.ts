import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const jwt = req.cookies['jwt']
    if(jwt){
      return next()
    }
    res.redirect('login')
  }
}
