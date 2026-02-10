import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'node:path';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envOrigins =
    process.env.CORS_ORIGINS?.split(',')
      .map((origin) => origin.trim())
      .filter(Boolean) ?? [];

  const localhostPattern = /^http:\/\/localhost:\d+$/;
  const localhostIpPattern = /^http:\/\/127\.0\.0\.1:\d+$/;

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      const isEnvAllowed = envOrigins.includes(origin);
      const isLocalAllowed =
        localhostPattern.test(origin) || localhostIpPattern.test(origin);

      if (isEnvAllowed || isLocalAllowed) {
        callback(null, true);
        return;
      }

      callback(new Error('CORS blocked'), false);
    },
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
    credentials: true,
    optionsSuccessStatus: 204,
  });

  app.setGlobalPrefix('api');
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
