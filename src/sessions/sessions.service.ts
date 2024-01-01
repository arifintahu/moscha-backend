import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '../entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}

  public async create(session: Partial<Session>): Promise<Session> {
    return this.sessionsRepository.save(session);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
