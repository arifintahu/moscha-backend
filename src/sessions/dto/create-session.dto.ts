import { IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  readonly address: string;

  @IsString()
  readonly chainId: string;
}
