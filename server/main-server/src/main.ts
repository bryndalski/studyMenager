import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Transport } from '@nestjs/microservices'

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        options: {
            port: 3001,
        },
    })
    await app.listen()
}
void bootstrap()
