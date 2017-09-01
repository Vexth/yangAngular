import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'mbwh-add',
  templateUrl: './mbwhadd.component.html',
  styleUrls: ['./mbwhadd.component.css']
})

export class mbwhaddComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;

  comId:string = '';//单选下拉框
  comIdList:any = [
    {id: 1, name: '公司A'},
    {id: 2, name: '公司B'},
    {id: 3, name: '公司C'},
    {id: 4, name: '公司D'},
    {id: 5, name: '公司E'},
    {id: 6, name: '公司F'},
  ];

  ngOnInit() {

  }

  public mbwhaddShow():void {
    this.childModal.show();
  }

  public mbwhaddHide():void {
    this.childModal.hide();
  }
}
