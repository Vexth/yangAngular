import {Component, OnInit, Inject, ViewChild ,Injectable} from '@angular/core';

import {CalendarModule,DataTableModule,SharedModule,TreeTableModule,TreeNode} from 'primeng/primeng';
import { Auxiliary } from '../../../common/constants/auxiliary';
import { GrowlModule,Message,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { szgzlplComponent } from './szgzlPl/szgzlPl.component';

@Component({
  selector: 'app-szgzl',
  templateUrl: './szgzl.component.html',
  styleUrls: ['./szgzl.component.css'],
})
export class SzgzlComponent implements OnInit {
  comIdList:any = [
    {id: 1, name: '公司A'},
    {id: 2, name: '公司B'},
    {id: 3, name: '公司C'},
    {id: 4, name: '公司D'},
    {id: 5, name: '公司E'},
    {id: 6, name: '公司F'},
  ];
  es: any;
  invalidDates: Array<Date>;
  startData: Date;
  endData: Date;//时间选择组件
  comId:string = '';//单选下拉框
  isadSearch:number = 0;//判断是否展示高级搜索模块

  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
  }
  constructor(private confirmationService: ConfirmationService) {
    
  }

  // ===========================
  // 搜索
  refresh() {
    console.log("a");
  }
  // 高级搜索
  adSearch():void {
    if(this.isadSearch == 0) {
      this.isadSearch = 1;
    }else if(this.isadSearch == 1){
      this.isadSearch = 0;
    }
  }
  // 重置
  clearOpts() {
    console.log("c");
  }
  // 取消
  cancel() {
    this.isadSearch = 0;
  }
  //删除
  /*msgs: Message[] = [];
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
  }*/

  //批量设置
  @ViewChild('szgzlPl') public szgzlPl:szgzlplComponent;
  plSet():void {
    this.szgzlPl.szgzlplShow();
  }

  //保存
  save() {
    console.log("保存");
  }
}