import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chain, Session } from '../entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Chain])],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
