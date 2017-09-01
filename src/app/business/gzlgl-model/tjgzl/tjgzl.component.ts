import {Component, OnInit, Inject, ViewChild ,Injectable} from '@angular/core';

import {CalendarModule,DataTableModule,SharedModule} from 'primeng/primeng';
import { Auxiliary } from '../../../common/constants/auxiliary';

import { tjgzlcxComponent } from './tjgzlCx/tjgzlCx.component';

@Component({
  selector: 'app-tjgzl',
  templateUrl: './tjgzl.component.html',
  styleUrls: ['./tjgzl.component.css'],
})
export class TjgzlComponent implements OnInit {
  comIdList:any = [
    {id: 1, name: '公司A'},
    {id: 2, name: '公司B'},
    {id: 3, name: '公司C'},
    {id: 4, name: '公司D'},
    {id: 5, name: '公司E'},
    {id: 6, name: '公司F'},
  ];

  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
  }

 //================
  //查询
  @ViewChild('tjgzlCx') public tjgzlCx:tjgzlcxComponent;
  inquiry():void {
    this.tjgzlCx.tjgzlCxShow();
  }
}