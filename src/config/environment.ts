import dotenv from "dotenv";
import { Port, DatabaseURI } from "./types";

export interface Environment {
  port: Port;
  databaseURI: DatabaseURI;
}

export function getMissingEnvironmentVariables(): string[] {
  return ["PORT", "DB"].filter(
    (variable) => process.env[variable] === undefined
  );
}

export function getEnvironment(): Environment | null {
  dotenv.config();
  if (process.env.PORT && process.env.DB) {
    return {
      port: process.env.PORT,
      databaseURI: process.env.DB,
    };
  }
  return null;
}
