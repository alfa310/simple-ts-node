import express from "express";
import { Server } from "http";
import "express-async-errors";
import { getInitialConfiguration } from "./config";

async function startServer(): Promise<Server | undefined> {
  const initialConfiguration = await getInitialConfiguration();
  if (!initialConfiguration) return;
  const {
    port,
    routers,
    mainLogger,
    defaultLogger,
    errorLogger,
  } = initialConfiguration;

  const app = express();
  app.use("/api", routers);
  app.use(defaultLogger);
  app.use(errorLogger);
  app.get("/health", (_, res) => res.send({ status: "OK" }));
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      mainLogger.info(`Listening on port ${port}`);
    });
    resolve(server);
  });
}

export { startServer };
