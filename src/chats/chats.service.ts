import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Action,
  ActionField,
  Execution,
  ExecutionItem,
  Session,
  Template,
} from '../entity';
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

    @InjectRepository(Execution)
    private executionsRepository: Repository<Execution>,

    @InjectRepository(ExecutionItem)
    private executionItemsRepository: Repository<ExecutionItem>,

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

    const response: CreateChatResponse = {
      id: null,
      message: null,
      actionItems: [],
    };

    // get execution
    const executions = await this.executionsRepository.find({
      where: {
        sessionId: sessionId,
        isCompleted: false,
      },
      order: {
        id: 'DESC',
      },
      take: 1,
    });

    // tokenize
    const tokenizer = new Tokenizer();
    const tokens = tokenizer.tokenize(message);
    console.log(tokens);

    // check current execution
    const execution = executions.length ? executions[0] : null;
    if (execution) {
      const executionItems = await this.executionItemsRepository.find({
        where: {
          executionId: execution.id,
          value: '',
          actionField: {
            isPrompted: true,
          },
        },
        relations: {
          actionField: true,
        },
      });
      if (!executionItems.length) {
        response.message = 'Execution error';
      }
      if (!tokens.length) {
        response.message = 'Please input required address';
      }
      if (executionItems.length && tokens.length) {
        await this.executionItemsRepository.save({
          id: executionItems[0].id,
          value: tokens.map((item) => item.value).join(''),
        });
        await this.executionsRepository.save({
          id: execution.id,
          isCompleted: true,
        });
        const items = await this.executionItemsRepository.find({
          where: {
            executionId: execution.id,
          },
          relations: {
            actionField: true,
          },
        });
        const actionItems = items.map((item) => {
          return {
            field: item.actionField.field,
            value: item.value,
          };
        });
        response.message = 'Ready to execute';
        response.actionItems = actionItems;
      }
      return response;
    }

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

    response.message = template.text;

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

    if (action && actionFields.length) {
      const { message } = await this.executeAction(
        session,
        action,
        actionFields,
        tokens,
      );
      response.message = message;
    }

    return response;
  }

  async executeAction(
    session: Session,
    action: Action,
    actionFields: ActionField[],
    tokens: Tokenizer.Token[],
  ): Promise<{ message: string }> {
    switch (action.action) {
      case 'MsgTransfer':
        return await this.executeActionMsgTransfer(
          session,
          actionFields,
          tokens,
        );
      default:
        return { message: 'Unknown action' };
    }
  }

  async executeActionMsgTransfer(
    session: Session,
    actionFields: ActionField[],
    tokens: Tokenizer.Token[],
  ): Promise<{ message: string }> {
    // create execution
    const execution = await this.executionsRepository.save({
      sessionId: session.id,
    });

    // set from address
    const fieldFromAddress = actionFields.find(
      (item) => item.field === 'fromAddress',
    );
    if (fieldFromAddress) {
      await this.executionItemsRepository.save({
        executionId: execution.id,
        actionFieldId: fieldFromAddress.id,
        value: session.address,
      });
    }

    // set amount
    const fieldAmount = actionFields.find((item) => item.field === 'amount');
    const numberValue = tokens.find((item) => item.tag === 'number');
    if (fieldAmount) {
      await this.executionItemsRepository.save({
        executionId: execution.id,
        actionFieldId: fieldAmount.id,
        value: numberValue ? numberValue.value : '0',
      });
    }

    // set denom
    const fieldDenom = actionFields.find((item) => item.field === 'denom');
    if (fieldDenom) {
      await this.executionItemsRepository.save({
        executionId: execution.id,
        actionFieldId: fieldDenom.id,
        value: 'uatom',
      });
    }

    // set to address
    const fieldToAddress = actionFields.find(
      (item) => item.field === 'toAddress',
    );
    if (fieldToAddress) {
      await this.executionItemsRepository.save({
        executionId: execution.id,
        actionFieldId: fieldToAddress.id,
        value: '',
      });
    }

    return {
      message: 'Amount added, please enter recipient address',
    };
  }
}
