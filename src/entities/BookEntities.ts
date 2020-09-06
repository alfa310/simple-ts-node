import { Document } from "mongoose";

export interface InputBook {
  title: string;
  content: string;
}

export type BookDocument = Document & {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface BookResponse {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
