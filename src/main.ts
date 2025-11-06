import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe()); // para pegar as validacoes (tipo MinLenght() da senha)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
