import { GenericContext } from "../config/loggers";
import { Ports } from "../ports";

export interface ServiceContext extends GenericContext {
  ports: Ports;
}
