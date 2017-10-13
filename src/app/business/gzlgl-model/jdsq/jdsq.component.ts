import {Component, OnInit, Inject, ViewChild ,Injectable} from '@angular/core';

import { Auxiliary } from '../../../common/constants/auxiliary';
import { Message,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { JdsqsetComponent } from './jdsqSet/jdsqSet.component';

import { GetList } from '../../services/getlist';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-jdsq',
  templateUrl: './jdsq.component.html',
  styleUrls: ['./jdsq.component.css'],
})
export class JdsqComponent implements OnInit {
  private GetList: GetList;
  @ViewChild('jdsqSet') public jdsqSet:JdsqsetComponent;

  deptList:any;
  optsList:any = {
    departmentId:"",role:"",node:"",pageNum:"",pageSize:""
  }
  formDataList:any;
  selected:any = {};
  msgs: Message[] = [];
  total:any;
  btnFn: any;
  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
    this.getDept();
    this.getFormData();
    this._activatedRoute.queryParams.subscribe(queryParams=>{
      this.btnFn = Auxiliary.prototype.queryParamsList(queryParams);
    })
  }
  constructor(
    @Inject(GetList) getList: GetList,
    private _activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService) {
    this.GetList = getList;
  }
  //获取部门
  getDept() {
    this.GetList.getDeptList().then(res=>{
      if(!res.code) {
        this.deptList = res.department_list;
      }else{
        this.msgs = [];
        this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
        return;
      }
    });
  }
  //获取页面表格数据
  getFormData() {
    this.GetList.jdsqDataList(this.optsList).then(res=>{
      if(!res.code) {
        this.optsList.pageNum = res.pageNum;
        this.optsList.pageSize = res.pageSize;
        this.total = res.total;
        this.formDataList = res.list;
      }else{
        this.msgs = [];
        this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
        return;
      }
    });
  }
  paginate(event) {
    this.optsList.pageSize = event.rows;
    this.optsList.pageNum = event.page + 1;
    this.getFormData();
  }

  // ===========================
  // 搜索
  refresh() {
    console.log("a");
    this.getFormData();
  }
  // 重置
  clearOpts() {
    this.optsList = {
      departmentId:"",role:"",node:"",pageNum:"1",pageSize:"10"
    }
    this.getFormData();
  }
  //设置
  set() {
    console.log(this.selected);
    this.jdsqSet.jdsqsetShow(this.selected || {});
  }
  public jdsqSaveSet():void{
    console.log("刷新");
    this.getFormData();
  }

  clickFn(event){
    if (event == '设置') {
      this.set()
    } 
  }
}