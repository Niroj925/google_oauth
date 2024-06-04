import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class Auth {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    email:String

    @Column()
    userName:string
}
