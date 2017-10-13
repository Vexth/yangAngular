import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';
import { Message} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { PostService } from '../../../services/post.service';
import { GetList } from '../../../services/getlist';

@Component({
  selector: 'jsfp-war',
  templateUrl: './jsfpWar.component.html',
  styleUrls: ['./jsfpAdd.component.css']
})

export class jsfpwarComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  private PostService: PostService;
  private GetList: GetList;
  msgs: Message[] = [];
  viewListL:any = [];
  forRitId:number;
  nodeList: any = [];
  node:any = [];
  selected:any= {};
  constructor(@Inject(PostService) postService: PostService,@Inject(GetList) getList: GetList) {
    this.PostService = postService;this.GetList = getList;
  }
  ngOnInit() {
    
  }
  //获取左侧数据
  getViewList() {
    this.viewListL = [];
    this.GetList.jsfpWarLeft().then(res=>{
      if(!res.code) {
        res.viewlist.forEach((x,i) => {
          x['lable'] = x.name;
          x['data'] = x.id;
        });
        this.viewListL = res.viewlist;
      }else{
        this.msgs = [];
        this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
        return;
      }
    });
  }

  public jsfpwarShow(id):void {
    this.childModal.show();
    this.getViewList();
    this.forRitId = id;//角色ID
  }

  public jsfpwarHide():void {
    this.childModal.hide();
    this.viewListL = [];this.nodeList = [];this.node = [];this.selected = [];
  }

  nodeSelect(event) {
    this.nodeList = [];
    this.node = [];
    console.log(this.forRitId);
    console.log(this.selected);
    this.GetList.jsfpWarRight(this.selected.id,this.forRitId).then(res=>{
      if(!res.code) {
        res.authlist.forEach((x,i) => {
          let p = {label:"",value:""};
          p.label = x.name.split('?')[0];
          p.value = x.id;
          this.nodeList.push(p);
        });
        this.node = res.checklist;
      }else{
        this.msgs = [];
        this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
        return;
      }
    });
  }
  save() {
    let postData = {
      authIdList:this.node
    }
    this.PostService.jsfpWar(postData,this.selected.id,this.forRitId).then(res=>{
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:"授权保存成功"}];
      this.jsfpwarHide();
    }).catch(res=>{
      // res = res.json();
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    });
  }
}
