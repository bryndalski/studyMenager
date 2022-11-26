import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { RegisterUserDTO } from '../../../common/DTO/user/registerUser.dto'
import { CreateUserService } from './create-user.service'

@ApiTags('create-user')
@Controller('create-user')
export class CreateUserController {
    constructor(private readonly createUserService: CreateUserService) {}

    @Post('local')
    @ApiOperation({
        summary: 'Register global user',
        description: 'Register local user',
    })
    async createLocalUser(@Body() user: RegisterUserDTO) {
        return await this.createUserService.createLocalUser(user)
    }
}
