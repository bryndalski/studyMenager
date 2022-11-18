import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getHello(): string {
    console.log('ahj');
    return this.appService.getHello();
  }
  getxo(): string {
    return this.appService.getHello();
  }
}
