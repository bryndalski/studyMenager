import { Body, Controller, Post } from '@nestjs/common';

import { LoginLocalUserDTO } from 'src/common';
import {
    SuccessLoginLocal,
    ErrorLoginLocal,
} from '../common/docsSchemas/login.local.dto';
import { SwaggerPost } from '../../../common/decorators/swagger/SwaggerPost.decorator';
import { LoginService } from './login.service';
const API_TAG = 'login';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post('local')
    @SwaggerPost({
        description: 'Login local user',
        apiTag: API_TAG,
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
    })
    async loginLocalUser(@Body() loginUserBody: LoginLocalUserDTO) {
        return await this.loginService.loginLocalUser(loginUserBody);
    }
}
