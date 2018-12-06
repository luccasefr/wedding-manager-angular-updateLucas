import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    @Input() actualRoute;
    routes=[
        {name:'Home',route:'/home',bg:true},
        {name:'Informações dos Noivos',route:'/info',bg:false},
        {name:'Lista de Presentes',route:'/gift-list',bg:false},
        {name:'Ações',route:'/actions',bg:false},
        {name:'Convite',route:'/invite',bg:false},
        {name:'Convidados',route:'/guests',bg:true},
        {name:'Mural',route:'/posts',bg:false},
        {name:'Playlist',route:'/playlist',bg:false},
        {name:'Eventos',route:'/events',bg:false},
        {name:'Games',route:'/games',bg:false},
        {name:'Doação da Gravata',route:'/tie',bg:false},
        {name:'Óculos 360',route:'/glasses',bg:false},
        {name:'Fotos com os Noivos',route:'/photos',bg:false}
    ]

    constructor(private router:Router) {

    }

    ngOnInit() {
        if(this.actualRoute){
            this.routes.forEach((item)=>{
                if(item.route==this.actualRoute){
                    item.bg = true;
                }
            });
        }
    }
}
