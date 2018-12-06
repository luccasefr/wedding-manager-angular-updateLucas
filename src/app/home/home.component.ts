import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Chart } from 'chart.js'

import { EventService } from '../event.service';
import { GuestService } from '../guest.service';
import { ActionService } from '../action.service';

import { getLocaleDateFormat } from '@angular/common';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chartt: any = [];
  guests;
  actions;
  users;
  confirmedCount: any;
  daysLeft;
  percentageText;
  totalGuests;
  data:any = [];




  constructor(private user: UserService, private guestService: GuestService, private usersService: UserService, private actionService: ActionService, private post: PostsService) {
    this.getAll();
    


  }

  ngOnInit() {
    
  }




  public async getAll() {
    this.guests = await this.guestService.getAll();
    this.actions = await this.actionService.getAll();
    this.user = await this.user.actualize();
    

    //Dias faltando
    let now = new Date;

    let nowFomated = now.toLocaleDateString();

    let weddingDate = this.user.wedding_date.split('/');

    let wedding = new Date(weddingDate[1] + "-" + weddingDate[0] + "-" + weddingDate[2]);
    let endDate = wedding.valueOf();
    let nowDate = now.valueOf();

    this.daysLeft = Math.trunc(((endDate - nowDate) / 1000 / 60 / 60 / 24))

    //Data inicial
    const inicialDate = this.user.created_at.split('-');
    let inicialDateDay = inicialDate[2].split(' ');
    let inicialDateFormated = new Date(inicialDate[1] + "-" + inicialDateDay[0] + "-" + inicialDate[0] + " " + inicialDateDay[1]);
    let inicialValue = Math.trunc((endDate - (inicialDateFormated.valueOf())) / 1000 / 60 / 60 / 24);
    console.log("inicial", inicialValue);


    //Porcentagem de dias faltando pro casamento

    if (inicialValue > 0) {
      let percentage = (100 - (((this.daysLeft) / inicialValue) * 100))
      percentage = parseFloat(percentage.toFixed(2));
      this.percentageText = percentage + "%";
      console.log(percentage);
      if (percentage > 100) {
        percentage = 100
        this.percentageText = 100 + "%";

      }
    }

    //Total de Pessoas
    const totalGuests:number = this.guests.length;
    console.log("total",totalGuests);
    console.log("guests",this.guests);
    
    //Posts
    this.data = [totalGuests, 1]
    console.log(this.data);
    


  }



  

  public async getConfirmedGuests() {
    this.guests = await this.guestService.getAll();

    var count = 0;
    for (let a = 0; a < this.guests.length; a++) {
      const guest = this.guests[a];

      if (guest.confirmed == 1) {
        count++

      }
    }
    this.confirmedCount = count;
    console.log("2", this.confirmedCount);
    console.log("3",count);
    

    return this.confirmedCount.promise;

  }

  public async getTotalGuests(totalGuests) {
    this.guests = await this.guestService.getAll();
    for (let a = 0; a < this.guests.length; a++) {
      const guest = this.guests[a];

      this.totalGuests = this.guests.length;
      console.log("1", this.totalGuests);
      return totalGuests;


    }
  }




  // Doughnut
  // doughnutChartLabels = [this.getConfirmedGuests(), this.getTotalGuests()];
  public doughnutChartData: number[] = [15, 1];
  public doughnutChartType: string = 'doughnut';
  public doughnutColor: any[] = [{ backgroundColor: ["#f99a82", "#f8c1b3"] }];

  // public doughnutChartLabels2: string[] = ['Confirmados', 'Não confirmados'];
  public doughnutChartData2: number[] = [this.user.expenses_total, this.user.want_to_spent];
  public doughnutChartType2: string = 'doughnut';
  public doughnutColor2: any[] = [{ backgroundColor: ["#f99a82", "#f8c1b3"] }];

  // events
  public chartClicked(e: any): void {
    console.log(e);

  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
