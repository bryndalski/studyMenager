import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDTO } from '../../../common/DTO/user/registerUser.dto';
import { CreateUserService } from './create-user.service';
import { SwaggerPost } from '../../../common/decorators/swagger/SwaggerPost.decorator';
import { ConflictRegisterLocal } from 'src/common/docsSchemas/register.local.dto';
@ApiTags('create-user')
@Controller('create-user')
export class CreateUserController {
    constructor(private readonly createUserService: CreateUserService) {}

    @Post('local')
    @SwaggerPost({
        summary: 'Register global user',
        description: 'Register local user',
        createdResponse: {
            description:
                'User created without any problems -  returns code 201',
        },
        conflict: {
            description: 'User already exists',
            schema: ConflictRegisterLocal,
        },
    })
    async createLocalUser(@Body() user: RegisterUserDTO) {
        return await this.createUserService.createLocalUser(user);
    }
}
