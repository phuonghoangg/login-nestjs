/* eslint-disable prettier/prettier */
import {CanActivate,ExecutionContext,HttpException,HttpStatus,Injectable} from '@nestjs/common'
import {Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector){}

    async  canActivate(context: ExecutionContext): Promise<boolean> {
        const role = this.reflector.get<string[]>('roles',context.getHandler()) 
        
        //role tren controller
        console.log('roles: ',role);
        const request = context.switchToHttp().getRequest()
        //dieu kien check voi role tren controller
        if(request?.user.isAdmin){
            return true
        }
        throw new HttpException('User khong phai la admin', HttpStatus.NOT_FOUND);
    }

}