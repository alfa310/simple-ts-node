import { Schema, model } from "mongoose";
import { BookDocument } from "../../entities";

const BookSchema = new Schema({
  title: { type: String, required: "tittle cannot be blank" },
  content: { type: String },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const Book = model<BookDocument>("Book", BookSchema);

export default Book;
