import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';
import { Message,ConfirmationService } from 'primeng/primeng';

import { PostService } from '../../../services/post.service';
import { GetList } from '../../../services/getlist';

@Component({
  selector: 'jdwh-bj',
  templateUrl: './jdwhBj.component.html',
  styleUrls: ['./jdwhAdd.component.css']
})

export class jdwhbjComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  private PostService: PostService;
  private GetList: GetList;
  msgs: Message[] = [];
  number:string;
  name:string;
  isLocked:string;
  statement:string;
  id:number;
  constructor(@Inject(PostService) postService: PostService,@Inject(PostService) getList: GetList) {
    this.PostService = postService;
    this.GetList = getList;
  }  

  ngOnInit() {

  }

  openModal($event){
    console.log(this);
  }

  public jdwhbjShow(data):void {
    this.childModal.show();
    this.id = data.id;
    this.number = data.number;
    this.name = data.name;
    this.isLocked = ''+data.isLocked;
    this.statement = data.statement;
  }

  public jdwhbjHide():void {
    this.childModal.hide();
    this.number = "";
    this.name = "";
    this.isLocked = "";
    this.statement = "";
  }

  @Output()
  public jdwhBJData=new EventEmitter<string>();

  public emitjdwhBJ(event):void {
    let addData = {
      name:"",isLocked:false,statement:"",id:0,lc:""
    }
    if(!this.name) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请输入流程节点"}];
      return;
    }
    if(this.isLocked == "true") {
      addData.isLocked = true;
    }else{
      addData.isLocked = false;
    }
    addData.name = this.name;
    addData.statement = this.statement;
    addData.id = this.id;
    addData.lc = this.number;
    this.PostService.jdwhBj(addData,this.id).then(res => {
      this.jdwhBJData.emit("jdwhBJData");
      this.jdwhbjHide();
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:"修改流程节点成功"}];
    }).catch(res => {
      // res = res.json();
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    });
  }
}
