import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js'

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {

  LineChart = [];

  constructor() { }

  ngOnInit() {
  }

}
