import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SwaggerPost } from '../../common/decorators/swagger/SwaggerPost.decorator';
import { ApiNotFoundResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
}
