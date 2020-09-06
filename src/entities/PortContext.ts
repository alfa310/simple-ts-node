import { GenericContext } from "../config/loggers";
import { Database } from "../database";

export interface PortContext extends GenericContext {
  database: Database;
}
