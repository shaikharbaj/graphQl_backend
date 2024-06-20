import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { AddBookArgs } from './args/addbook.args';

@Resolver((of) => Book)
export class BookResolver {
  constructor(private readonly bookservice: BookService) {}

  @Query(() => [Book])
  async getAllBooks() {
    let data = await this.bookservice.findAllBooks();
    console.log(data);
    return data;
  }

  @Query(() => Book)
  async getBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
    return await this.bookservice.findBookById(id);
  }

  @Mutation(()=>Book)
  async addbook(@Args("addBookArgs") addBookArgs:AddBookArgs){
      console.log(addBookArgs);
      return await this.bookservice.addbook(addBookArgs)
  }
}
