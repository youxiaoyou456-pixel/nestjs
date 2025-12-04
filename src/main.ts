import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import {DatabaseErrorFilter} from './filter/DatabaseErrorFilter'
import { HttpExceptionFilter } from './filter/http-exceptionhttp-exception';
import { TransformInterceptor } from './intercepter/TransformInterceptor';
import { AllExceptionsFilter } from 'src/filter/AllExceptionsFilter';
import { LoggerService } from 'src/logger/logger.service';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.useGlobalFilters(new DatabaseErrorFilter())
 app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  // const loggerService = app.get(LoggerService);
  // app.useGlobalInterceptors(new TransformInterceptor(LoggerService))
  //静态资源
  //app.useStaticAssets('public', { prefix: '/static' });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
