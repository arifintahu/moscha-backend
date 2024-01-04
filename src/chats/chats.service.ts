import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session, Template } from '../entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,

    @InjectRepository(Template)
    private templatesRepository: Repository<Template>,
  ) {}

  public async create(sessionId: string, message: string): Promise<Session> {
    const session = await this.sessionsRepository.findOneBy({
      id: sessionId,
    });
    if (!session) {
      throw new NotFoundException('NotFoundSessionData');
    }

    return session;
  }
}
