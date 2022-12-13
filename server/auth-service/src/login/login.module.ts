import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../../common/database/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokensEntity } from '../../../common/database/refreshToken.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, RefreshTokensEntity]),
        JwtModule,
    ],
    controllers: [LoginController],
    providers: [LoginService],
})
export class LoginModule {}
