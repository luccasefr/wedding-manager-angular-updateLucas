import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { GiftListService } from '../gift-list.service';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit {

    data={};
    giftLists;
    faTrashAlt=faTrashAlt;
  constructor(private user:UserService,private giftListService:GiftListService) {
      this.getAll();
  }

  ngOnInit() {
  }

  async onSubmit(){
    //   console.log(this.data);
      
      await this.giftListService.save(this.data);
      this.data={};
      this.getAll();
  }

  async getAll(){
      this.giftLists = await this.giftListService.getAll();
      console.log(this.giftLists);
  }

  async delete(list){
      await this.giftListService.delete(list.id);
      this.getAll();
  }

}
