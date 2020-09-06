import dotenv from "dotenv";

export type DatabaseURI = string;
export type Port = string;

export interface Environment {
  databaseURI: DatabaseURI;
  port: Port;
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
