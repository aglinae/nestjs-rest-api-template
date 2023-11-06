import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter, {
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
      P2003: HttpStatus.BAD_REQUEST,
      P2023: HttpStatus.BAD_REQUEST,
    }),
  );
  app.useGlobalPipes(new ParseIntPipe());
  const shutdownHook = async () => {
    const prisma: PrismaService = app.get(PrismaService);
    await prisma.$disconnect;
    await app.close();
  };
  process.on('exit', shutdownHook);
  process.on('beforeExit', shutdownHook);
  process.on('SIGINT', shutdownHook);
  process.on('SIGTERM', shutdownHook);
  process.on('SIGUSR2', shutdownHook);
  await app.listen(3000);
}
bootstrap();
