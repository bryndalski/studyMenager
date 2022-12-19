import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsControllerModule } from './events-controller/events-controller.module';
import { PasswordsEntity } from '../../common/database/password.entity';
import { LoginModule } from './login/login.module';
import { AccountDetails } from '../../common/database/accountDetails.entity';
import { RefreshTokensEntity } from '../../common/database/refreshToken.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOSTNAME,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [PasswordsEntity, AccountDetails, RefreshTokensEntity],
    }),

    EventsControllerModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
