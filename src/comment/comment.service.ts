import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) { }
  async create(createCommentDto: CreateCommentDto) {
    const user = await this.userRepository.findOneBy({ id: createCommentDto.userId });
    const product = await this.productRepository.findOneBy({ id: createCommentDto.productId });
    if (user && product) {
      return await this.commentRepository.save({ ...createCommentDto, user, product })
    } else {
      throw new NotFoundException('user not found')
    }
  }

  async findAll() {
    return this.commentRepository.find({
      relations: {
        product: true,
        user: true,
      }
    });
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: {
        product: true,
        user: true,
      }
    })
    if (comment) {
      return comment
    } else {
      throw new NotFoundException('user not found')
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const { userId, productId } = updateCommentDto
    const comment = await this.commentRepository.findOneBy({ id });
    if (comment) {
      let user;
      let product;
      if (userId) {
        user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
          throw new NotFoundException('user not found')
        }
      }
      if (productId) {
        product = await this.productRepository.findOneBy({ id: productId });
        if (!product) {
          throw new NotFoundException('product not found')
        }
      }
      await this.commentRepository.update(id, { user: user ? user : comment.user, product: product ? product : comment.product })
      return await this.commentRepository.findOneBy({ id });
    } else {
      throw new NotFoundException('product not found')
    }
  }

  async remove(id: number) {
    const comment=await this.commentRepository.findOneBy({id});
    if(comment){
      await this.commentRepository.delete(id)
      return true;
    }else{
      return false
    }
  }
}
