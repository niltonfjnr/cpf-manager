import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerService {
  static handle(app) {
    const config = new DocumentBuilder()
      .setTitle('API [Documentation]')
      .setVersion('1.0')
      .addTag('person')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
