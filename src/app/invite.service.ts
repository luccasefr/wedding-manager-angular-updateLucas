import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { environment } from '../environments/environment';
import { TextObj } from './invite/text.obj';
import { ImageObj } from './invite/image.Obj';

@Injectable()
export class InviteService {

  constructor(private httpCustom:CustomHttpService) { }

  get():Promise<any>{
      return new Promise((resolve,reject)=>{
          this.httpCustom.post(environment.apiUrl+'api/invite',{}).then((response)=>{
              resolve(response);
          }).catch((err)=>{
              reject(err);
          });
      });
  }

  createText(text:{text,width,height,x,y,layer,font_id,font_size}):Promise<any>{
      return new Promise((resolve,reject)=>{
          this.httpCustom.post(environment.apiUrl+'api/invite/text',{
              'text':text.text,
              'width':text.width,
              'height':text.height,
              'x':text.x,
              'y':text.y,
              'layer':text.layer,
              'font_id':text.font_id,
              'font_size':text.font_size
          }).then((response)=>{
              resolve(response);
          }).catch((err)=>{
              reject(err);
          });
      });
  }

  deleteText(id:number):Promise<any>{
      return new Promise((res,rej)=>{
          this.httpCustom.post(environment.apiUrl+'api/invite/text/'+id,{'_method':'delete'}).then((response)=>{
              res(response);
          }).catch((err)=>{
              rej(err);
          });
      });
  }

  deleteImage(id:number):Promise<any>{
      return new Promise((res,rej)=>{
          this.httpCustom.post(environment.apiUrl+'api/invite/image/'+id,{'_method':'delete'}).then((response)=>{
              res(response);
          }).catch((err)=>{
              rej(err);
          });
      });
  }

  createImage(formModel:FormData){
      return new Promise((resolve,reject)=>{
          this.httpCustom.post(environment.apiUrl+'api/invite/image',formModel).then((response)=>{
              resolve(response);
          }).catch((err)=>{
              reject(err);
          });
      });
  }

  updateText(text:TextObj,font_id):Promise<any>{
      return new Promise((resolve,reject)=>{
          this.httpCustom.post(environment.apiUrl+'api/invite/text/'+text.id,{
              'text':text.text,
              'width':text.width,
              'height':text.height,
              'x':text.x,
              'y':text.y,
              'hexColor':text.textColor,
              'font_size':text.fontSize,
              'layer':text.layer,
              'font_id':font_id
          }).then((response)=>{
              resolve(response);
          }).catch((err)=>{
              reject(err);
          });
      });
  }

  updateInvite(bg_url):Promise<any>{
      return new Promise((resolve,reject)=>{
          this.httpCustom.post(environment.apiUrl+'api/invite',{'_method':'PUT','bg_url':bg_url}).then((response)=>{
              resolve(response);
          }).catch((err)=>{
              reject(err);
          });
      });
  }

  getFonts():Promise<any>{
      return new Promise((resolve,reject)=>{
          this.httpCustom.get(environment.apiUrl+'api/fonts').then((response)=>{
              resolve(response);
          }).catch((err)=>{
              reject(err);
          });
      });
  }

  getImage(id):Promise<any>{
      return new Promise((resolve,reject)=>{
          this.httpCustom.get(environment.apiUrl+'api/invite/image/'+id,'blob').then((response)=>{
              resolve(response);
          }).catch((err)=>{
              reject(err);
          });
      });
  }

  updateImage(image:ImageObj){
      return new Promise((resolve,reject)=>{
          this.httpCustom.post(environment.apiUrl+'api/invite/image/'+image.id,{
              'width':image.width,
              'height':image.height,
              'x':image.x,
              'y':image.y,
              'layer':image.layer
          }).then((response)=>{
              resolve(response);
          }).catch((err)=>{
              reject(err);
          });
      });
  }

}
