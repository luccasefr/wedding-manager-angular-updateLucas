import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { environment } from '../environments/environment';

@Injectable()
export class PlaylistService {

  constructor(private http:CustomHttpService) { }

  getAll():Promise<any>{
      return new Promise((res,rej)=>{
          this.http.get(environment.apiUrl+'api/songs').then((response)=>{
              res(response);
          }).catch((err)=>{
              rej(err);
          });
      });
  }

}
