import { Comment } from "src/comment/entities/comment.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    surname:string

    @OneToMany(type=>Product,prod=>prod.user)
    products:Product[]

    @OneToMany(type=>Comment,com=>com.user)
    comments:Comment[]
}
