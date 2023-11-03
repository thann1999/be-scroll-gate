import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter, ResponseInterceptor } from '@common';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { configSwagger } from './configs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(helmet());
  app.enableCors({
    origin:
      process.env.ENVIRONMENT === 'production' ? 'https://scrollgate.pro' : '*',
  });

  // Add prefix path
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health-check', method: RequestMethod.GET }],
  });

  configSwagger(app);

  await app.listen(3201);
}
bootstrap();
