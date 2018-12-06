import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class CustomHttpService {

    token:string;
    defaultHeader

  constructor(private http:HttpClient,public router: Router) {
      this.token = localStorage.getItem('token');
      this.defaultHeader = new HttpHeaders({'Accept':'application/json','Authorization':this.token});
  }

  get(url:string,responseType?):Promise<any>{
      // this.defaultHeader = new HttpHeaders({'Accept':contentType ? contentType :'application/json','Authorization':this.token});
      return new Promise((resolve,reject)=>{
          this.http.get(url,{headers:this.defaultHeader,responseType:responseType ? responseType:'json'}).subscribe(
              (response)=>{resolve(response)},
              (err)=>{
                  if(err.status==401){
                      this.router.navigate(['/login']);
                  }
                  console.log(err);
                  reject(err);
              }
          );
      });
  }

  post(url:string,data):Promise<any>{
      return new Promise((resolve,reject)=>{
          this.http.post(url,data,{headers:this.defaultHeader}).subscribe(
              (response)=>{resolve(response)},
              (err)=>{
                  if(err.status==401){
                      this.router.navigate(['/login']);
                  }
                   reject(err);
              }
          );
      });
  }

}
