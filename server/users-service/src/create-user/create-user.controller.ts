import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RegisterUserDTO } from '../../../common/DTO/user/registerUser.dto'
import { CreateUserService } from './create-user.service'
import { SwaggerPost } from '../../../common/decorators/swagger/SwaggerPost.decorator'
@ApiTags('create-user')
@Controller('create-user')
export class CreateUserController {
    constructor(private readonly createUserService: CreateUserService) {}

    @Post('local')
    @SwaggerPost({
        // summary: 'Register global user',
        description: 'Register local user',
        // success: 'User succesfully created',
        conflict: 'User already exists',
        apiTag: '',
    })
    async createLocalUser(@Body() user: RegisterUserDTO) {
        return await this.createUserService.createLocalUser(user)
    }
}
