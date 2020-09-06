/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from "faker";
import { InputBook, BookDocument, ServiceContext } from "../../src/entities";
import { RootLogger } from "loglevel";
import { BookPortInterface } from "../../src/ports/BookPort";
import { Ports } from "../../src/ports";

export function buildBook(overrides?: any): BookDocument {
  return {
    _id: faker.random.alphaNumeric(12),
    title: faker.name.title(),
    content: faker.lorem.lines(2),
    createdAt: faker.date.recent().toUTCString(),
    updatedAt: faker.date.recent().toUTCString(),
    ...overrides,
  };
}

export function buildInputBook(overrides?: any): InputBook {
  return {
    title: faker.name.title(),
    content: faker.lorem.lines(2),
    ...overrides,
  };
}

export function buildLogger(overrides?: any): RootLogger {
  return {
    info: jest.fn().mockName("logger.info"),
    error: jest.fn().mockName("logger.error"),
    ...overrides,
  };
}

export function buildBookPort(overrides?: any): BookPortInterface {
  return {
    create: jest.fn().mockName("bookPort.create"),
    getAll: jest.fn().mockName("bookPort.getAll"),
    ...overrides,
  };
}

export function buildPorts(overrides?: any): Ports {
  return {
    bookPort: buildBookPort(),
    ...overrides,
  };
}

export function buildContext(overrides?: any): ServiceContext {
  return {
    ports: buildPorts(),
    logger: buildLogger(),
    ...overrides,
  };
}
