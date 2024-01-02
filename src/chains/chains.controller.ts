import { Controller, Get } from '@nestjs/common';
import { ChainsService } from './chains.service';
import { Chain } from '../entity';

@Controller('chains')
export class ChainsController {
  constructor(private readonly chainsService: ChainsService) {}

  @Get()
  public async getChains(): Promise<{ chains: Chain[] }> {
    const result = await this.chainsService.getChains();

    return { chains: result };
  }
}
