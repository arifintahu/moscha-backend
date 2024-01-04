import {
  Body,
  Query,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  public async create(
    @Query('sessionId') sessionId: string,
    @Body() body: CreateChatDto,
  ): Promise<{ message: string; action: Object }> {
    const result = await this.chatsService.create(sessionId, body.message);
    if (!result.id) {
      throw new InternalServerErrorException('NotCreatedData');
    }

    return { message: result.id, action: {} };
  }
}
