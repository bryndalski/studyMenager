import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      // host: process.env.HOST, //
      port: process.env.PORT,
    },
  })
  // const config = new DocumentBuilder()
  //   .setTitle('Taskify')
  //   .setDescription('Taskify main server documentation')
  //   .setVersion('1.0')
  //   .build()
  // const document = SwaggerModule.createDocument(app, config)
  // SwaggerModule.setup('docs', app, document)
  await app.listen()
}
bootstrap()
