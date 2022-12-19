import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  loginLocalUser(): string {
    return 'Hello World!';
  }
}
