import { RootLogger } from "loglevel";
import { Database } from "../../database";

export interface PortContext {
  logger: RootLogger;
  database: Database;
}
