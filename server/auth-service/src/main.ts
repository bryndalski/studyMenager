import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
      queueOptions: { durable: true },
      prefetchCount: 1,
    },
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.startAllMicroservices();
  app.setGlobalPrefix(configService.get('AUTH_SERVICE_PREFIX'));
  const config = new DocumentBuilder()
    .setTitle('Auth-service ')
    .setDescription('Auth service documentation')
    .setVersion('1.0')
    .addTag('auth-service')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(configService.get('PORT'));
  logger.log(
    `🚀 Auth service running on port ${configService.get('AUTH_SERVICE_PORT')}`
  );
}
void bootstrap();
