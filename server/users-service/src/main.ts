import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const configService = new ConfigService();
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useLogger(new Logger('auth-service'));
  app.setGlobalPrefix(configService.get('USER_SERVICE_PREFIX'));
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('BUNNY_CONNECT')],
      queue: `${configService.get('USER_QUEUE')}`,
      queueOptions: { durable: false },
      prefetchCount: 1,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      whitelist: true,
    })
  );
  //swagger
  const config = new DocumentBuilder()
    .setTitle('User-service ')
    .setDescription('User service documentation')
    .setVersion('1.0')
    .addTag('user-service')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.startAllMicroservices();
  await app.listen(configService.get('USER_SERVICE_PORT'));
  logger.log(
    `🚀 User service running on port ${configService.get('USER_SERVICE_PORT')}`
  );
}
void bootstrap();
