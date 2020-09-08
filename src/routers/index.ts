import express, { Router } from "express";
import { getMathRouter } from "./mathRouter";
import { getBookRouter } from "./bookRouter";
import { ServiceContext } from "../entities";

function getRouters(context: ServiceContext): Router {
  const router = express.Router();
  router.use("/math", getMathRouter(context));
  router.use("/book", getBookRouter(context));
  return router;
}

export { getRouters };
