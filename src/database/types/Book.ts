import { Document } from "mongoose";

export type BookProps = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BookDocument = Document & BookProps;
