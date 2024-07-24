import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Product,Comment])],

  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
