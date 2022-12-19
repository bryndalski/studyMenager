import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
@Injectable()
export class EventsControllerService {
  private logger: Logger;

  constructor(private configService: ConfigService) {
    this.logger = new Logger(EventsControllerService.name);
  }
  /**
   * Generates bcrypt random password hash
   * @param password
   * @returns
   */

  public async generatePasswordHash(password: string) {
    try {
      const salt = await bcrypt.genSalt();
      return await bcrypt.hash(password, salt);
    } catch (error) {
      this.logger.error({
        method: 'generatePasswordHash',
        error,
      });
      throw new InternalServerErrorException();
    }
  }
}
