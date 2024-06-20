import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prismaservice';

@Module({
  imports:[],
  providers: [BookService, BookResolver,PrismaService]
})
export class BookModule {}
