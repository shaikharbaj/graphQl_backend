import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prismaservice';
import { Book } from '@prisma/client';
import { AddBookArgs } from './args/addbook.args';
import { UpdateBookArgs } from './args/updatebook.args';
@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}
  public async currentTime() {}
  async findAllBooks(): Promise<Book[]> {
    const books = await this.prisma.book.findMany({});
    return books;
  }

  async findBookById(id: number): Promise<Book> {
    const book = await this.prisma.book.findFirst({
      where: {
        id: +id,
      },
    });
    return book;
  }

  async deletebook(id: number): Promise<Book> {
    const book = await this.prisma.book.delete({
      where: {
        id: +id,
      },
    });
    return book;
  }

  async addbook(addbooksArgs: AddBookArgs) {
    const newbook = await this.prisma.book.create({
      data: {
        title: addbooksArgs.title,
        price: addbooksArgs.price,
      },
    });

    return newbook;
  }

  async updatebook(updatebooksArgs: UpdateBookArgs) {
    const book = await this.prisma.book.findUnique({
      where: {
        id: +updatebooksArgs.id,
      },
    });
    const newbook = await this.prisma.book.update({
      data: {
        title: updatebooksArgs.title,
        price: updatebooksArgs.price,
      },
      where: {
        id: book.id,
      },
    });

    return newbook;
  }
}
