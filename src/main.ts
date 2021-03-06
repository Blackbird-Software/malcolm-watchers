import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {Logger} from '@nestjs/common';
import {AppModule} from './app.module';
import config from 'config';
import {NestExpressApplication} from '@nestjs/platform-express';

async function bootstrap() {
    const serverConfig = config.server;
    const logger = new Logger('bootstrap');
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    if (process.env.NODE_ENV === 'development') {
        app.enableCors();
    } else {
        app.enableCors({origin: serverConfig.origin});
        logger.log(`Accepting requests from origin "${serverConfig.origin}"`);
    }

    const options = new DocumentBuilder()
        .setTitle('Malcolm watchers')
        .setDescription('Watchers endpoints')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

    app.enableShutdownHooks();

    const port = process.env.PORT || serverConfig.port;
    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
}

bootstrap();
