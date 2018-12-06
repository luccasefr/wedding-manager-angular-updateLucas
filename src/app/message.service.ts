import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
    reciver={};

    constructor() { }

    RegisterFunc(name,func:(options)=>void){
        this.reciver[name]=func;
    }

    CallFunc(name,options){
        this.reciver[name](options);
        
    }

}
