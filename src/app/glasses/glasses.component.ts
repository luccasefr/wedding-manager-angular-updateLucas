import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-glasses',
  templateUrl: './glasses.component.html',
  styleUrls: ['./glasses.component.css']
})
export class GlassesComponent implements OnInit {

  constructor(private user:UserService) { }

  ngOnInit() {
  }

}
