import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

    token:string;

    constructor(private http:HttpClient,private userService:UserService) {
        this.token = localStorage.getItem('token');
    }

    IsLogged(){
        return this.token!=undefined;
    }

    Login(user:{email:string,password:string}):Promise<any>{
        return new Promise((resolve,reject)=>{
            console.log(environment);
            if(this.token==null){
                this.http.post(environment.apiUrl+'oauth/token',{
                    'grant_type':'password',
                    'client_id':environment.client_id,
                    'client_secret':environment.client_secret,
                    'username':user.email,
                    'password':user.password,
                    'scope':''
                }).subscribe(
                    async (response:any)=>{
                        this.token = response.token_type+' '+response.access_token;
                        localStorage.setItem('token',this.token);
                        await this.userService.actualize();
                        resolve();
                    },(err)=>{
                        reject(err);
                    }
                );
            }else{
                resolve();
            }
        });
    }

    clear(){
        this.token=undefined;
        localStorage.removeItem('token');
        this.userService.clear();
    }

}
