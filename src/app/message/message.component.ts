import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
    title='Title';
    message="message";
    showWaitMessage:boolean = false;
    waiMessage='';
    showMessage:boolean = false;
    displayMessageBox = false;
    faSpinner=faSpinner;

  constructor(private messageService:MessageService) {
      this.messageService.RegisterFunc('ShowMessage',(options)=>{
          this.displayMessageBox = true;
          this.showWaitMessage = false;
          this.showMessage = true;
          this.title = options.title;
          this.message =  options.message;
      });

      this.messageService.RegisterFunc('Wait',(options)=>{
          this.displayMessageBox = true;
          this.showMessage = false;
          this.showWaitMessage = true;
          this.waiMessage = options.message ? options.message : 'Carregando';
      });

      this.messageService.RegisterFunc('CloseMessage',(options)=>{
          this.displayMessageBox = false;
          this.showMessage = false;
          this.showWaitMessage = false;
      });
  }

  ngOnInit() {
  }

  exit(){
       this.displayMessageBox = false;
       this.showMessage = false;
       this.showWaitMessage = false;
       window.location.reload();
  }

}
