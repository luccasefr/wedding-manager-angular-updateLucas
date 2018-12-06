import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class GuestService {
    token;
    defaultHeader;
    constructor(private httpCustom:CustomHttpService,private http:HttpClient) {
        this.token = localStorage.getItem('token');
        this.defaultHeader = new HttpHeaders({'Accept':'application/json','Authorization':this.token});
        
     }

    getAll():Promise<any>{
        return new Promise((resolve,reject)=>{
            this.httpCustom.get(environment.apiUrl+'api/guests').then((response)=>{
                resolve(response);
            }).catch((err)=>{
                reject(err);
            });
        });
    }

    save(guest):Promise<any>{
        return new Promise((resolve,reject)=>{
            this.httpCustom.post(environment.apiUrl+'api/guest',guest).then((response)=>{
                resolve(response);
            }).catch((err)=>{
                reject(err);
            });
        });
    }

    getInvite(guest):Promise<any>{
        return new Promise((resolve,reject)=>{
            this.httpCustom.get(environment.apiUrl+'api/guest/'+guest.id+'/invite','blob').then((response)=>{
                resolve(response);
            }).catch((err)=>{
                reject(err);
            });
        });
    }

    getQrCode(guest):Promise<any>{
        return new Promise((resolve,reject)=>{
            this.httpCustom.get(environment.apiUrl+'api/guest/'+guest.id+'/qrcode','blob').then((response)=>{
                resolve(response);
            }).catch((err)=>{
                reject(err);
            });
        });
    }

    getAllQrCodes(){
        this.http
        .get(environment.apiUrl+'api/user/qrcodes', {responseType: 'blob',headers:this.defaultHeader})
        .subscribe((res:any) => {
            console.log('start download:',res);
            var url = window.URL.createObjectURL(res);
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = 'qrcodes.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove(); // remove the element
            }, error => {
            console.log('download error:', JSON.stringify(error));
        }, () => {
            console.log('Completed file download.')
        });
    }

    getAllInvites(){
        this.http
        .get(environment.apiUrl+'api/user/invites', {responseType: 'blob',headers:this.defaultHeader})
        .subscribe((res:any) => {
            console.log('start download:',res);
            var url = window.URL.createObjectURL(res);
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = 'convites.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove(); // remove the element
            }, error => {
            console.log('download error:', JSON.stringify(error));
        }, () => {
            console.log('Completed file download.')
        });
    }

    delete(guest):Promise<any>{
        return new Promise((resolve,reject)=>{
            this.httpCustom.post(environment.apiUrl+'api/guest/'+guest.id,{'_method':'delete'}).then((response)=>{
                resolve(response);
            }).catch((err)=>{
                reject(err);
            });
        });
    }

    getProfileImage(guestId):Promise<any>{
        return new Promise((res,rej)=>{
            this.httpCustom.get(environment.apiUrl+'api/guest/'+guestId+'/profile-img','blob').then((response)=>{
                res(response);
            }).catch((err)=>{
                rej(err);
            })
        });
    }

    

}
