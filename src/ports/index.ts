import BookPort, { BookPortInterface } from "./BookPort";
import { PortContext } from "../entities";

export interface Ports {
  bookPort: BookPortInterface;
}

function getPorts(context: PortContext): Ports {
  return {
    bookPort: BookPort.initPorts(context),
  };
}

export { getPorts };
