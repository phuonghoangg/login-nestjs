/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller,Get,Post,Body,HttpCode,UseGuards,Req, Res } from '@nestjs/common';
import { Response } from 'express';
import RegisterDto from '../dto/register.dto';
import RequestWithUser from '../requestWithUser.interface';
import { AuthenticationService } from '../services/authentication.service';
import JwtAuthenticationGuard from '../strategy/jwt-authentication.guard';
import { LocalAuthenticationGuard } from '../strategy/localAuthentication.guard';

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService:AuthenticationService){}

    @Post('register')
    async register(@Body() registerData:RegisterDto){
        return this.authenticationService.register(registerData)
    }

    // @HttpCode(200)
    // @UseGuards(LocalAuthenticationGuard)
    // @Post('login')
    // async logIn(@Req() request, @Res() response: Response){
    //     const {user} = request
    //     const token = this.authenticationService.genToken(user)
    //     user.password = undefined
    //     return response.send({user,token:token})
    // }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async logIn(@Req() request, @Res() response: Response){
        const {user} = request
        const cookie = this.authenticationService.getCookieWithJwtToken(user)
        response.setHeader('Set-Cookie', cookie.cookie);
        user.password = undefined
        return response.send({user,token:cookie.token})
    }
    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
     async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
         response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        return response.sendStatus(200);
    } 
    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
