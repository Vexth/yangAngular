import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';
import { Message,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';

import { GetList } from '../../../services/getlist';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'mbwh-change',
  templateUrl: './mbwhchange.component.html',
  styleUrls: ['./mbwhchange.component.css']
})

export class mbwhchangeComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  private GetList:GetList;
  private PostService: PostService;
  msgs: Message[] = [];
  optTypeList:any = [];
  modelName:string = "";
  dataId:string = "";
  postData:any = {
    departmentId:"",departmentName:"",isBaned:"",isPagenum:"",name:"",statement:"",type:"",workloads:[],nodeworkloads:[]
  }
  constructor(@Inject(GetList) getList: GetList,@Inject(PostService) postService: PostService) {
    this.GetList = getList;this.PostService = postService;
  }

  ngOnInit() {

  }

  deptchange() {
    this.GetList.mbwhEditModel(this.dataId).catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res}];
      return;
    }).then(res=>{
      if(+res.isBaned===1){res.isBaned="true";}else{res.isBaned="false";}
      if(+res.isPagenum===1){res.isPagenum="true";}else{res.isPagenum="false";}
      this.postData = res;
      console.log(this.postData);
    })
  }

  public mbwhchangeShow(data,selected):void {
    this.childModal.show();
    this.optTypeList = data.optType;
    this.modelName = selected[0].code;
    this.dataId = selected[0].id;
    this.deptchange();
    console.log(selected);
  }

  public mbwhchangeHide():void {
    this.childModal.hide();
    this.postData = {
      departmentId:"",departmentName:"",isBaned:"",isPagenum:"",name:"",statement:"",type:"",workloads:[],nodeworkloads:[]
    }
  }

  @Output()
  public mbwhEdit=new EventEmitter<string>();

  public emitmbwhEdit(event):void {
    if(this.postData.name.trim().length === 0||!this.postData.type) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"带‘*’号为必填项，请填写完整后再提交"}];
      return;
    }
    this.postData.workloads = this.postData.nodeworkloads;
    this.PostService.mbwhEdit(this.postData,this.dataId).catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res}];
      return;
    }).then(res=>{
      this.mbwhEdit.emit("mbwhEdit");
      this.mbwhchangeHide();
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:"修改工作量模板成功"}];
    })
  }
}
