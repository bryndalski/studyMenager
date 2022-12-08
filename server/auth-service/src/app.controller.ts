import { Controller, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { SwaggerPost } from '../../common/decorators/swagger/SwaggerPost.decorator'

const API_TAG = 'login'
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post('login-local')
    @SwaggerPost({
        description: 'login local user',
        apiTag: 'login',
    })
    async loginLocalUser(): Promise<string> {
        return this.appService.loginLocalUser()
    }
}
