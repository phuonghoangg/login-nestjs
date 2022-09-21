/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt  from 'bcrypt'
import CreateUserDto from '../dto/createUser.dto';
import User from '../models/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    getAll(){
        return this.userRepository.find()
    }

   async getByEmail(email:string){
    const user =  await this.userRepository.findOne({where:{email:email}})
    if(user){
        return user
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);

   }
   async createUser(dataUser:CreateUserDto){
   
    const newUser = await this.userRepository.create(dataUser)
    await this.userRepository.save(newUser)
    return newUser
   }
   async getById(id:number){
    const  user  = await this.userRepository.findOneById(id)
    if(user){
        return user
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
   }
}
