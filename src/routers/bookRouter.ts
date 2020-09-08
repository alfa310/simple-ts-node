import express, { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import Joi from "joi";
import { BookService } from "../services";
import {
  BookDocument,
  InputBook,
  BookResponse,
  ServiceContext,
} from "../entities";
import { validateInput, logFor3 } from "../common/actions";
import { attachFor2 } from "../common/attachers";

function getBookRouter(context: ServiceContext): Router {
  const router = express.Router();
  const jsonParser = bodyParser.json();
  const layer = "BookRouter";
  const { logger } = context;
  router.post(
    "/",
    jsonParser,
    validateInput(
      attachFor2(context, logFor3(logger, layer, createBook)),
      validateInputBook
    )
  );
  router.get("/", attachFor2(context, logFor3(logger, layer, getAllBooks)));
  return router;
}

async function validateInputBook(inputBook: InputBook): Promise<void> {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });
  await schema.validateAsync(inputBook);
}

function parseBook(book: BookDocument): BookResponse {
  return {
    id: book._id,
    title: book.title,
    content: book.content,
    createdAt: book.createdAt.toUTCString(),
    updatedAt: book.updatedAt.toUTCString(),
  };
}

async function createBook(
  context: ServiceContext,
  req: Request,
  res: Response
) {
  const service = BookService.initServices(context);
  const inputBook: InputBook = req.body;
  const book = await service.createBook(inputBook);
  res.status(200);
  return res.json(parseBook(book));
}

async function getAllBooks(context: ServiceContext, _: Request, res: Response) {
  const service = BookService.initServices(context);
  const books = await service.getAllBooks();
  res.status(200);
  return res.json(books.map(parseBook));
}

export { getBookRouter };
