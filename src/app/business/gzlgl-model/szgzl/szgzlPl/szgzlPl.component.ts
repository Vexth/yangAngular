import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';
import { Message,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';

import { GetList } from '../../../services/getlist';
import { PostService } from '../../../services/post.service';
@Component({
  selector: 'szgzl-pl',
  templateUrl: './szgzlPl.component.html',
  styleUrls: ['./szgzlPl.component.css']
})

export class szgzlplComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  private GetList: GetList;
  private PostService: PostService;
  data:any;
  msgs: Message[] = [];
  nodeList:any = [];
  selectList:any = [];
  modelId:any = "";
  checkArr:any = [];
  constructor(@Inject(PostService) postService: PostService,@Inject(GetList) getList: GetList) {
    this.PostService = postService;this.GetList = getList;
  }
  ngOnInit() {

  }
  //获取列表
  getListsz() {
    this.GetList.szgzlSetPL(this.data).then(res=>{
      if(!res.code) {
        this.nodeList = res.nodeList;
        this.selectList = res.templateList;
      }else{
        this.msgs = [];
        this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
        return;
      }
    }); 
  }

  public szgzlplShow(data,checkList):void {
    this.childModal.show();
    this.data = data;
    this.checkArr = checkList;
    this.getListsz();
  }

  public szgzlplHide():void {
    this.modelId = "";
    // this.nodeList = [];
    this.childModal.hide();
  }

  modelChange() {
    console.log(this.modelId);
    if(!this.modelId) {
      return;
    }else{
      this.GetList.szgzlSetModel(this.modelId).then(res=>{
        if(!res.code) {
          this.nodeList = res.nodeList;
        }else{
          this.msgs = [];
          this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
          return;
        }
      });
    }
  }

  @Output()
  public saveChangeModel=new EventEmitter<string>();

  public emitszgzlPl(event):void {
    if(!this.modelId) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请选择工作量模板"}];
      return;
    }
    let postData = {
      docIdList:this.checkArr,templateId:this.modelId
    }
    this.PostService.szgzlPlSetSave(postData).then(res=>{
      this.saveChangeModel.emit("saveChangeModel");
      this.szgzlplHide();
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:"工作量批量保存成功"}];
    }).catch(res=>{
      // res = res.json();
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    });
  }



}
