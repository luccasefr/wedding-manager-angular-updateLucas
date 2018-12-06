import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PlaylistService } from '../playlist.service';
import { GuestService } from '../guest.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
    songs;
    guests;

  constructor(private user:UserService,private playlistService:PlaylistService, private guestService:GuestService) {
      this.getAll();
  }

  ngOnInit() {
  }

  async getAll(){
      this.songs = await this.playlistService.getAll();
      this.guests = await this.guestService.getAll();
      console.log(this.songs);
      console.log(this.guests);
      
      
      
  }

}
