/* eslint-disable prettier/prettier */
import { Body, Controller,Get, Param,Post } from '@nestjs/common';
import { User } from '../models/user.interface';
import { UsersService } from '../services/users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}
    @Get(':string')
    getUserByMail(@Param('string') email:string){
        return this.userService.getByEmail(email)
    }

    @Get()
    getAllUser(){
        return this.userService.getAll()
    }

    @Post()
    createUser(@Body() user:User){
        return this.userService.createUser(user)
    }
}
