import {Component, OnInit, Inject, ViewChild ,Injectable} from '@angular/core';

import {CalendarModule,DataTableModule,SharedModule,TreeTableModule,TreeNode} from 'primeng/primeng';
import { Auxiliary } from '../../../common/constants/auxiliary';
import { GrowlModule,Message,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { jsfpaddComponent } from './jsfpAdd/jsfpAdd.component';

@Component({
  selector: 'app-jsfp',
  templateUrl: './jsfp.component.html',
  styleUrls: ['./jsfp.component.css'],
})
export class JsfpComponent implements OnInit {
  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
  }
  constructor(private confirmationService: ConfirmationService) {
    
  }

  // ===========================
  //设置
  @ViewChild('jsfpAdd') public jsfpAdd:jsfpaddComponent;
  add() {
    this.jsfpAdd.jsfpaddShow("新增");
  }
  edit() {
    this.jsfpAdd.jsfpaddShow("修改");
  }
  //删除
  msgs: Message[] = [];
  delete() {
    this.confirmationService.confirm({
    message: '删除后无法恢复！',
    header: '你确定删除吗？',
    icon: 'fa fa-question-circle',
    accept: () => {
      this.msgs = [{severity:'success', summary:'成功提示', detail:'删除成功'}];
    },
    reject: () => {
      // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
    }
    });
  }
  warrant() {
    console.log("授权");
  }
}