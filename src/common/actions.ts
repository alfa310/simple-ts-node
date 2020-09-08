import { Request, Response } from "express";
import { RootLogger } from "loglevel";

import { actionFor0, actionFor1, actionFor2, actionFor3 } from "./attachers";

export function logFor0<T>(
  logger: RootLogger,
  layer: string,
  fn: () => Promise<T>
): () => Promise<T> {
  return actionFor0(
    () => logger.info(`[${layer}] - ${fn.name} start`),
    () => logger.info(`[${layer}] - ${fn.name} end`),
    () => logger.error(`[${layer}] - ${fn.name} error`),
    fn
  );
}

export function logFor1<T, K>(
  logger: RootLogger,
  layer: string,
  fn: (arg1: T) => Promise<K>
): (arg1: T) => Promise<K> {
  return actionFor1(
    () => logger.info(`[${layer}] - ${fn.name} start`),
    () => logger.info(`[${layer}] - ${fn.name} end`),
    () => logger.error(`[${layer}] - ${fn.name} error`),
    fn
  );
}

export function logFor2<T, K, L>(
  logger: RootLogger,
  layer: string,
  fn: (arg1: T, arg2: L) => Promise<K>
): (arg1: T, arg2: L) => Promise<K> {
  return actionFor2(
    () => logger.info(`[${layer}] - ${fn.name} start`),
    () => logger.info(`[${layer}] - ${fn.name} end`),
    () => logger.error(`[${layer}] - ${fn.name} error`),
    fn
  );
}

export function logFor3<T, K, L, M>(
  logger: RootLogger,
  layer: string,
  fn: (arg1: T, arg2: L, arg3: M) => Promise<K>
): (arg1: T, arg2: L, arg3: M) => Promise<K> {
  return actionFor3(
    () => logger.info(`[${layer}] - ${fn.name} start`),
    () => logger.info(`[${layer}] - ${fn.name} end`),
    () => logger.error(`[${layer}] - ${fn.name} error`),
    fn
  );
}

export function validateInput<T, K>(
  fn: (req: Request, res: Response) => Promise<K>,
  validateFn: (arg0: T) => Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): (req: Request, res: Response) => Promise<Response<any> | K> {
  return async function wrappedFn(req: Request, res: Response) {
    try {
      await validateFn(req.body);
    } catch (error) {
      res.status(400);
      return res.json({ error });
    }
    const result = await fn(req, res);
    return result;
  };
}
