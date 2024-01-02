import { Session } from '../../entity';

export interface CreateSessionObj extends Session {
  chainId: string;
}
