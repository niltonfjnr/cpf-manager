import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerService } from './swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerService.handle(app);
  await app.listen(3000);
}
bootstrap();
