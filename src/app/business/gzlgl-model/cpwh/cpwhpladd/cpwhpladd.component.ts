import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'cpwh-pladd',
  templateUrl: './cpwhpladd.component.html',
  styleUrls: ['./cpwhpladd.component.css']
})

export class cpwhpladdComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;

  comIdList:any = [
    {id: 1, name: '公司A'},
    {id: 2, name: '公司B'},
    {id: 3, name: '公司C'},
    {id: 4, name: '公司D'},
    {id: 5, name: '公司E'},
    {id: 6, name: '公司F'},
  ];
  comId:string = '';//单选下拉框

  ngOnInit() {

  }

  public cpwhgjaddShow():void {
    this.childModal.show();
  }

  public cpwhgjaddHide():void {
    this.childModal.hide();
  }
}
