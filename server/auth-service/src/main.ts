import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@kroliczek:5672'],
        queue: 'auth',
        queueOptions: {
          durable: true,
        },
      },
    },
  )
  console.log('====================================')
  console.log('auth słucha')
  console.log('====================================')
  await app.listen()
}
bootstrap()
