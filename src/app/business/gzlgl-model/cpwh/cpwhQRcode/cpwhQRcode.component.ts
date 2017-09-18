import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'cpwh-qrcode',
  templateUrl: './cpwhQRcode.component.html',
  styleUrls: ['./cpwhQRcode.component.css']
})

export class cpwhqrcodeComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  url:any;
  name:any;
  constructor() {
  }
  ngOnInit() {

  }

  public cpwhQrcodeShow(id,name):void {
    this.childModal.show();
    this.url = 'http://ches.jtyjy.com/document/'+ id +'/nodes';
    console.log(this.url);
    this.name = name;
  }

  public cpwhQrcodeHide():void {
    this.childModal.hide();
    this.url = "";
    this.name = "";
  }
}
