import { Module } from '@nestjs/common';
import { CreateUserController } from './create-user.controller';

@Module({
  controllers: [CreateUserController]
})
export class CreateUserModule {}
