import { Module } from '@nestjs/common';
import { ChainsController } from './chains.controller';
import { ChainsService } from './chains.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chain } from '../entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chain])],
  controllers: [ChainsController],
  providers: [ChainsService],
})
export class ChainsModule {}
