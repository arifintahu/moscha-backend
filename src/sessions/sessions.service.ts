import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionsService {
  create(session: any) {}

  getHello(): string {
    return 'Hello World!';
  }
}
