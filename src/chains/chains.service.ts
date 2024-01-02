import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chain } from '../entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChainsService {
  constructor(
    @InjectRepository(Chain)
    private chainsRepository: Repository<Chain>,
  ) {}

  public async getChains(): Promise<Chain[]> {
    return this.chainsRepository.find();
  }
}
