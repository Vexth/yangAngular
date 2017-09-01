import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'cpwh-gjadd',
  templateUrl: './cpwhgjadd.component.html',
  styleUrls: ['./cpwhgjadd.component.css']
})

export class cpwhgjaddComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;

  ngOnInit() {

  }

  public showChildModal():void {
    this.childModal.show();
  }

  public hideChildModal():void {
    this.childModal.hide();
  }
}
