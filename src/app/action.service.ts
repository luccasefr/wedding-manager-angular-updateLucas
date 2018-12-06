import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { environment } from '../environments/environment';

@Injectable()
export class ActionService {

  constructor(private httpCustom:CustomHttpService) { console.log(this.httpCustom) }

  getAll():Promise<any>{
      return new Promise((resolve,reject)=>{
          this.httpCustom.get(environment.apiUrl+'api/actions').then((response)=>{
              resolve(response);
          }).catch((err)=>{
              reject(err);
          });
      });
  }

  save(action):Promise<any>{
      return new Promise((resolve,reject)=>{
          this.httpCustom.post(environment.apiUrl+'api/action',action).then((response)=>{
              resolve(response);
          }).catch((err)=>{
              reject(err);
          });
      });
  }

}
