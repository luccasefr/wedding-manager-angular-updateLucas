import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { environment } from '../environments/environment';

@Injectable()
export class GiftListService {

  constructor(private http:CustomHttpService) { }

  save(data):Promise<any>{
      return new Promise((res,rej)=>{
          this.http.post(environment.apiUrl+'api/user/gift',data).then((response)=>{
              res(response);
          }).catch((err)=>{
             rej(err);
          });
      });
  }

  getAll():Promise<any>{
      return new Promise((res,rej)=>{
          this.http.get(environment.apiUrl+'api/user/gifts').then((response)=>{
              res(response);
          }).catch((err)=>{
             rej(err);
          });
      });
  }

  delete(id):Promise<any>{
      return new Promise((res,rej)=>{
          this.http.post(environment.apiUrl+'api/gift/'+id,{'_method':'delete'}).then((response)=>{
              res(response);
          }).catch((err)=>{
             rej(err);
          });
      });
  }

}
