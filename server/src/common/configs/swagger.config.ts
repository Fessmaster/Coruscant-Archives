import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Coruscant Archives')
    .setDescription('This is an encyclopedia of the Star Wars world')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('sw')
    .build();
}
