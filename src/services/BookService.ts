import { withLogger } from "../config/loggers";
import { ServiceContext, AsyncFunction } from "../common/types";
import { BookProps, BookDocument } from "../database/types";
import { InputBook } from "../routers/bookRouter";

async function createBookService(
  context: ServiceContext,
  book: BookProps
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

function withContext(
  fn: AsyncFunction,
  context: ServiceContext
): AsyncFunction {
  return async function _wrappedFn(...args: Array<any>) {
    const result = await fn(context, ...args);
    return result;
  };
}

export interface BookServiceInterface {
  createBook: (book: InputBook) => Promise<BookDocument>;
  getAllBooks: () => Promise<Array<BookDocument>>;
}

function initServices(context: ServiceContext): BookServiceInterface {
  const layer = "BookService";
  const { logger } = context;
  return {
    createBook: withContext(
      withLogger(logger, layer, createBookService),
      context
    ),

    getAllBooks: withContext(
      withLogger(logger, layer, getAllBooksService),
      context
    ),
  };
}

export default { initServices };
