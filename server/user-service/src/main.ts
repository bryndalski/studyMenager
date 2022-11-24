import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const configService = new ConfigService();
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('BUNNY_CONNECT')],
      queue: `${configService.get('AUTH_QUEUE')}`,
      queueOptions: { durable: false },
      prefetchCount: 1,
    },
  });
  await app.startAllMicroservices();
  app.setGlobalPrefix(configService.get('USER_SERVICE_PREFIX'));
  await app.listen(configService.get('USER_SERVICE_PORT'));
  logger.log(
    `🚀 User service running on port ${configService.get('USER_SERVICE_PORT')}`,
  );
}
void bootstrap();
