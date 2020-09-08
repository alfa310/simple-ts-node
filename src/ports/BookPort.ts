import { Database } from "../database";
import { PortContext, InputBook, BookDocument } from "../entities";
import { logFor1, logFor2 } from "../common/actions";
import { attachFor0, attachFor1 } from "../common/attachers";

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
  const { logger, database } = context;
  return {
    getAll: attachFor0(database, logFor1(logger, layer, getAllPort)),
    create: attachFor1(database, logFor2(logger, layer, createPort)),
  };
}

export default { initPorts };
