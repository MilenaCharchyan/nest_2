import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Product])],

  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
