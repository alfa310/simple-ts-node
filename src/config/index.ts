import { Router, Handler, ErrorRequestHandler } from "express";
import mainLogger, { RootLogger } from "loglevel";
import { getRouters } from "../routers";
import { getDatabase } from "../database";
import { getPorts } from "../ports";
import { getEnvironment, getMissingEnvironmentVariables } from "./environment";
import { getLogger, getErrorLogger } from "./loggers";

export interface Configuration {
  port: string;
  routers: Router;
  mainLogger: RootLogger;
  defaultLogger: Handler;
  errorLogger: ErrorRequestHandler;
}

export async function getInitialConfiguration(): Promise<
  Configuration | undefined
> {
  const environment = getEnvironment();
  if (environment === null) {
    mainLogger.error(
      `Missing enviroment variables:${getMissingEnvironmentVariables()}`
    );
    return;
  }
  const { port, databaseURI } = environment;
  const { models: database } = await getDatabase(databaseURI);
  const ports = getPorts({ database, logger: mainLogger });
  const routers = getRouters({ ports, logger: mainLogger });
  const defaultLogger = getLogger();
  const errorLogger = getErrorLogger();
  const initialConfiguration = {
    port,
    ports,
    routers,
    mainLogger,
    defaultLogger,
    errorLogger,
  };
  return initialConfiguration;
}
