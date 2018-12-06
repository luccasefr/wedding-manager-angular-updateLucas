import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { environment } from '../environments/environment';

@Injectable()
export class UserService {
    name_1:string;
    name_2:string;
    publications_should_be_aproved;
    expenses_total;
    gift_lists;
    memory_game_released;
    puzzle_released;
    quiz_released;
    waiting_guests;
    want_to_spent;
    wedding_address_id;
    wedding_date;
    address;
    created_at;

  constructor(private http:CustomHttpService, private httpCustom:CustomHttpService) {
      this.name_1 = localStorage.getItem('name_1');
      this.name_2 = localStorage.getItem('name_2');
      this.publications_should_be_aproved = localStorage.getItem('publications_should_be_aproved');
      this.expenses_total = localStorage.getItem('expenses_total');
      this.gift_lists = localStorage.getItem('gift_lists');
      this.memory_game_released = localStorage.getItem('memory_game_released');
      this.puzzle_released = localStorage.getItem('puzzle_released');
      this.quiz_released = localStorage.getItem('quiz_released');
      this.waiting_guests = localStorage.getItem('waiting_guests');
      this.want_to_spent = localStorage.getItem('want_to_spent');
      this.wedding_address_id = localStorage.getItem('wedding_address_id');
      this.wedding_date = localStorage.getItem('wedding_date');
      this.address = JSON.parse(localStorage.getItem('address'));
      this.created_at = localStorage.getItem('created_at');
  }

  //Incluido depois
  getAll():Promise<any>{
    return new Promise((resolve,reject)=>{
        this.httpCustom.get(environment.apiUrl+'api/user').then((response)=>{
            resolve(response);
        }).catch((err)=>{
            reject(err);
        });
    });
}

  clear(){
      this.name_1 = undefined;
      this.name_2 = undefined;
      this.publications_should_be_aproved = undefined;
      this.expenses_total = undefined;
      this.gift_lists = undefined;
      this.memory_game_released = undefined;
      this.puzzle_released = undefined;
      this.quiz_released = undefined;
      this.waiting_guests = undefined;
      this.want_to_spent = undefined;
      this.wedding_address_id = undefined;
      this.wedding_date = undefined;
      this.address = undefined;
      this.created_at = undefined;

      localStorage.removeItem('name_1');
      localStorage.removeItem('address');
      localStorage.removeItem('name_2');
      localStorage.removeItem('publications_should_be_aproved');
      localStorage.removeItem('expenses_total');
      localStorage.removeItem('gift_lists');
      localStorage.removeItem('memory_game_released');
      localStorage.removeItem('puzzle_released');
      localStorage.removeItem('quiz_released');
      localStorage.removeItem('waiting_guests');
      localStorage.removeItem('want_to_spent');
      localStorage.removeItem('wedding_address_id');
      localStorage.removeItem('wedding_date');
      localStorage.removeItem('created_at')
      console.log('cleared');
  }

  actualize():Promise<any>{
      return new Promise((res,rej)=>{
          this.http.get(environment.apiUrl+'api/user').then(
              (response:any)=>{
                  console.log(response)
                  localStorage.setItem('name_1',response.name_1);
                  localStorage.setItem('name_2',response.name_2);
                  localStorage.setItem('publications_should_be_aproved',response.publications_should_be_aproved);
                  localStorage.setItem('expenses_total',response.expenses_total);
                  localStorage.setItem('gift_lists',JSON.stringify(response.gift_lists));
                  localStorage.setItem('memory_game_released',response.memory_game_released);
                  localStorage.setItem('puzzle_released',response.puzzle_released);
                  localStorage.setItem('quiz_released',response.quiz_released);
                  localStorage.setItem('waiting_guests',response.waiting_guests);
                  localStorage.setItem('want_to_spent',response.want_to_spent==null ? '' : this.want_to_spent);
                  localStorage.setItem('wedding_address_id',response.wedding_address_id==null ? '' : this.wedding_address_id);
                  localStorage.setItem('wedding_date',response.wedding_date);
                  localStorage.setItem('created_at',response.created_at);
                  localStorage.setItem('address',response.address == null ? JSON.stringify({}) : JSON.stringify(response.address));
                  this.address = response.address == null ? JSON.stringify({}) : JSON.stringify(response.address);
                  this.name_1 = response.name_1;
                  this.name_2 = response.name_2;
                  this.publications_should_be_aproved = response.publications_should_be_aproved;
                  this.expenses_total = response.expenses_total;
                  this.gift_lists = response.gift_lists;
                  this.memory_game_released = response.memory_game_released;
                  this.puzzle_released = response.puzzle_released;
                  this.quiz_released = response.quiz_released;
                  this.waiting_guests = response.waiting_guests;
                  this.want_to_spent = response.want_to_spent;
                  this.wedding_address_id = response.wedding_address_id;
                  this.wedding_date = response.wedding_date;
                  this.created_at = response.created_at;
                  res(response);
              }
          ).catch((err)=>{
              rej(err);
          });
      });
  }

  updateUser(data):Promise<any>{
      return new Promise((res,rej)=>{
          this.http.post(environment.apiUrl+'api/user',data).then((response)=>{
              this.actualize();
              res(response);
          }).catch((err)=>{
              rej(err);
          })
      });
  }
}
