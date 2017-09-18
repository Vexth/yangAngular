import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';
import { Message,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { PostService } from '../../../services/post.service';

@Component({
  selector: 'cpwh-gjadd',
  templateUrl: './cpwhgjadd.component.html',
  styleUrls: ['./cpwhgjadd.component.css']
})

export class cpwhgjaddComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  private PostService: PostService;
  name:string = "";
  CPWHgjfl:string = "";
  msgs: Message[] = [];
  pid:string = "";
  constructor(@Inject(PostService) postService: PostService) {
    this.PostService = postService;
  }

  ngOnInit() {

  }

  @Output()
  public cpwhAddGJ=new EventEmitter<string>();

  public emitCpwhGJadd(event):void {
    let postData = {
      nameList:[],pid:""
    }
    postData.nameList.push(this.CPWHgjfl);
    postData.pid = this.pid;
    this.PostService.cpwhGJAdd(postData).catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res=>{
      this.cpwhAddGJ.emit("cpwhAddGJ");
      this.cpwhGJHide();
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:'新增稿件成功'}];

    })
    
  }

  public cpwhGJShow(data):void {
    this.childModal.show();
    console.log(data);
    this.name = data.name;
    this.pid = data.document.documentId;
  }

  public cpwhGJHide():void {
    this.childModal.hide();
    this.CPWHgjfl = "";
  }
}
