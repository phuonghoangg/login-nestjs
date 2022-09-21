/* eslint-disable prettier/prettier */
import { Injectable, HttpException,HttpStatus} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import Post from '../models/post.entity';
@Injectable()
export class PostsService {
  constructor(  @InjectRepository(Post) private postRepository:Repository<Post>){}
    
    getAllPost(){
        return  this.postRepository.find();
    }
    async getPostByID(id :number){
        const post  = await this.postRepository.findOneById(id)
        if(post){
            return post
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async createPost(post:CreatePostDto){
        const newPost = await this.postRepository.create(post)
        await this.postRepository.save(newPost)
        return newPost
    }
    async updatePost(id: number, post: UpdatePostDto) {
        await this.postRepository.update(id, post);
        const updatedPost = await this.postRepository.findOneById(id);
        if (updatedPost) {
          return updatedPost
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    async deletePost(id:number){
       const deleteRes =  await this.postRepository.delete(id)
        if (!deleteRes.affected) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
          }
    }
}
