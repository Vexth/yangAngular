import {Component, OnInit, Inject, ViewChild ,Injectable} from '@angular/core';
import { ModalformComponent } from '../../../common/component/modalform/modalform.component';

import { Auxiliary } from '../../../common/constants/auxiliary';
import { Message,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { jdwhaddComponent } from './jdwhAdd/jdwhAdd.component';
import { jdwhbjComponent } from './jdwhAdd/jdwhBj.component';

import { JdwhList } from '../../../module/business/getlist';
import { GetList } from '../../services/getlist';

@Component({
  selector: 'app-jdwh',
  templateUrl: './jdwh.component.html',
  styleUrls: ['./jdwh.component.css'],
})
export class JdwhComponent implements OnInit {
  P:JdwhList = new JdwhList();
  private GetList: GetList;

  pageSize:any = 10;
  pageNum:any = 1;
  total:any = 10;

  pageLinks:any;//
  selected: any = {};//表格选中数据
  msgs: Message[] = [];
  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
    this.getFormDataList();
  }
  constructor(private confirmationService: ConfirmationService,@Inject(GetList) getList: GetList) {
    this.GetList = getList;
  }

  //获取列表数据
  name:any;
  isLocked:any = "";
  getFormDataList() {
    let optsData = {
      pageNum:"",pageSize:"",name:"",isLocked:""
    };
    optsData.pageNum = this.pageNum;
    optsData.pageSize = this.pageSize;
    optsData.name = this.name?this.name:"";
    optsData.isLocked = this.isLocked?this.isLocked:"";

    this.GetList.jdwhDataList(optsData).catch(res => {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res => {
      if(res.nodeList) {
        for(let i = 0 ; i < res.nodeList.length; i++) {
          res.nodeList[i]['number'] = "LC"+res.nodeList[i].id;
          if(res.nodeList[i].isLocked == false) {
            res.nodeList[i]['isLockedName'] = '已启用';
          }else{
            res.nodeList[i]['isLockedName'] = '已禁用';
          }
        }
      }
      this.P = res;
      this.pageSize = res.pageSize;
      this.pageNum = res.pageNum;
      this.total = res.totalCount;
      console.log(res);
    });
  }
  paginate(event){
    this.pageSize = event.rows;
    this.pageNum = event.page + 1;
    this.getFormDataList();
  }

  // ===========================
  public jdwhAddChange():void{
    this.clearOpts();
  }
  public jdwhBJChange():void{
    this.clearOpts();
  }

  // 搜索
  refresh() {
    console.log(!!this.P.isLocked);
    this.getFormDataList();
  }
  // 重置
  clearOpts() {
    this.name = "";this.isLocked = "";
    this.selected = {};
    this.getFormDataList();
  }

  //新增
  @ViewChild('jdwhAdd') public jdwhAdd:jdwhaddComponent;
  add():void {
    this.jdwhAdd.jdwhaddShow();
  }

  //编辑
  @ViewChild('jdwhBj') public jdwhBj:jdwhbjComponent;
  edit() {
    if(!this.selected||!this.selected.id) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请选择需要编辑的数据"}];
      return;
    }
    this.jdwhBj.jdwhbjShow(this.selected);
  }
}