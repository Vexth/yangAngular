import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/of';

import { Car } from './cars';
import 'rxjs/add/operator/toPromise';
import { Header } from 'primeng/primeng';
import { Footer } from 'primeng/primeng';
import { TreeNode, Message, MenuItem } from 'primeng/primeng';

import { Auxiliary } from '../../../common/constants/auxiliary';

@Component({
  selector: 'app-m4v2',
  templateUrl: './m4v2.component.html',
  styleUrls: ['./m4v2.component.css']
})
export class M4v2Component implements OnInit {

  public selected: string;
  public states: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
    'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico',
    'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];
  car: any[] = [
    {
      "vin": "683535b8",
      "brand": "Renault",
      "year": 2003,
      "color": "White"
    },
    {
      "vin": "62e5d216",
      "brand": "Audi",
      "year": 1962,
      "color": "Orange"
    },
    {
      "vin": "16a65b56",
      "brand": "Jaguar",
      "year": 2009,
      "color": "Blue"
    },
    {
      "vin": "d00250a3",
      "brand": "BMW",
      "year": 1978,
      "color": "Blue"
    },
    {
      "vin": "f3c3909d",
      "brand": "Renault",
      "year": 2003,
      "color": "Green"
    }
  ]
  msgs: Message[];

  cars: Car[];

  selectedCar3: Car;

  selectedCars3: Car[];
  

  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
    this.cars = this.car;
  }

  // onRowSelect(event) {
  //   this.msgs = [];
  //   console.log(event);
  //   this.msgs.push({ severity: 'info', summary: 'Car Selected', detail: event.data.vin + ' - ' + event.data.brand });
  // }

  // onRowUnselect(event) {
  //   this.msgs = [];
  //   console.log(event);
  //   this.msgs.push({ severity: 'info', summary: 'Car Unselected', detail: event.data.vin + ' - ' + event.data.brand });
  // }

}
