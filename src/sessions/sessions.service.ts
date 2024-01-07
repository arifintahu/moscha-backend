import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chain, Session } from '../entity';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,

    @InjectRepository(Chain)
    private chainsRepository: Repository<Chain>,
  ) {}

  public async create(session: Partial<Session>): Promise<Session> {
    if (!session.address || !session.chainId) {
      throw new NotFoundException('NotFoundParams');
    }

    const chain = await this.chainsRepository.findOneBy({
      id: session.chainId,
    });
    if (!chain) {
      throw new NotFoundException('NotFoundChainData');
    }

    return this.sessionsRepository.save({
      address: session.address,
      chainId: session.chainId,
      expiredAt: dayjs().add(1, 'hour').format(),
    });
  }

  public async getValidSession(id: string): Promise<Session | null> {
    const session = await this.sessionsRepository.findOneBy({
      id,
    });

    if (!session) {
      return null;
    }

    if (dayjs().isAfter(session.expiredAt)) {
      return null;
    }

    return session;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
