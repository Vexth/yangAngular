import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';
import { Message} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { PostService } from '../../../services/post.service';

@Component({
  selector: 'jsfp-add',
  templateUrl: './jsfpAdd.component.html',
  styleUrls: ['./jsfpAdd.component.css']
})

export class jsfpaddComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  private PostService: PostService;
  postName:string = "";
  msgs: Message[] = [];
  constructor(@Inject(PostService) postService: PostService) {
    this.PostService = postService;
  }
  ngOnInit() {

  }

  @Output()
  public follow=new EventEmitter<string>();

  public emitAnEvent(event):void{
    if(!this.postName) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请输入新增角色名称"}];
      return;
    }
    this.PostService.jsfpAdd(this.postName).then(res=>{
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:"新增角色成功"}];
      this.follow.emit("follow");
      this.jsfpaddHide();
    }).catch(res=>{
      // res = res.json();
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    });
  }

  public jsfpaddShow():void {
    this.childModal.show();
  }

  public jsfpaddHide():void {
    this.childModal.hide();
    this.postName = "";
  }
}
