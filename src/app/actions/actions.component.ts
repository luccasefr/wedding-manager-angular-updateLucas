import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ActionService } from '../action.service';
import { HelperService } from '../helper.service';
import { MessageService } from '../message.service';
import { faCheckSquare,faSquare } from '@fortawesome/free-regular-svg-icons';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

    calendar = faCalendarAlt;
    hoveredDate: NgbDateStruct;

    faCheckSquare=faCheckSquare;
    faSquare=faSquare;

    notificate;
    expense;

    actions;

    fromDate: NgbDateStruct = null;
    toDate: NgbDateStruct = null;

    data:any={};

  constructor(
      private user:UserService,
      calendar: NgbCalendar,
      private actionsSerivce:ActionService,
      private helper:HelperService,
      private message:MessageService
  ) {
      this.getAll();
  }

  ngOnInit() {
  }

  getFormatedFromToDate(){
      return (this.fromDate ? this.fromDate.year+'-'+this.helper.pad(this.fromDate.month,2)+'-'+this.helper.pad(this.fromDate.day,2):'')+' / '+(this.toDate ? this.toDate.year+'-'+this.helper.pad(this.toDate.month,2)+'-'+this.helper.pad(this.toDate.day,2):'')
  }

  pad(num, size) {
      var s = num+"";
      while (s.length < size) s = "0" + s;
      return s;
  }

  async getAll(){
      this.actions = await this.actionsSerivce.getAll();
      console.log(this.actions);
  }

  onSubmit(){
      if(this.data.expense_date){
          this.data.expense_date = this.pad(this.data.expense_date.day,2)+'/'+this.pad(this.data.expense_date.month,2)+'/'+this.data.expense_date.year;
      }

      if(!this.notificate){
          console.log('clean notification');
          this.fromDate = undefined;
          this.toDate = undefined;
          this.data.message = undefined;
      }else{
          this.data.notify_date_to = this.pad(this.toDate.day,2)+'/'+this.pad(this.toDate.month,2)+'/'+this.toDate.year;
          this.data.notify_date_from = this.pad(this.fromDate.day,2)+'/'+this.pad(this.fromDate.month,2)+'/'+this.fromDate.year;
      }

      if(!this.expense){
          this.data.expense_date = undefined;
          this.data.expense_value = undefined;
      }

      this.message.CallFunc("Wait",{message:'Registrando...'});
      this.actionsSerivce.save(this.data).then((response)=>{
          this.message.CallFunc("ShowMessage",{title:'Registrado',message:'Ação registrada com suscesso!'});
          this.getAll();
      }).catch(()=>{this.message.CallFunc("ShowMessage",{title:'Error',message:'Error inesperado tente novamente'});});
  }

  onDateSelection(date: NgbDateStruct,calendar) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      calendar.close();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

}
