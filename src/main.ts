import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiToken = process.env.API_TOKEN;

  app.use((req, res, next) => {
    if (!apiToken) {
      res.status(500).json({ message: 'API_TOKEN is not set' });
      return;
    }

    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Missing or invalid Authorization header' });
      return;
    }

    const token = header.slice('Bearer '.length).trim();
    if (token !== apiToken) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    next();
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
