import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import {
  BadRequestException,
  StandardSchemaValidationPipe,
} from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(
    new StandardSchemaValidationPipe({
      exceptionFactory: (issues) => {
        return new BadRequestException({
          message: 'An error occured!',
          error: issues.map((i) => `${i.message}`).join(', '),
        });
      },
    }),
  );
   const config = new DocumentBuilder()
    .setTitle('Inventory Management System')
    .setDescription('Inventory Management System for Widya Inovasi Indonesia')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);
  
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
