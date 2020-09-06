import { Request, Response } from "express";
import { Database } from "../database";
import { RootLogger } from "loglevel";
import { PortContext, ServiceContext } from "../entities";

export function withContextFor0Args<T>(
  fn: (context: ServiceContext) => Promise<T>,
  context: ServiceContext
): () => Promise<T> {
  return async function _wrappedFn() {
    const result = await fn(context);
    return result;
  };
}

export function withContextFor1Arg<T, K>(
  fn: (context: ServiceContext, arg0: T) => Promise<K>,
  context: ServiceContext
): (arg0: T) => Promise<K> {
  return async function _wrappedFn(arg0: T) {
    const result = await fn(context, arg0);
    return result;
  };
}

export function withContextFor2Args<T, K, L>(
  fn: (context: ServiceContext, arg0: T, arg1: K) => Promise<L>,
  context: ServiceContext
): (arg0: T, arg1: K) => Promise<L> {
  return async function _wrappedFn(arg0: T, arg1: K) {
    const result = await fn(context, arg0, arg1);
    return result;
  };
}

export function withDatabaseFor0Args<T>(
  fn: (database: Database) => Promise<T>,
  context: PortContext
): () => Promise<T> {
  const { database } = context;
  return async function _wrappedFn() {
    const result = await fn(database);
    return result;
  };
}

export function withDatabaseFor1Arg<T, K>(
  fn: (database: Database, args: T) => Promise<K>,
  context: PortContext
): (args: T) => Promise<K> {
  const { database } = context;
  return async function _wrappedFn(args: T) {
    const result = await fn(database, args);
    return result;
  };
}

export function withLoggerFor0Args<T>(
  logger: RootLogger,
  layer: string,
  fn: () => Promise<T>
): () => Promise<T> {
  return async function _wrappedFn() {
    try {
      logger.info(`[${layer}] - ${fn.name} start`);
      const result = await fn();
      logger.info(`[${layer}] - ${fn.name} end`);
      return result;
    } catch (error) {
      logger.error(`[${layer}] - ${fn.name} error`);
      throw error;
    }
  };
}
export function withLoggerFor1Arg<T, K>(
  logger: RootLogger,
  layer: string,
  fn: (args: T) => Promise<K>
): (args: T) => Promise<K> {
  return async function _wrappedFn(arg: T) {
    try {
      logger.info(`[${layer}] - ${fn.name} start`);
      const result = await fn(arg);
      logger.info(`[${layer}] - ${fn.name} end`);
      return result;
    } catch (error) {
      logger.error(`[${layer}] - ${fn.name} error`);
      throw error;
    }
  };
}

export function withLoggerFor2Args<T, K, L>(
  logger: RootLogger,
  layer: string,
  fn: (arg0: T, arg1: K) => Promise<L>
): (arg0: T, arg1: K) => Promise<L> {
  return async function _wrappedFn(arg0: T, arg1: K) {
    try {
      logger.info(`[${layer}] - ${fn.name} start`);
      const result = await fn(arg0, arg1);
      logger.info(`[${layer}] - ${fn.name} end`);
      return result;
    } catch (error) {
      logger.error(`[${layer}] - ${fn.name} error`);
      throw error;
    }
  };
}

export function withValidInput<T, K>(
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
