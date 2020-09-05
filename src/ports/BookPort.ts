import { AsyncFunction } from "../common/types";
import { withLogger } from "../config/loggers";
import { Database } from "../database";
import { BookProps, BookDocument } from "../database/types";
import { PortContext } from "./types";

function withDatabase(fn: AsyncFunction, context: PortContext): AsyncFunction {
  const { database } = context;
  return async function _wrappedFn(...args: Array<unknown>) {
    const result = await fn(database, ...args);
    return result;
  };
}

async function createPort(
  database: Database,
  book: BookProps
): Promise<BookDocument> {
  const { Book } = database;
  const newBook = new Book(book);
  const savedBook = await newBook.save();
  return savedBook;
}

async function getAllPort(database: Database): Promise<Array<BookDocument>> {
  const { Book } = database;
  const books = await Book.find().exec();
  return books;
}

export interface BookPortInterface {
  create: (book: BookProps) => Promise<BookDocument>;
  getAll: () => Promise<Array<BookDocument>>;
}

function initPorts(context: PortContext): BookPortInterface {
  const layer = "BookPort";
  const { logger } = context;

  return {
    create: withDatabase(withLogger(logger, layer, createPort), context),
    getAll: withDatabase(withLogger(logger, layer, getAllPort), context),
  };
}

export default { initPorts };
