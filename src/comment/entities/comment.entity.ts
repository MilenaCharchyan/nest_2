import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    text:string

    @ManyToOne(type=>Product,prod=>prod.comments, {
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    })
    product:Product

    @ManyToOne(type=>User,user=>user.comments, {
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    })
    user:User
}
