import { RootLogger } from "loglevel";
import { Ports } from "../ports";

export type Named = {
  name: string;
};
export type AsyncFunction = (...args: Array<any>) => Promise<any>;
export type AsyncNamedFunction = Named & AsyncFunction;

export interface ServiceContext {
  ports: Ports;
  logger: RootLogger;
}
