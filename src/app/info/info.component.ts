import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from '../message.service';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

    userToSave: any = {};
    calendar = faCalendarAlt;
    weddingDate;
    weddingHour;
    newMonth;
    newDay: string;
    event;

    hoursPattern = /(([0-1][0-9])|([0-2][0-4])):[0-5][0-9]/;

    constructor(private user: UserService, private message: MessageService) { 
        
    }

    ngOnInit() {
        this.setUserToSave();
        let datetime = this.userToSave.wedding_date.split(' ');
        let dates = datetime[0].split('/');
        this.weddingHour = datetime[1];
        this.weddingDate = dates[2] + '-' + dates[1] + '-' + dates[0]
        console.log(this.userToSave);
        console.log('21:15'.match(this.hoursPattern) !== null);
        console.log('25:30'.match(this.hoursPattern) !== null);
        console.log('19:40'.match(this.hoursPattern) !== null);
        console.log('11:65'.match(this.hoursPattern) !== null);

    }

    async getAll(){
        this.user = await this.user.actualize();
        console.log(this.user);
    }

    onDateSelect(eventClick) {

        console.log(eventClick);
        console.log(eventClick.month < 9)
        console.log(eventClick.month < 9 ? '0' + eventClick.month : eventClick.month);
        this.newMonth = eventClick.month < 10 ? '0' + eventClick.month : eventClick.month;
        this.newDay = eventClick.day < 10 ? '0' + eventClick.day : eventClick.day;
        this.weddingDate = eventClick.year + '-' + this.newMonth + '-' + this.newDay;
        console.log(this.weddingDate);
    }

    setUserToSave() {
        this.userToSave.name_1 = this.user.name_1;
        this.userToSave.name_2 = this.user.name_2;
        this.userToSave.publications_should_be_aproved = this.user.publications_should_be_aproved;
        this.userToSave.expenses_total = this.user.expenses_total;
        this.userToSave.memory_game_released = this.user.memory_game_released;
        this.userToSave.puzzle_released = this.user.puzzle_released;
        this.userToSave.quiz_released = this.user.quiz_released;
        this.userToSave.waiting_guests = this.user.waiting_guests;
        this.userToSave.want_to_spent = this.user.want_to_spent;
        this.userToSave.wedding_date = this.user.wedding_date;
        this.userToSave.street = this.user.address.street;
        this.userToSave.number = this.user.address.number;
        this.userToSave.complemen = this.user.address.complemen;
        this.userToSave.neighborhood = this.user.address.neighborhood;
        this.userToSave.city = this.user.address.city;
        this.userToSave.state = this.user.address.state;
        this.userToSave.cep = this.user.address.cep;
    }

    async onSubmit() {
        this.message.CallFunc("Wait", { message: 'Salvando...' });
        if (this.userToSave.want_to_spent == '') delete this.userToSave.want_to_spent;
        if (this.userToSave.complement == '') delete this.userToSave.complement;
        let dates = this.weddingDate.split('-');
        this.userToSave.wedding_date = dates[2] + '/' + dates[1] + '/' + dates[0] + ' ' + this.weddingHour;
        await this.user.updateUser(this.userToSave);
        this.message.CallFunc("ShowMessage", { title: 'Sucesso', message: 'Informações alteradas com sucesso!' });
        console.log(this.userToSave);
        
        
    }

}
