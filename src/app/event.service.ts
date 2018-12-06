import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { environment } from '../environments/environment';

@Injectable()
export class EventService {

    constructor(private http: CustomHttpService) { }

    /**
     * Envia uma requisição para a criação de um evento no servidor
     * @param data Informações do evento
     */
    save(data): Promise<any> {
        return new Promise((res, rej) => {
            this.http.post(environment.apiUrl + 'api/user/event', data).then((response) => {
                res(response);
            }).catch((err) => {
                rej(err);
            });
        });
    }

    /**
     * Envia uma requisição para o servidor para que ele retorne todos os eventos do usuario
     * que está autenticado
     */
    getAll(): Promise<any> {
        return new Promise((res, rej) => {
            this.http.get(environment.apiUrl + 'api/events').then((response) => {
                res(response);
            }).catch((err) => {
                rej(err);
            });
        });
    }

    /**
     * Manda a requisição de delete para o servidor passando o id do evento a ser deletado
     * @param id id do Evento
     */
    delete(id): Promise<any> {
        return new Promise((res, rej) => {
            this.http.post(environment.apiUrl + 'api/event/' + id, { '_method': 'delete' }).then((response) => {
                res(response);
            }).catch((err) => {
                rej(err);
            });
        });
    }

   /**
    * Recebe um evento e formata os convidados que foram convidados para este evento
    * em um vetor de ids e retorna a versão string desse json para ser enviada ao servidor
    * @param event Evento
    */
    formatEvent(event):string{
        let invites = event.allGuests.filter(guest=>{
            return guest.invited;
        });

        invites = invites.map(guest =>{
            return guest.id;
        });

        return JSON.stringify(invites);
    }

    /**
     * Atualiza os convidados de um evento
     * @param event Evento
     */
    updateInvites(event):Promise<any>{
        let invite = this.formatEvent(event);
        
        return new Promise((res,rej)=>{
            this.http.post(environment.apiUrl+'api/event/'+event.id+'/invite',{guest_ids:invite}).then(response=>{
                res(response);
            },err=>{
                rej(err);
            })
        })
    }

}
