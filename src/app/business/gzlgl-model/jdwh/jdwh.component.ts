import {Component, OnInit, Inject, ViewChild ,Injectable} from '@angular/core';

import {CalendarModule,DataTableModule,SharedModule,TreeTableModule,TreeNode} from 'primeng/primeng';
import { Auxiliary } from '../../../common/constants/auxiliary';
import { GrowlModule,Message,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { jdwhaddComponent } from './jdwhAdd/jdwhAdd.component';
import { jdwhbjComponent } from './jdwhAdd/jdwhBj.component';

@Component({
  selector: 'app-jdwh',
  templateUrl: './jdwh.component.html',
  styleUrls: ['./jdwh.component.css'],
})
export class JdwhComponent implements OnInit {
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
  // 重置
  clearOpts() {
    console.log("c");
  }

  //新增
  @ViewChild('jdwhAdd') public jdwhAdd:jdwhaddComponent;
  add():void {
    this.jdwhAdd.jdwhaddShow();
  }

  //编辑
  @ViewChild('jdwhBj') public jdwhBj:jdwhbjComponent;
  edit() {
    this.jdwhBj.jdwhbjShow();
  }
}