import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { UserService } from '../user.service';
import { HelperService } from '../helper.service';
import { InviteService } from '../invite.service';
import { Invite } from './invite.obj';
import { TextObj } from './text.obj';
import { ImageObj } from './image.Obj';
import { faFont,faImages,faImage,faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from '../message.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

    @ViewChild('canvas') canvasElmt:ElementRef;
    ctx:CanvasRenderingContext2D;

    invite:Invite;
    faFont=faFont;
    faImages=faImages;
    faImage=faImage;
    faTrashAlt=faTrashAlt;
    imageToUpload;
    text:TextObj;
    imageObj:ImageObj;
    fonts;
    showBgs=false;

    apiUrl;

    bgImgs=['/bgImgs/bg01.jpg','/bgImgs/bg02.jpg','/bgImgs/bg03.jpg'];

  constructor(private user:UserService,private helper:HelperService,private inviteService:InviteService,private messenger:MessageService) {
      this.apiUrl = environment.apiUrl;
  }

  async ngOnInit() {
      this.ctx = this.canvasElmt.nativeElement.getContext('2d');
      this.fonts = await this.inviteService.getFonts();
      this.LoadInvite();
      // this.ctx.moveTo(0, 0);
      // this.ctx.lineTo(200, 100);
      // this.ctx.stroke();
  }

  async LoadInvite(){
      let invite = await this.inviteService.get();
      this.invite = new Invite(invite,this.ctx,this.canvasElmt,this.fonts,this.helper,this.inviteService);
      this.invite.onTextSelected = (text)=>{
          this.text=text;
           this.imageObj = undefined;
           this.showBgs=false;
      }

      this.invite.onSelectedNothing = ()=>{
          this.text=undefined;
          this.imageObj = undefined;
          this.showBgs=false;
      }

      this.invite.onImageSelected = (image)=>{
          this.text=undefined;
          this.imageObj = image;
          this.showBgs=false;
      }
  }

  async updateInvite(bg_url){
      await this.inviteService.updateInvite(bg_url);
      this.LoadInvite();
  }

  async deleteText(text){
      await this.inviteService.deleteText(text.id);
      this.text=undefined;
      this.LoadInvite();
  }

  async deleteImage(text){
      await this.inviteService.deleteImage(text.id);
      this.imageObj=undefined;
      this.LoadInvite();
  }

  selectBg(bg){

      this.updateInvite(bg);
  }

  async createText(event){

      // this.messenger.CallFunc('Wait',{message:'Criando Imagem...'});
      let response = await this.inviteService.createText({text:'Seu Texto Aqui',width:2,height:.5,x:1,y:1,layer:0,font_id:this.fonts[0].id,font_size:3.5});
      // this.messenger.CallFunc('CloseMessage',{});
      // console.log(response);
     this.LoadInvite();

  }

  async createImg(event){
      if(event.target.files.length>0){
          let formData = new FormData();
          formData.append('image',event.target.files[0]);
          formData.append('width','2');
          formData.append('height','2');
          formData.append('x','4.5');
          formData.append('y','2.5');
          formData.append('layer','0');

          this.messenger.CallFunc('Wait',{message:'Criando Imagem...'});
          let response = await this.inviteService.createImage(formData);
          this.messenger.CallFunc('CloseMessage',{});
          // console.log(response);
          this.LoadInvite();
      };
  }

}
