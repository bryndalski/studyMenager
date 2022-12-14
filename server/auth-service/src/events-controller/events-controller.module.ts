import { Module } from '@nestjs/common';
import { EventsControllerService } from './events-controller.service';
import { EventsControllerController } from './events-controller.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.BUNNY_CONNECT],
                    queue: process.env.AUTH_QUEUE,
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
    ],
    providers: [EventsControllerService],
    controllers: [EventsControllerController],
})
export class EventsControllerModule {}
