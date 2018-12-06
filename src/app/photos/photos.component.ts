import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  trash = faCalendarAlt;

  constructor(private user:UserService) { }

  ngOnInit() {
  }

}
