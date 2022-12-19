import { Body, Controller, Post, Version } from '@nestjs/common';

import { LoginLocalUserDTO } from '../../src/common';
import {
  SuccessLoginLocal,
  ErrorLoginLocal,
} from '../common/docsSchemas/login.local.dto';
import { SwaggerPost } from '../../../common/decorators/swagger/SwaggerPost.decorator';
import { LoginService } from './login.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('local')
  @SwaggerPost({
    summary: 'Login local user',
    notExists: {
      description: 'User does not exist',
      schema: ErrorLoginLocal,
    },
    okResponse: {
      description: 'User login access token',
      schema: SuccessLoginLocal,
    },
    forbidden: {
      description:
        'Users credentials are correct, but user is forbidden to log in',
      schema: ErrorLoginLocal,
    },
    serverError: {
      description: 'Internal server errror',
      schema: ErrorLoginLocal,
    },
    description: 'Login user local account via email and password',
  })
  @Version('1')
  async loginLocalUser(
    @Body() loginUserBody: LoginLocalUserDTO
  ): Promise<SuccessLoginLocal> {
    return await this.loginService.loginLocalUser(loginUserBody);
  }
}
