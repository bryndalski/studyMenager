import { Body, Controller, Post } from '@nestjs/common';
import { LoginLocalUserDTO } from 'src/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post('local')
    async loginLocalUser(@Body() loginUserBody: LoginLocalUserDTO) {
        return await this.loginService.loginLocalUser(loginUserBody);
    }
}
