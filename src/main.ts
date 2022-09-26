import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './api/app.module';
import { RATELIMITER_GUARD_TOKEN } from 'nest-ratelimiter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  const config = new DocumentBuilder()
    .setTitle('Outvio Auth test')
    .setDescription('The Auths API call')
    .setVersion('1.0')
    .addTag('private')
    .addTag('auth')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
  .build();
  
  app.useGlobalGuards(app.get(RATELIMITER_GUARD_TOKEN));

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs/swagger', app, document);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
