import {
    Entity, PrimaryGeneratedColumn, Column, JoinColumn,
    ManyToOne
} from "typeorm"
import { Books } from "./Books"

@Entity()
export class Rentals {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Books, book => book.rentals)
    @JoinColumn()
    book_id: Books

    @Column()
    renter_name: string

    @Column()
    rented_on: Date

    @Column()
    return_due: Date

    @Column({ nullable: true })
    returned_on: Date

    @Column({ default: false })
    returned: boolean
}
