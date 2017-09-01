import {Component, OnInit, Inject, ViewChild ,Injectable} from '@angular/core';

import {CalendarModule,DataTableModule,SharedModule,TreeTableModule,TreeNode} from 'primeng/primeng';
import { Auxiliary } from '../../../common/constants/auxiliary';
import { GrowlModule,Message,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

@Component({
  selector: 'app-yhgl',
  templateUrl: './yhgl.component.html',
  styleUrls: ['./yhgl.component.css'],
})
export class YhglComponent implements OnInit {
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
  //保存
  role() {
    console.log("保存");
  }
  dept() {
    console.log("保存");
  }
}