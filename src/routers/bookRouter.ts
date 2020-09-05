import express, { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import Joi from "joi";
import { BookService } from "../services";
import { BookDocument, BookProps } from "../database/types";
import { ServiceContext, AsyncFunction } from "../common/types";

function getBookRouter(context: ServiceContext): Router {
  const router = express.Router();
  const jsonParser = bodyParser.json();
  router.post(
    "/",
    jsonParser,
    withValidInput(withContext(createBook, context))
  );
  router.get("/", withContext(getAllBooks, context));
  return router;
}

export interface InputBook {
  title: string;
  content: string;
}

interface Book {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

function parseBook(book: BookDocument): Book {
  return {
    id: book._id,
    title: book.title,
    content: book.content,
    createdAt: book.createdAt.toUTCString(),
    updatedAt: book.updatedAt.toUTCString(),
  };
}

function withValidInput(fn: AsyncFunction): AsyncFunction {
  return async function wrappedFn(req: Request, res: Response) {
    try {
      await validateInputBook(req.body);
    } catch (error) {
      res.status(400);
      return res.json({ error });
    }
    const result = await fn(req, res);
    return result;
  };
}

function withContext(
  fn: AsyncFunction,
  context: ServiceContext
): AsyncFunction {
  return async function wrappedFn(req: Request, res: Response) {
    const result = await fn(context, req, res);
    return result;
  };
}

async function validateInputBook(inputBook: InputBook): Promise<void> {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });
  await schema.validateAsync(inputBook);
}

async function createBook(
  context: ServiceContext,
  req: Request,
  res: Response
) {
  const service = BookService.initServices(context);
  const book = await service.createBook(req.body);
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
