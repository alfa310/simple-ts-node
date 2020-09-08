import express, { Router, Request, Response } from "express";

import { logFor2 } from "../common/actions";
import { ServiceContext } from "../entities";

function getMathRouter(context: ServiceContext): Router {
  const router = express.Router();
  const { logger } = context;
  const layer = "MathRouter";
  router.get("/add", logFor2(logger, layer, add));
  router.get("/subtract", logFor2(logger, layer, subtract));
  return router;
}
// all the controller and utility functions here:
async function add(req: Request, res: Response) {
  const sum = Number(req.query.a) + Number(req.query.c);
  res.send(sum.toString());
}

async function subtract(req: Request, res: Response) {
  const difference = Number(req.query.a) - Number(req.query.b);
  res.send(difference.toString());
}

export { getMathRouter };
