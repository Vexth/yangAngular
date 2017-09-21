import { Component, OnInit, Inject, Output, ViewChild ,Injectable, EventEmitter} from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';
import { FormsModule } from '@angular/forms';

import { Message,ConfirmationService } from 'primeng/primeng';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';

import { PostService } from '../../../services/post.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'jdwh-add',
  templateUrl: './jdwhAdd.component.html',
  styleUrls: ['./jdwhAdd.component.css']
})

export class jdwhaddComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  private PostService: PostService;
  isLocked:any = 'false';
  statement:any;
  name:any;
  msgs: Message[] = [];
  constructor(@Inject(PostService) postService: PostService) {
    this.PostService = postService;
  }

  ngOnInit() {

  }
  
  public jdwhaddShow():void {
    this.childModal.show();
  }

  public jdwhaddHide():void {
    this.childModal.hide();
    this.isLocked = 'false';
    this.statement = "";
    this.name = "";
  }
  
  @Output()
  public jdwhAddData=new EventEmitter<string>();

  public emitjdwhAdd(event):void {
    let addData = {
      name:"",isLocked:false,statement:""
    }
    if(!this.name) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请输入流程节点"}];
      return;
    }
    addData.name = this.name;
    if(this.isLocked=='false') {
      addData.isLocked = false;
    }else{
      addData.isLocked = true;
    }
    addData.statement = this.statement;
    this.PostService.jdwhAdd(addData).then(res => {
      this.jdwhAddData.emit("jdwhAddData");
      this.jdwhaddHide();
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:"新增流程节点成功"}];
    }).catch(res => {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    });
  }
}
