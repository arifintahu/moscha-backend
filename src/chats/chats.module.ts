import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Action, ActionField, Session, Template } from '../entity';

@Module({
  imports: [TypeOrmModule.forFeature([Action, ActionField, Session, Template])],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
