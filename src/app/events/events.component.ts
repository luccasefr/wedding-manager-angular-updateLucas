import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { UserService } from '../user.service';
import { faCalendarAlt,faSpinner } from '@fortawesome/free-solid-svg-icons';
import { GuestService } from '../guest.service';
import { faCheckSquare, faSquare, faTimesCircle, faTrashAlt } from '@fortawesome/free-Regular-svg-icons';
import { isNgTemplate } from '@angular/compiler';
import { Invite } from '../invite/invite.obj';



@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

    data: any = {};
    guestsInvite: any = [];
    eventGuest: any = [];
    adress: any = [];
    calendar = faCalendarAlt;
    faSpinner=faSpinner;
    events;
    eventClick;
    eventDate=null;
    eventHour;
    newMonth;
    newDay: string;
    guests: any = [];
    faCheckSquare = faCheckSquare;
    faSquare = faSquare;
    faTimesCircle = faTimesCircle;
    faTrashAlt = faTrashAlt;
    hidden;
    show_button:boolean=false;
    

    sending=false;

    constructor(private user: UserService, private eventService: EventService, private guestService: GuestService) {
        this.getAll();
    }

    ngOnInit() {}

    /**
     * Envia os dados do evento para o servidor para que ele crie aquele evento
     * em sequida atualiza os eventos para que o novo evento possa ser exibido
     * @param form Fomulario
     */
    async onSubmit(form) {
        this.sending=true;
        let dates = this.eventDate.split('-');
        this.data.date = dates[2] + '/' + dates[1] + '/' + dates[0] + ' ' + this.eventHour;
        await this.eventService.save(this.data);
        console.log(dates)
        console.log(this.data)
        await this.getAll();
        this.sending=false;
        form.reset();
    }

    onDateSelect(eventClick) {
        console.log(eventClick);
        console.log(eventClick.month < 9)
        console.log(eventClick.month < 9 ? '0' + eventClick.month : eventClick.month);
        this.newMonth = eventClick.month < 10 ? '0' + eventClick.month : eventClick.month;
        this.newDay = eventClick.day < 10 ? '0' + eventClick.day : eventClick.day;
        this.eventDate = eventClick.year + '-' + this.newMonth + '-' + this.newDay;
        console.log(this.eventDate);
    }

    /**
     * Retorna um objeto com informações se aquele convidado já confirmou presença
     * @param event Evento
     * @param guest Convidado
     */
    guestIsInvited(event:any,guest):{invtided:boolean,confirmed:boolean}{
        for (let i = 0; i < event.guests.length; i++) {
            const eventGuest = event.guests[i];
            if(eventGuest.id == guest.id){
                return {invtided:true,confirmed:eventGuest.pivot.confirmed == 1};
            }
        }
        return {invtided:false,confirmed:false};
    }

    /**
     * Busca no servidor os eventos e os convidados
     * depois combina os convidados com os eventos para que seja possivel convidar
     * os convidados para um determinado evento
     */
    getAll():Promise<undefined>{
        return new Promise(async (res,rej)=>{
            try{
                this.events = await this.eventService.getAll();
                this.guests = await this.guestService.getAll();
            }catch(err){
                rej(err);
            }
            
            this.events = this.events.map(item => {
                let allGuests = this.guests.map(guest => {
                    let infoGuest = this.guestIsInvited(item,guest);
                    return{...guest,invited:infoGuest.invtided,confirmed:infoGuest.confirmed};
                    
                });
                var buttonId = item.id;
                var buttonBool = false;
                console.log("---------------------");
                console.log("item",item);
                console.log("id", item.id);
                console.log("button",buttonId);
                
                
                return {...item,allGuests:allGuests,sending:false, buttonId, buttonBool}
            });
            
            res();
        });
        
        
    }

    /**
     * Atualiza os convidados de um evento
     * @param event Evento
     */
    async updateGuests(event){
        event.sending=true;
        await this.eventService.updateInvites(event);
        event.sending=false;
    }

    /**
     * Manda uma requisição de delete para o servidor deletar aquele evento
     * @param event Evento
     */
    async delete(event){
        await this.eventService.delete(event.id);
        this.getAll();
    }

    showHide(buttonId, event){
        
        if (event.buttonId==event.id) {
            event.buttonBool = !event.buttonBool;
        }   
        

        
        console.log("funcionando", this.show_button);
        console.log("buttonId", event.buttonId);
        
        console.log(event.id);
        console.log(event);
        
        
        
        
        
    }
}



