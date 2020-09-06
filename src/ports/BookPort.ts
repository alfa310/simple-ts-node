import { Database } from "../database";
import { PortContext, InputBook, BookDocument } from "../entities";
import {
  withLoggerFor1Arg,
  withLoggerFor2Args,
  withDatabaseFor0Args,
  withDatabaseFor1Arg,
} from "../common/generics";

async function createPort(
  database: Database,
  book: InputBook
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
  create: (book: InputBook) => Promise<BookDocument>;
  getAll: () => Promise<Array<BookDocument>>;
}

function initPorts(context: PortContext): BookPortInterface {
  const layer = "BookPort";
  const { logger } = context;
  return {
    create: withDatabaseFor1Arg(
      withLoggerFor2Args(logger, layer, createPort),
      context
    ),
    getAll: withDatabaseFor0Args(
      withLoggerFor1Arg(logger, layer, getAllPort),
      context
    ),
  };
}

export default { initPorts };
