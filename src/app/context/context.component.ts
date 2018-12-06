import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css']
})
export class ContextComponent implements OnInit {

    show:boolean = false;
    xPos:number;
    yPos:number;
    options:{name:string,func:()=>void}[]

  constructor(private message:MessageService) {
      this.message.RegisterFunc('openContext',(options:any)=>{
          this.open(options.x,options.y,options.options);
      });

      this.message.RegisterFunc('exitContext',()=>{
          this.exit();
      });

      document.addEventListener('click',()=>{
          this.exit();
      })
  }

  ngOnInit() {
  }

  open(x,y,options){
      this.show=true;
      this.xPos = x;
      this.yPos = y;
      this.options = options
  }

  exit(){
      this.show=false;
      this.xPos = undefined;
      this.yPos = undefined;
      this.options = undefined;
  }

}
