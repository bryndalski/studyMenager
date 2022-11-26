import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

async function bootstrap() {
    const configService = new ConfigService()
    const logger = new Logger()
    const app = await NestFactory.create(AppModule)
    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [configService.get('BUNNY_CONNECT')],
            queue: `${configService.get('auth-queue')}`,
            queueOptions: { durable: false },
            prefetchCount: 1,
        },
    })
    await app.startAllMicroservices()
    app.setGlobalPrefix(configService.get('AUTH_SERVICE_PREFIX'))
    await app.listen(configService.get('PORT'))
    logger.log(
        `🚀 Auth service running on port ${configService.get(
            'AUTH_SERVICE_PORT'
        )}`
    )
}
void bootstrap()
