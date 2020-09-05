import express, { Router } from "express";
import { getMathRouter } from "./mathRouter";
import { ServiceContext } from "../common/types";
import { getBookRouter } from "./bookRouter";

function getRouters(context: ServiceContext): Router {
  const router = express.Router();
  router.use("/math", getMathRouter());
  router.use("/book", getBookRouter(context));
  return router;
}

export { getRouters };
