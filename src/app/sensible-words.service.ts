import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { environment } from '../environments/environment';

@Injectable()
export class SensibleWordsService {

  constructor(private http:CustomHttpService) { }

  getAll():Promise<any>{
      return new Promise((res,rej)=>{
          this.http.get(environment.apiUrl+'api/user/sensible-words').then((response)=>{
              res(response);
          }).catch((err)=>{
              rej(err);
          })
      });
  }

  register(word):Promise<any>{
      return new Promise((res,rej)=>{
          this.http.post(environment.apiUrl+'api/user/sensible-word',{word:word}).then((response)=>{
              res(response);
          }).catch((err)=>{
              rej(err);
          })
      });
  }

}
