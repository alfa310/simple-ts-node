import express from "express";

function getMathRouter() {
  const router = express.Router();
  router.get("/add", add);
  router.get("/subtract", subtract);
  return router;
}
// all the controller and utility functions here:
async function add(req: { query: { a: any; c: any; }; }, res: { send: (arg0: string) => void; }) {
  const sum = Number(req.query.a) + Number(req.query.c);
  res.send(sum.toString());
}

async function subtract(req: { query: { a: any; b: any; }; }, res: { send: (arg0: string) => void; }) {
  const difference = Number(req.query.a) - Number(req.query.b);
  res.send(difference.toString());
}

export { getMathRouter };
