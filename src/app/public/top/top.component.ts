import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EventNameService } from '../../business/services/communication.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  name: string = '';
  
  constructor(private router: Router, public eventNameService: EventNameService) { }

  ngOnInit() {
    this.eventNameService.eventName.subscribe((value)=>{
      this.name = value;
    });
    if(!this.name) {
      this.name = sessionStorage.getItem('name');
    }
  }

  onClick_logout() {
    sessionStorage.removeItem('key');
    sessionStorage.removeItem('vexth');
    sessionStorage.removeItem("keyName");
    history.go(0);
    // this.router.navigate(['/']);
  }

}
