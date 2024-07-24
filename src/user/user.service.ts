import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor (@InjectRepository(User) private userRepository:Repository<User>){}


  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find({
      select:{
        id:true,
        name:true,
        surname:true
      }
    });
  }

  async findOne(id: number) {
     const user=await this.userRepository.findOne({
      where:{id},
      relations:{
        products:{
          comments:true
        }
      }
    })
    if (user) {
      return user
    }else{
      throw new NotFoundException('user not found')
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user=await this.userRepository.findOneBy({id});
    if (user) {
      await this.userRepository.update(id,updateUserDto)
      return await this.userRepository.findOneBy({id});
    }else{
      throw new NotFoundException('user not found')
    }
  }

  async remove(id: number) {
    const user=await this.userRepository.findOneBy({id});
    if(user){
      await this.userRepository.delete(id)
      return true;
    }else{
      return false
    }
  }
}
