import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  public async create(@Body() body: CreateSessionDto): Promise<{ id: string }> {
    const result = await this.sessionsService.create(body);
    if (!result.id) {
      throw new InternalServerErrorException('NotCreatedData');
    }

    return { id: result.id };
  }

  @Get()
  getHello(): string {
    return this.sessionsService.getHello();
  }
}
