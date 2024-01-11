import {
  Body,
  Query,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateChatResponse } from './interfaces/chat.interface';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  public async create(
    @Query('sessionId') sessionId: string,
    @Body() body: CreateChatDto,
  ): Promise<CreateChatResponse> {
    const result = await this.chatsService.create(sessionId, body.message);
    if (!result) {
      throw new InternalServerErrorException('NotCreatedData');
    }

    return result;
  }
}
