import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserModule } from './create-user/create-user.module';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from '../../common/database/user.entity';
import { AccountDetails } from '../../common/database/accountDetails.entity';
import { RefreshTokensEntity } from '../../common/database/refreshToken.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOSTNAME,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE_NAME,
            autoLoadEntities: true,
            synchronize: true,
            entities: [UserEntity, AccountDetails, RefreshTokensEntity],
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        CreateUserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
