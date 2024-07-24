import { Comment } from "src/comment/entities/comment.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    price:number
    @Column()
    count:number


    @ManyToOne(type=>User,user=>user.products, {
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    })
    user:User

    @OneToMany(type=>Comment,com=>com.product)
    comments:Comment[]
}
