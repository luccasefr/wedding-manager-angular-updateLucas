import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { SensibleWordsService } from '../sensible-words.service';
import { faTimes,faTimesCircle,faCheckCircle,faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { PostsService } from '../posts.service';
import { GuestService } from '../guest.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

    sensibleWord;
    word;
    faTimes=faTimes;
    faThumbsUp=faThumbsUp;
    faTimesCircle=faTimesCircle;
    faCheckCircle=faCheckCircle;
    faTrashAlt=faTrashAlt;
    forApproval=false;

    postsForApproval;
    posts;

  constructor(private user:UserService,private sensibleWordsService:SensibleWordsService,private postsService:PostsService,private guestService:GuestService,private helper:HelperService) {
      this.getAllWords();
      this.getPosts();
      this.getPostsforApproval();
  }

  ngOnInit() {
  }

  async getAllWords(){
      this.sensibleWord = await this.sensibleWordsService.getAll();
      console.log(this.sensibleWord);
  }

  async onSubmit(){
     let words = this.word.split(' ');
     this.word = "";
     for (let i = 0; i < words.length; i++) {
         await this.sensibleWordsService.register(words[i])
     }
     this.getAllWords();
  }

  getProfileImg(obj){
      return new Promise(async (res,rej)=>{
          let reader = new FileReader();
          reader.onload = (response:any)=>{
              obj.imgPerfil = response.target.result;
              res(response.target.result);
          }

          reader.readAsDataURL(await this.guestService.getProfileImage(obj.guest.id));

      });
  }

  getPostImg(post){
      return new Promise(async (res,rej)=>{
          let reader = new FileReader();
          reader.onload = (response:any)=>{
              post.image = response.target.result;
              res(response.target.result);
          }
          reader.readAsDataURL(await this.postsService.getPpostImage(post.id));
      });
  }

  updatePublications(value){
      console.log(value);
      this.helper.debounce(()=>{
          this.user.updateUser({publications_should_be_aproved:value});
      },500);
  }

  async getPosts(){
      this.posts= await this.postsService.getAll();
      for (let i = 0; i < this.posts.length; i++) {
          this.getProfileImg(this.posts[i]);
          if(this.posts[i].image_url){
             this.getPostImg(this.posts[i]);
          }
      }
      console.log("Post",this.posts);
  }

  async getPostsforApproval(){
      this.postsForApproval= await this.postsService.getPostsForApproval();
      for (let i = 0; i < this.postsForApproval.length; i++) {
          this.getProfileImg(this.postsForApproval[i]);
          if(this.postsForApproval[i].image_url){
             this.getPostImg(this.postsForApproval[i]);
          }
      }
      console.log(this.postsForApproval);
  }

  async delete(id){
      await this.postsService.delete(id);
      this.getPosts();
      this.getPostsforApproval();
  }

  async aprove(id){
      await this.postsService.aprove(id);
      this.getPosts();
      this.getPostsforApproval();
  }

}
