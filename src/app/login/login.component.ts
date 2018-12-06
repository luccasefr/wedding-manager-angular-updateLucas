import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user={email:'',password:''};

    constructor(private auth:AuthService,private message:MessageService,public router: Router) {
        this.auth.clear();
    }

    ngOnInit() {
    }

    onSubmit(){
        // console.log('test');
        this.message.CallFunc("Wait",{message:'Entrando...'});
        this.auth.Login(this.user).then((response)=>{
            // console.log(response);
            this.message.CallFunc("CloseMessage",{});
            this.router.navigate(['/home']);
        }).catch((err)=>{
            // console.log(err);
            if(err.status==401){
                this.message.CallFunc("ShowMessage",{title:'Error',message:'Senha ou email incorretos por favor tente novamente'});
                this.user.password = '';
            }
        });
    }

}
