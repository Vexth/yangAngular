import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  @Input() xmName: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.xmName = sessionStorage.getItem("keyName");
  }

  onClick_logout() {
    sessionStorage.removeItem('key');
    sessionStorage.removeItem('vexth');
    sessionStorage.removeItem("keyName");
    history.go(0);
    // this.router.navigate(['/']);
  }

}
