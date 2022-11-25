import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateUserModule } from "./create-user/create-user.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOSTNAME,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    CreateUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
