import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Authors } from "../entity/Authors"
import { Books } from "../entity/Books"

export class AuthorController {

    private authorRepository = AppDataSource.getRepository(Authors)
    private bookRepository = AppDataSource.getRepository(Books)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.authorRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const author = await this.authorRepository.findOne({
            where: { id }
        })

        if (!author) {
            return "unregistered author"
        }
        return author
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { 
            name,
            birthdate,
            country
         } = request.body;

        const author = Object.assign(new Authors(), {
            name,
            birthdate,
            country
        })

        return this.authorRepository.save(author)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let authorToRemove = await this.authorRepository.findOneBy({ id })

        if (!authorToRemove) {
            return "this author not exist"
        }

        let books = await this.bookRepository.find({
            where: { author: { id } }
        })

        if (books.length > 0) {
            return "this author has books"
        }

        await this.authorRepository.remove(authorToRemove)

        return "author has been removed"
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let authorToUpdate = await this.authorRepository.findOneBy({ id })

        if (!authorToUpdate) {
            return "this author not exist"
        }

        const { 
            name,
            birthdate,
            country
         } = request.body;

        authorToUpdate.name = name

        authorToUpdate.birthdate = birthdate

        authorToUpdate.country = country

        await this.authorRepository.save(authorToUpdate)

        return "author has been updated"
    }
}