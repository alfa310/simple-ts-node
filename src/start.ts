import express from "express";
import { Server } from "http";
import "express-async-errors";
import logger from "loglevel";
import { getRouters } from "./routers";
import { getDatabase } from "./database";
import { getPorts } from "./ports";
import {
  getEnvironment,
  getMissingEnvironmentVariables,
} from "./config/environment";
import { getLogger, getErrorLogger } from "./config/loggers";

async function startServer(): Promise<Server | undefined> {
  const env = getEnvironment();
  if (env === null) {
    logger.error(
      `Missing enviroment variables:${getMissingEnvironmentVariables()}`
    );
    return;
  }
  const { port, databaseURI } = env;

  const { models: database } = await getDatabase(databaseURI);
  const ports = getPorts({ database, logger });
  const app = express();
  app.use("/api", getRouters({ ports, logger }));
  app.use(getLogger());
  app.use(getErrorLogger());
  app.get("/health", (_, res) => res.send({ status: "OK" }));
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      logger.info(`Listening on port ${port}`);
    });
    resolve(server);
  });
}

export { startServer };
