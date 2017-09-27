import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';
import { Message,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { PostService } from '../../../services/post.service';
@Component({
  selector: 'cpwh-pladd',
  templateUrl: './cpwhpladd.component.html',
  styleUrls: ['./cpwhpladd.component.css']
})

export class cpwhpladdComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  private PostService: PostService;
  constructor(@Inject(PostService) postService: PostService) {
    this.PostService = postService;
  }
  msgs: Message[] = [];
  data:any = {};
  typeName:string = "";
  quantity:string = "";
  ngOnInit() {

  }

  @Output()
  public cpwhAddPL=new EventEmitter<string>();

  public emitCpwhPLadd(event):void {
    if(!this.quantity || +this.quantity===0){
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请输入稿件数量"}];
      return;
    }
    if(!this.typeName){
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请选择类别"}];
      return;
    }
    let postData = {nameList:[],pid:""}
    for(let k = 1; k < +this.quantity+1; k++){
      postData.nameList.push(k+this.typeName);
    }
    postData.pid = this.data.data.documentId;
    this.PostService.cpwhGJAdd(postData).catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res=>{
      this.cpwhAddPL.emit("cpwhAddPL");
      this.cpwhgjaddHide();
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:'新增稿件成功'}];
    })
  }

  public cpwhgjaddShow(data):void {
    this.childModal.show();
    this.data = data;
  }

  public cpwhgjaddHide():void {
    this.childModal.hide();
    this.data = {};
    this.typeName = "";
    this. quantity = "";
  }
}
