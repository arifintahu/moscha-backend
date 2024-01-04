import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { SessionsService } from '../../sessions';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private sessionsService: SessionsService) {}

  public async use(
    req: Request,
    res: Response,
    next: () => void,
  ): Promise<void> {
    const sessionId = req.query.sessionId as string;
    if (!sessionId) {
      throw new UnauthorizedException('sessionId is not found');
    }

    const session = await this.sessionsService.getValidSession(sessionId);
    if (!session) {
      throw new UnauthorizedException('sessionId is not valid');
    }

    next();
  }
}
