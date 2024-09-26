import { AuthorController } from "./controller/AuthorController";
import { BookController } from "./controller/BookController";
import { RentalController } from "./controller/RentalController";

export const Routes = [
  {
    method: "get",
    route: "/authors",
    controller: AuthorController,
    action: "all",
  },
  {
    method: "get",
    route: "/authors/:id",
    controller: AuthorController,
    action: "one",
  },
  {
    method: "post",
    route: "/authors",
    controller: AuthorController,
    action: "save",
  },
  {
    method: "delete",
    route: "/authors/:id",
    controller: AuthorController,
    action: "remove",
  },
  {
    method: "put",
    route: "/authors/:id",
    controller: AuthorController,
    action: "update",
  },
  {
    method: "get",
    route: "/books",
    controller: BookController,
    action: "all",
  },
  {
    method: "get",
    route: "/books/:id",
    controller: BookController,
    action: "one",
  },
  {
    method: "post",
    route: "/books",
    controller: BookController,
    action: "save",
  },
  {
    method: "delete",
    route: "/books/:id",
    controller: BookController,
    action: "remove",
  },
  {
    method: "put",
    route: "/books/:id",
    controller: BookController,
    action: "update",
  },
  {
    method: "get",
    route: "/rentals",
    controller: RentalController,
    action: "all",
  },
  {
    method: "post",
    route: "/rentals",
    controller: RentalController,
    action: "rent",
  },
  {
    method: "put",
    route: "/rentals/:id/return",
    controller: RentalController,
    action: "return",
  },
  {
    method: "get",
    route: "/rental-books",
    controller: RentalController,
    action: "books",
  },
  {
    method: "delete",
    route: "/rentals/:id",
    controller: RentalController,
    action: "delete",
  },
];
