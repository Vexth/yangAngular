import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick_logout() {
    sessionStorage.removeItem('key');
    sessionStorage.removeItem('vexth');
    history.go(0);
    // this.router.navigate(['/']);
  }

}
