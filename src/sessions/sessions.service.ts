import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chain, Session } from '../entity';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { CreateSessionObj } from './interfaces/session.interface';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,

    @InjectRepository(Chain)
    private chainsRepository: Repository<Chain>,
  ) {}

  public async create(session: Partial<CreateSessionObj>): Promise<Session> {
    const chain = await this.chainsRepository.findOneBy({
      id: session.chainId,
    });
    if (!chain) {
      throw new NotFoundException('NotFoundChainData');
    }

    return this.sessionsRepository.save({
      address: session.address,
      chain: chain,
      expiredAt: dayjs().add(1, 'hour').format(),
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
