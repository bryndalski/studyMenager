import { Controller, Get } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("sayHello")
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: "hello" })
  getxo(): string {
    return this.appService.getHello();
  }
}
