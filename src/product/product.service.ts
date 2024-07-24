import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    const user = await this.userRepository.findOneBy({ id: createProductDto.userId });
    if (user) {
      return await this.productRepository.save({ ...createProductDto, user })
    } else {
      throw new NotFoundException('user not found')
    }
  }

  async findAll() {
    return this.productRepository.find({
      relations:{user:true}
    });

  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        comments: true,
        user: true,
      }
    })
    if (product) {
      return product
    } else {
      throw new NotFoundException('user not found')
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    if (product) {
      if (updateProductDto.userId) {
        const user = await this.userRepository.findOneBy({ id: updateProductDto.userId });
        if (user) {
          await this.productRepository.update(id, {...updateProductDto, user})
        } else {
          throw new NotFoundException('user not found')
        }
      }else{
        await this.productRepository.update(id, updateProductDto)
      }
      return await this.productRepository.findOneBy({ id });
    } else {
      throw new NotFoundException('product not found')
    }
  }

  async remove(id: number) {
    const product=await this.productRepository.findOneBy({id});
    if(product){
      await this.productRepository.delete(id)
      return true;
    }else{
      return false
    }
  }
}
