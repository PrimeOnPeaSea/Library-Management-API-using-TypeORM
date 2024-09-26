import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Books } from "../entity/Books";
import { Rentals } from "../entity/Rentals";
import { Between } from "typeorm";

export const BetweenDates = (from: Date | string, to: Date | string) =>
  Between(
    typeof from === "string" ? new Date(from) : from,
    typeof to === "string" ? new Date(to) : to
  );

export const isBookRented = (bookId: number) => {
  return AppDataSource.getRepository(Rentals).findOne({
    where: {
      book_id: { id: bookId },
      returned: false,
    },
    order: {
      id: "DESC",
    },
  });
};

export class RentalController {
  private rentalRepository = AppDataSource.getRepository(Rentals);
  private bookRepository = AppDataSource.getRepository(Books);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.rentalRepository.find();
  }

  async rent(request: Request, response: Response, next: NextFunction) {
    const { book, user } = request.body;

    const bookExist = await this.bookRepository.findOne({
      where: { id: book },
    });

    if (!bookExist) {
      return "book not exist";
    }

    const isRented = await isBookRented(book);

    if (isRented) {
      return "this book already rented";
    }

    const rental = Object.assign(new Rentals(), {
      book_id: book,
      renter_name: user,
      rented_on: new Date(),
      return_due: new Date(new Date().setDate(new Date().getDate() + 7)),
    });

    return this.rentalRepository.save(rental);
  }

  async return(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let rental = await this.rentalRepository.findOne({
      where: { id },
    });

    if (!rental) {
      return "this rental not exist";
    }

    if (rental.returned_on) {
      return "this rental already returned";
    }

    rental.returned_on = new Date();
    rental.returned = true;

    return this.rentalRepository.save(rental);
  }

  async books(request: Request, response: Response, next: NextFunction) {
    const { startDate, endDate } = request.query;

    return this.rentalRepository.find({
      where: {
        rented_on: BetweenDates(new Date(startDate), new Date(endDate)),
      },
      relations: ["book_id"],
    });
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let rentalToRemove = await this.rentalRepository.findOne({
      where: { id },
    });

    if (!rentalToRemove) {
      return "this rental not exist";
    }

    await this.rentalRepository.remove(rentalToRemove);
  }
}
