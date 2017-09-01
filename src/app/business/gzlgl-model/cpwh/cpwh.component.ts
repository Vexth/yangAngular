import {Component, OnInit, Inject, ViewChild ,Injectable} from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';//弹出层
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';//弹出层
import { cpwhcpaddComponent } from './cpwhAdd/cpwhadd.component';//新增产品
import { cpwhgjaddComponent } from './cpwhGjAdd/cpwhgjadd.component';//新增稿件
import { cpwhpladdComponent } from './cpwhpladd/cpwhpladd.component';//批量新增稿件

// import { GrowlModule,Message,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框
import { Message,ConfirmationService} from '../../../../../primeng/primeng';//右上角提示框组件，删除对话框
/*import {TreeTableModule,TreeNode,SharedModule,Message,MenuItem} from 'primeng/primeng';*/
import { GetList } from '../../services/getlist';

import { Auxiliary } from '../../../common/constants/auxiliary';

//公共list
import { CpwhList } from '../../../module/business/getlist';
 
@Component({
  selector: 'app-cpwh',
  templateUrl: './cpwh.component.html',
  styleUrls: ['./cpwh.component.css'],
})

export class CpwhComponent implements OnInit {
  private GetList: GetList;
  page:number = 1;
  size:number = 10;
  isadSearch:number = 0;//判断是否展示高级搜索模块
  optsList:any = []//搜索集合
  

  public dataList:any;//表格数据data

  constructor(
    private confirmationService: ConfirmationService,
    @Inject(GetList) getList: GetList
  ) {
    this.GetList = getList;
  }
 
  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
    this.getDataList();
    this.GetList.cpwhadd().then(res => this.optsList = res);
  }

  getDataList() {
    this.GetList.cpwhList(this.page,this.size).catch(res => {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res => {
      console.log(res.products.content);
      this.dataList = res.products.content;
      console.log(this.dataList);
    });
  }

  // ===========================
  // 搜索
  refresh() {
    console.log("a");
    console.log(this.optsList);
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
//新增产品
  @ViewChild('cpwhcpadd') public cpwhcpadd:cpwhcpaddComponent;
  addcp():void {
    this.cpwhcpadd.cpwhcpaddShow();
  }


  //新增稿件
  @ViewChild('cpwhgjadd') public cpwhgjadd:cpwhgjaddComponent;
  addgj():void {
    this.cpwhgjadd.showChildModal();
  }

  //批量新增稿件
  @ViewChild('cpwhpladd') public cpwhpladd:cpwhpladdComponent;
  pladd():void {
    this.cpwhpladd.cpwhgjaddShow();
  }

  //删除
  msgs: Message[] = [];
  delete() {
    // this.msgs = [];
    // this.msgs.push({severity:'error', summary:'Error Message', detail:'Validation failed'});
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

  disabled: boolean = true;//判断产品II类是否可选中
  // optKind1IdChange() {
  //   if(this.optKind1Id.length != 0) {this.disabled = false;}else{
  //     this.disabled = true;
  //     this.optKind2Id = "";
  //   }
  // }
}