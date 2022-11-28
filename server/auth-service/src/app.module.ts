import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EventsControllerModule } from './events-controller/events-controller.module'

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), EventsControllerModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
