import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import {CalendarModule,DataTableModule,SharedModule} from 'primeng/primeng';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'jsfp-add',
  templateUrl: './jsfpAdd.component.html',
  styleUrls: ['./jsfpAdd.component.css']
})

export class jsfpaddComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  typeName:string = '';
  ngOnInit() {

  }

  public jsfpaddShow(typeName):void {
    this.typeName = typeName;
    console.log(this.typeName);
    this.childModal.show();
  }

  public jsfpaddHide():void {
    this.childModal.hide();
  }
}
