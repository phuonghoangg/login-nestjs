/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller ,Body,Delete,Param,Post,Put, Get ,UseGuards} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/strategy/jwt-authentication.guard';
import { PostsService } from '../services/posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService:PostsService){}

    @Get()
    @UseGuards(JwtAuthenticationGuard)
    getAllPost(){
        return this.postService.getAllPost();
    }
    @Get(':id')
    getPostById(@Param('id') id:string){
        return this.postService.getPostByID(Number(id))
    }
    @Post()
    @UseGuards(JwtAuthenticationGuard)
    createPost(@Body() post){
        return this.postService.createPost(post)
    }
    @Delete(':id')
    deletePost(@Param('id') idDelete:number){
        return this.postService.deletePost(idDelete)
    }
    
}
