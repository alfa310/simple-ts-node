import { InputBook, BookDocument, ServiceContext } from "../entities";
import {
  withLoggerFor1Arg,
  withLoggerFor2Args,
  withContextFor1Arg,
  withContextFor0Args,
} from "../common/generics";

async function createBookService(
  context: ServiceContext,
  book: InputBook
): Promise<BookDocument> {
  const { bookPort } = context.ports;
  const createdBook = await bookPort.create(book);
  return createdBook;
}

async function getAllBooksService(
  context: ServiceContext
): Promise<Array<BookDocument>> {
  const { bookPort } = context.ports;
  const books = await bookPort.getAll();
  return books;
}

export interface BookServiceInterface {
  createBook: (book: InputBook) => Promise<BookDocument>;
  getAllBooks: () => Promise<Array<BookDocument>>;
}

function initServices(context: ServiceContext): BookServiceInterface {
  const layer = "BookService";
  const { logger } = context;
  return {
    createBook: withContextFor1Arg(
      withLoggerFor2Args(logger, layer, createBookService),
      context
    ),
    getAllBooks: withContextFor0Args(
      withLoggerFor1Arg(logger, layer, getAllBooksService),
      context
    ),
  };
}

export default { initServices };
