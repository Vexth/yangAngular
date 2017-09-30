import {Component, OnInit, Inject, ViewChild ,Injectable} from '@angular/core';

import { Auxiliary } from '../../../common/constants/auxiliary';
import { Message,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { jsfpaddComponent } from './jsfpAdd/jsfpAdd.component';
import { jsfpeditComponent } from './jsfpAdd/jsfpEdit.component';
import { jsfpwarComponent } from './jsfpAdd/jsfpWar.component';

import { GetList } from '../../services/getlist';
import { PostService } from '../../services/post.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-jsfp',
  templateUrl: './jsfp.component.html',
  styleUrls: ['./jsfp.component.css'],
})
export class JsfpComponent implements OnInit {
  private GetList:GetList;
  private PostService:PostService;
  msgs: Message[] = [];
  fromDataList:any = [];
  selected:any = [];
  btnFn: any;
  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
    this.getFromData();
    this._activatedRoute.queryParams.subscribe(queryParams=>{
      this.btnFn = Auxiliary.prototype.queryParamsList(queryParams);
    })
  }
  constructor(
    private confirmationService: ConfirmationService,
    @Inject(GetList) getList: GetList,
    private _activatedRoute: ActivatedRoute,
    @Inject(PostService) postService: PostService
  ) {
    this.GetList = getList;this.PostService = postService;
  }

  //获取页面表格数据
  getFromData() {
    this.GetList.jsfpDataList().catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res}];
      return;
    }).then(res=>{
      this.fromDataList = res.role_list;
    });
  }

  public rsfreshChild():void{
    console.log('新增成功');
    this.getFromData();
    this.selected = [];
  }
  public rsfreshChildEdit():void{
    console.log('修改成功');
    this.getFromData();
    this.selected = [];
  }
  public jsfpWarChange():void{
    console.log('修改成功');
    this.getFromData();
    this.selected = [];
  }

  // ===========================
  //设置
  @ViewChild('jsfpAdd') public jsfpAdd:jsfpaddComponent;
  @ViewChild('jsfpEdit') public jsfpEdit:jsfpeditComponent;
  @ViewChild('jsfpWar') public jsfpWar:jsfpwarComponent;
  add() {
    this.jsfpAdd.jsfpaddShow();
  }
  edit() {
    console.log(this.selected);
    if(this.selected.length != 1) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请选择一条进行修改"}];
      return;
    }
    console.log(this.selected);
    this.jsfpEdit.jsfpeditShow(this.selected[0]);
  }
  warrant() {
    if(this.selected.length != 1) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请选择一条进行修改"}];
      return;
    }
    console.log(this.selected);
    this.jsfpWar.jsfpwarShow(this.selected[0].id);
    console.log("授权");
  }
  //删除
  delete() {
    if(this.selected.length == 0){
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
      this.PostService.jsfpDelete(deleteArr).catch(res=>{
        this.msgs = [];
        this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
        return;
      }).then(res=>{
        this.getFromData();
        this.selected = [];
        this.msgs = [];
        this.msgs = [{severity:'success', summary:'成功提示', detail:'删除成功'}];
      });
    },
    reject: () => {
      // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
    }
    });
  }

  clickFn(event){
    if (event == '新建') {
      this.add()
    } else if (event == '修改') {
      this.edit()
    } else if (event == '删除') {
      this.delete()
    } else if (event == '授权') {
      this.warrant()
    }
  }
}