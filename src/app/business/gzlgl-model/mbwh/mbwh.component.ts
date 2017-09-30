import {Component, OnInit, Inject, ViewChild ,Injectable} from '@angular/core';

import { Auxiliary } from '../../../common/constants/auxiliary';
import { Message,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { mbwhaddComponent } from './mbwhAdd/mbwhadd.component';
import { mbwhchangeComponent } from './mbwhChange/mbwhchange.component';

import { GetList } from '../../services/getlist';
import { mbwhDataListV1 } from '../../../module/business/getlist';
import { PostService } from '../../services/post.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-mbwh',
  templateUrl: './mbwh.component.html',
  styleUrls: ['./mbwh.component.css'],
})
export class MbwhComponent implements OnInit {
  private GetList:GetList;
  private PostService: PostService;
  msgs: Message[] = [];
  formDataList: mbwhDataListV1[];
  optsData:any = {
    pageSize:10,pageNum:1,name:"",isBaned:""
  }
  total:any = "";
  selected:any = [];
  createoption:any = {
    nodeList:[],optDepartment:[],optType:[]
  }
  // select(data: mbwhDataListV1){
  //   console.log(data);
  // }
  btnFn: any;
  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
    this.getFormData();
    this.getChildOptionData();
    this._activatedRoute.queryParams.subscribe(queryParams=>{
      this.btnFn = Auxiliary.prototype.queryParamsList(queryParams);
    })
  }
  constructor(
    private _activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    @Inject(GetList) getList: GetList,
    @Inject(PostService) postService: PostService
  ) {
    this.GetList = getList;this.PostService = postService;
  }
  
  //获取页面数据
  getFormData() {
    this.GetList.mbwhDataList(this.optsData).catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res}];
      return;
    }).then(res=>{
      res.list.forEach((x,i) => {
        x["isBanedName"] = x.isBaned == true ? "锁定": "未锁定";
        x["isPagenumName"] = x.isPagenum == true ? "是" : "否";
      });
      this.optsData.pageSize = res.pageSize;
      this.optsData.pageNum = res.pageNum;
      // this.total = res.totalCount;
      if(!this.total) {
        this.total = (+res.pageSize)*(+res.totalPages);
      }
      this.formDataList = res.list;
    })
  }
  paginate(event){
    this.optsData.pageSize = event.rows;
    this.optsData.pageNum = event.page + 1;
    this.getFormData();
  }
  //获取新增时的下拉框数据
  getChildOptionData() {
    this.GetList.mbwhAddDataList().catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res}];
      return;
    }).then(res=>{
      this.createoption = res;
    });
  }

  // ===========================
  // 搜索
  refresh() {
    this.getFormData();
  }
  // 重置
  clearOpts() {
    this.optsData = {pageSize:10,pageNum:1,name:"",isBaned:""}
    this.getFormData();
    this.selected = [];
  }
  //删除
  delete() {
    if(this.selected.length == 0) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请选择要删除的项"}];
      return;
    }
    let deleteArr = [];
    this.selected.forEach((x,i) => {
      deleteArr.push(x.id);
    });
    this.confirmationService.confirm({
      message: '删除后无法恢复！',
      header: '你确定删除吗？',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.PostService.mbwhDelete(deleteArr).catch(res=>{
          this.msgs = [];
          this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
          return;
        }).then(res=>{
          this.clearOpts();
          this.msgs = [{severity:'success', summary:'成功提示', detail:'删除成功'}];
        })
      },
      reject: () => {
          // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
  });
  }
  //新增
  @ViewChild('mbwhadd') public mbwhadd:mbwhaddComponent;
  add():void {
    this.mbwhadd.mbwhaddShow(this.createoption);
  }
  public mbwhaddChange():void{
    console.log("新增");
    this.getFormData();
  }
  //操作
  @ViewChild('mbwhchange') public mbwhchange:mbwhchangeComponent;
  change():void {
    console.log(this.selected);
    if(this.selected.length != 1){
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请选择一条数据进行操作"}];
      return;
    }
    this.mbwhchange.mbwhchangeShow(this.createoption,this.selected);
  }
  public mbwhEditCh():void{
    console.log("修改");
    this.getFormData();
    this.selected = [];
  }

  clickFn(event){
    if (event == '新增') {
      this.add()
    } else if (event == '修改') {
      this.change()
    } else if (event == '删除') {
      this.delete()
    }
  }
}