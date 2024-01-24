import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
export class Report {

    @Column()
    id: number;

    @Column()
    price: number;

}