import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { environment } from '../environments/environment';

@Injectable()
export class PostsService {

  constructor(private http:CustomHttpService) { }

  getAll():Promise<any>{
      return new Promise((res,rej)=>{
          this.http.get(environment.apiUrl+'api/posts').then((response)=>{
              res(response);
          }).catch((err)=>{
              rej(err);
          })
      });
  }

  getPostsForApproval():Promise<any>{
      return new Promise((res,rej)=>{
          this.http.get(environment.apiUrl+'api/user/posts-for-aprove').then((response)=>{
              res(response);
          }).catch((err)=>{
              rej(err);
          })
      });
  }

  getPpostImage(postId):Promise<any>{
      return new Promise((res,rej)=>{
          this.http.get(environment.apiUrl+'api/post/'+postId+'/image','blob').then((response)=>{
              res(response);
          }).catch((err)=>{
              rej(err);
          })
      });
  }

  aprove(postId):Promise<any>{
      return new Promise((res,rej)=>{
          this.http.post(environment.apiUrl+'api/post/'+postId+'/aprove',{}).then((response)=>{
              res(response);
          }).catch((err)=>{
              rej(err);
          })
      });
  }

  delete(postId):Promise<any>{
      return new Promise((res,rej)=>{
          this.http.post(environment.apiUrl+'api/post/'+postId,{'_method':'delete'}).then((response)=>{
              res(response);
          }).catch((err)=>{
              rej(err);
          })
      });
  }
}
