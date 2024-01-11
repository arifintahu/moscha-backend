import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Action, ActionField, Session, Template } from '../entity';
import { Repository } from 'typeorm';
import * as Tokenizer from 'wink-tokenizer';
import { CreateChatResponse } from './interfaces/chat.interface';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Action)
    private actionsRepository: Repository<Action>,

    @InjectRepository(ActionField)
    private actionFieldsRepository: Repository<ActionField>,

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

    // tokenize
    const tokenizer = new Tokenizer();
    const tokens = tokenizer.tokenize(message);
    console.log(tokens);

    // get template
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

    // get action
    let action: Action | null = null;
    let actionFields: ActionField[] = [];
    if (template.actionId) {
      action = await this.actionsRepository.findOneBy({
        id: template.actionId,
      });
    }

    if (action) {
      actionFields = await this.actionFieldsRepository.findBy({
        actionId: action.id,
      });
    }

    return {
      id: template.id,
      message: template.text,
      action: template.action,
    };
  }
}
