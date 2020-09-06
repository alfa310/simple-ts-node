import mongoose, { Model } from "mongoose";
import models from "./models";
import { BookDocument } from "../entities";
import { DatabaseURI } from "../config/environment";

export interface Database {
  Book: Model<BookDocument>;
}

export interface DatabaseConnector {
  connection: typeof mongoose;
  models: Database;
}

export async function getDatabase(
  databaseURI: DatabaseURI
): Promise<DatabaseConnector> {
  try {
    await mongoose.connect(databaseURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to a MongoDB instance");
  } catch (error) {
    console.error(error);
  }
  return { connection: mongoose, models };
}
