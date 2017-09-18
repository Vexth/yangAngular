import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';
import { Message} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { PostService } from '../../../services/post.service';

@Component({
  selector: 'jsfp-edit',
  templateUrl: './jsfpEdit.component.html',
  styleUrls: ['./jsfpAdd.component.css']
})

export class jsfpeditComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  private PostService: PostService;
  postName:string;
  msgs: Message[] = [];
  postData: any = {};
  constructor(@Inject(PostService) postService: PostService) {
    this.PostService = postService;
  }
  ngOnInit() {

  }

  @Output()
  public jsfpEditV2=new EventEmitter<string>();

  public emitAnEventEdit(event):void{
    if(!this.postData.name) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请输入角色名称"}];
      return;
    }
    // console.log(this.postData);
    // this.jsfpEditV2.emit("jsfpEditV2");
    this.PostService.jsfpEdit(this.postData.name,this.postData.id).catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res=>{
      this.jsfpEditV2.emit("jsfpEditV2");
      this.jsfpeditHide();
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:"修改角色成功"}];
    })
  }

  public jsfpeditShow(data):void {
    this.childModal.show();
    this.postData = Object.assign({},data);
  }

  public jsfpeditHide():void {
    this.childModal.hide();
    this.postName = "";
    this.postData = {};
  }
}
