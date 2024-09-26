import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Books } from "../entity/Books";
import { Authors } from "../entity/Authors";
import { isBookRented } from "./RentalController";

export class BookController {
  private bookRepository = AppDataSource.getRepository(Books);
  private authorRepository = AppDataSource.getRepository(Authors);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.bookRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const book = await this.bookRepository.findOne({
      where: { id },
    });

    if (!book) {
      return "unregistered book";
    }
    return book;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { title, published_date, genre, author } = request.body;

    const authorExist = await this.authorRepository.findOne({
      where: { id: author },
    });

    if (!authorExist) {
      return "author not exist";
    }

    const book = Object.assign(new Books(), {
      title,
      published_date,
      genre,
      author,
    });

    return this.bookRepository.save(book);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let bookToRemove = await this.bookRepository.findOneBy({ id });

    if (!bookToRemove) {
      return "this book not exist";
    }

    const isRented = await isBookRented(bookToRemove.id);

    if (isRented) {
      return "this book is currently rented";
    }

    await this.bookRepository.remove(bookToRemove);

    return "book has been removed";
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let bookToUpdate = await this.bookRepository.findOneBy({ id });

    if (!bookToUpdate) {
      return "this book not exist";
    }

    const { title, published_date, genre, author } = request.body;

    const authorExist = await this.authorRepository.findOne({
      where: { id: author },
    });

    if (!authorExist) {
      return "author not exist";
    }

    bookToUpdate.title = title;
    bookToUpdate.published_date = published_date;
    bookToUpdate.genre = genre;
    bookToUpdate.author = author;

    return this.bookRepository.save(bookToUpdate);
  }
}
