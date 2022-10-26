/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import RegisterDto from '../dto/register.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import User from 'src/users/models/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService:UsersService,
        private readonly jwtService:JwtService,
        private readonly configService:ConfigService
    ){}

    public async register(registrationData:RegisterDto){
        const hashedPassword = await bcrypt.hash(registrationData.password,10)
        try {
            const createdUser = await this.userService.createUser({
                ...registrationData,
                password:hashedPassword
            });
            //k dua password ra ngoai`
            createdUser.password = undefined;
            return createdUser  
        } catch (error) {
              throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //Login
    public async  getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
          const user = await this.userService.getByEmail(email);
          await this.verifyPassword(plainTextPassword, user.password);
          return user;
        } catch (error) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }
    
    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
          plainTextPassword,
          hashedPassword
        );
        if (!isPasswordMatching) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
     }
     
    public getCookieWithJwtToken(user){
        const payload  = { user };
        const refreshToken = this.jwtService.sign(payload)
        return `Authentication=${refreshToken}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME_REFRESHTOKEN')}`
    }

    public genToken(user){
        const payload = {user}
        const token = this.jwtService.sign(payload)
        return token;
    }
    public getCookieForLogOut() {
      return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }

}
