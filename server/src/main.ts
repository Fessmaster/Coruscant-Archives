import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './common/utils/swagger.utils';
import { GlobalExceptionFilter } from './common/filters/exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  
  app.use(cookieParser())  
  
  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
