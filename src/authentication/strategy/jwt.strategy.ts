/* eslint-disable prettier/prettier */
import {ExtractJwt,Strategy} from 'passport-jwt'
import {PassportStrategy } from '@nestjs/passport'
import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UsersService } from 'src/users/services/users.service'
import { request } from 'express'
import { rejects } from 'assert'
import { Inject } from '@nestjs/common'


//strategy 2 để nhận về cookies token
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly configService: ConfigService,
         private readonly userService: UsersService
    ){
        super({
            jwtFromRequest:ExtractJwt.fromExtractors([(request:any)=>{
                //token chu khong can phai cookies
                return request?.headers?.token
            }]),
            secretOrKey: process.env.JWT_SECRET
        })
    }
    async validate(payload){
       
        
        //   return
        if(payload.user){

                const user = await this.userService.getById(payload.user.id)
                return user
        }
        throw new HttpException('User chua dang nhap', HttpStatus.NOT_FOUND);
    }
}

