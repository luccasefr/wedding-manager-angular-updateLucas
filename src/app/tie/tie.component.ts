import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { TiepieceService } from '../tiepiece.service';
import { TiebuyService } from '../tiebuy.service';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { log } from 'util';

@Component({
  selector: 'app-tie',
  templateUrl: './tie.component.html',
  styleUrls: ['./tie.component.css']
})
export class TieComponent implements OnInit {

  ties;
  tiesBuys;
  data = {};
  tie_value;
  users;
  faTrashAlt = faTrashAlt;
  totalValue: number = 0;

  constructor(private user: UserService, private tieService: TiepieceService, private tiebuyService: TiebuyService) {
    this.getAll();
    this.getTotal();
  }

  ngOnInit() {

  }

  async getAll() {
    this.ties = await this.tieService.getAll();
    this.tiesBuys = await this.tiebuyService.getAll();



  }

  async getTotal() {
    this.tiesBuys = await this.tiebuyService.getAll();
    //soma do total de compras da gravata
    for (let a = 0; a < this.tiesBuys.length; a++) {
      const count = this.tiesBuys[a];
      var value = count.value

      this.totalValue = this.totalValue + value;
    }
  }

  async onSubmit() {
    console.log(this.data);
    await this.tieService.save(this.data);
    this.data = {};
    this.getAll();
  }

  async delete(tie) {
    await this.tieService.delete(tie.id);
    this.getAll();
  }

}
