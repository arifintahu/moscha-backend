import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session, Template } from '../entity';
import { Repository } from 'typeorm';
import * as Tokenizer from 'wink-tokenizer';
import { CreateChatResponse } from './interfaces/chat.interface';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,

    @InjectRepository(Template)
    private templatesRepository: Repository<Template>,
  ) {}

  public async create(
    sessionId: string,
    message: string,
  ): Promise<CreateChatResponse> {
    if (!sessionId || !message) {
      throw new NotFoundException('NotFoundParams');
    }
    const session = await this.sessionsRepository.findOneBy({
      id: sessionId,
    });
    if (!session) {
      throw new NotFoundException('NotFoundSessionData');
    }

    const tokenizer = new Tokenizer();
    const tokens = tokenizer.tokenize(message);
    console.log(tokens);

    const templates = await this.templatesRepository.find();
    let template: Template | null = null;

    for (const token of tokens) {
      template = templates.find(
        (item) => token.tag === 'word' && token.value.includes(item.keyword),
      );
      if (template) {
        break;
      }
    }

    if (!template)
      [(template = templates.find((item) => item.keyword === 'default'))];

    return {
      id: template.id,
      message: template.text,
      action: template.action,
    };
  }
}
