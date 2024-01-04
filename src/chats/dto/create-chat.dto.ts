import { IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  readonly message: string;
}
