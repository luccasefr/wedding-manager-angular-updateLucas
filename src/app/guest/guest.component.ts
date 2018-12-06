import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { GuestService } from '../guest.service';
import { MessageService } from '../message.service';
import { faCheckSquare,faSquare,faTimesCircle } from '@fortawesome/free-Regular-svg-icons';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

    guest={};
    guests;
    faCheckSquare=faCheckSquare;
    faSquare=faSquare;
    faTimesCircle=faTimesCircle;
    image;

  constructor(private user:UserService,private guestService:GuestService,private message:MessageService) {
      this.getAll();
   }

  ngOnInit() {
  }

  async getAll(){
      this.guests = await this.guestService.getAll();
      console.log(this.guests);
  }

  onSubmit(){
      console.log(this.guest);
      this.message.CallFunc("Wait",{message:'Registrando...'});
      this.guestService.save(this.guest).then((response)=>{
          this.getAll();
          this.message.CallFunc("ShowMessage",{title:'Registrado',message:'Ação registrada com suscesso!'});
      }).catch((err)=>{
          this.message.CallFunc("ShowMessage",{title:'Error',message:'Error inesperado tente novamente'});
      });
  }

  async showQrCode(guest){
      let image = new Image();
      // this.image = await this.guestService.getQrCode(guest);
      // image.src = "data:image/png;base64," + await this.guestService.getQrCode(guest);
      let fileReader = new FileReader();
      fileReader.onload = (fileLoadedEvent:any)=>{
          this.image = fileLoadedEvent.target.result;
          console.log(this.image);
      }
      fileReader.readAsDataURL(await this.guestService.getQrCode(guest));
  }

  async showInvite(guest){
      let image = new Image();
      // this.image = await this.guestService.getQrCode(guest);
      // image.src = "data:image/png;base64," + await this.guestService.getQrCode(guest);
      let fileReader = new FileReader();
      fileReader.onload = (fileLoadedEvent:any)=>{
          this.image = fileLoadedEvent.target.result;
          console.log(this.image);
      }
      fileReader.readAsDataURL(await this.guestService.getInvite(guest));
  }

  delete(guest){
      this.message.CallFunc("Wait",{message:'Deletando...'});
      this.guestService.delete(guest).then((response)=>{
          this.getAll();
          this.message.CallFunc("ShowMessage",{title:'Deletado',message:'Convidado excluido com sucesso!'});
      }).catch((err)=>{
          this.message.CallFunc("ShowMessage",{title:'Error',message:'Error inesperado tente novamente'});
      });
  }

  onContextMenu(event:MouseEvent,guest){
      event.preventDefault();
      this.message.CallFunc("openContext",{x:event.clientX,y:event.clientY,options:[
          {name:'Visualizar qr code',func:()=>{
              this.showQrCode(guest);
              this.message.CallFunc('exitContext',{});
          }},{name:'Visualizar convite',func:()=>{
              this.showInvite(guest);
              this.message.CallFunc('exitContext',{});
          }},
          {name:'excluir',func:()=>{
              this.delete(guest);
              this.message.CallFunc('exitContext',{});
          }}
      ]});
      console.log(event);
  }

}
