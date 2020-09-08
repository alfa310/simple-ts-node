import { InputBook, BookDocument, ServiceContext } from "../entities";
import { logFor1, logFor2 } from "../common/actions";
import { attachFor0, attachFor1 } from "../common/attachers";

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
    createBook: attachFor1(context, logFor2(logger, layer, createBookService)),
    getAllBooks: attachFor0(
      context,
      logFor1(logger, layer, getAllBooksService)
    ),
  };
}

export default { initServices };
