import express, { Router, Request, Response } from "express";

function getMathRouter(): Router {
  const router = express.Router();
  router.get("/add", add);
  router.get("/subtract", subtract);
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
