import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '../entity';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}

  public async create(session: Partial<Session>): Promise<Session> {
    return this.sessionsRepository.save({
      ...session,
      expiredAt: dayjs().add(1, 'hour').format(),
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
