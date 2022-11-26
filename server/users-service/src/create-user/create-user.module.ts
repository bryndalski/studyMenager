import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../../common/database/user.entity'
import { CreateUserController } from './create-user.controller'
import { CreateUserService } from './create-user.service'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [CreateUserService],
    controllers: [CreateUserController],
})
export class CreateUserModule {}
