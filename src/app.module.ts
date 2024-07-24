import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';
import { User } from './user/entities/user.entity';
import { Product } from './product/entities/product.entity';
import { Comment } from './comment/entities/comment.entity';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_2',
      entities: [User,Product,Comment],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
