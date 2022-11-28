import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../../common/database/user.entity'
import { CreateUserController } from './create-user.controller'
import { CreateUserService } from './create-user.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.BUNNY_CONNECT],
                    queue: process.env.AUTH_QUEUE,
                    queueOptions: {
                        durable: true,
                    },
                },
            },
        ]),
    ],
    providers: [CreateUserService],
    controllers: [CreateUserController],
})
export class CreateUserModule {}
