import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { Message,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { GetList } from '../../../services/getlist';
import { PostService } from '../../../services/post.service';
@Component({
  selector: 'jdsq-set',
  templateUrl: './jdsqSet.component.html',
  styleUrls: ['./jdsqSet.component.css']
})

export class JdsqsetComponent implements OnInit {
  private GetList: GetList;
  private PostService: PostService;
  @ViewChild('childModal') public childModal:ModalDirective;
  typeName:string = '';
  msgs: Message[] = [];
  constructor(@Inject(GetList) getList: GetList,@Inject(PostService) postService: PostService) {
    this.GetList = getList;this.PostService = postService;
  }
  ngOnInit() {
    
  }
  roleList:any = [];
  nodeList:any = [];
  deptList:any = [];
  dept:any = "";
  role:any = "";
  node:any = [];

  getRoleData() {
    this.roleList = [];
    this.GetList.getRoleList().then(res=>{
      if(!res.code) {
        res.role_list.forEach((x,i) => {
          let p = {label:"",value:""};
          p.label = x.name;
          p.value = x.id;
          this.roleList.push(p);
        });
      }else{
        this.msgs = [];
        this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
        return;
      }
    });
  }
  getNodeData() {
    this.nodeList = [];
    this.GetList.getNodeList().then(res=>{
      if(!res.code) {
        res.nodeList.forEach((x,i) => {
          if(x.isLocked !== true) {
            let p = {label:"",value:""};
            p.label = x.name;
            p.value = x.id;
            this.nodeList.push(p);
          }
        });
      }else{
        this.msgs = [];
        this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
        return;
      }
    });
  }
  getDeptData() {
    this.deptList = [];
    this.GetList.getDeptList().then(res=>{
      if(!res.code) {
        res.department_list.forEach((x,i) => {
          let p = {label:"",value:""};
          p.label = x.name;
          p.value = x.id;
          this.deptList.push(p);
        });
      }else{
        this.msgs = [];
        this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
        return;
      }
    });
  }
  getChack() {
    this.node = [];
    let postList = {
      department:this.getDepart.department.id,
      role:this.getDepart.role.id
    }
    this.GetList.jdsqGetCheck(postList).then(res=>{
      if(!res.code) {
        res.forEach((x,i) => {
          this.node.push(x.id);
        });
      }else{
        this.msgs = [];
        this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
        return;
      }
    });
  }
  getDepart:any = {};
  public jdsqsetShow(data):void {
    this.dept = "";this.role = "";
    this.getDepart = {};
    
    console.log(data);
    if(data.id){
      this.getDepart = Object.assign({},data);
      this.dept=this.getDepart.department.id;
      this.role=this.getDepart.role.id;
      this.getChack();
    }
    this.childModal.show();
    this.getRoleData();
    this.getNodeData();
    this.getDeptData();
  }

  public jdsqsetHide():void {
    this.childModal.hide();
    this.typeName = "";this.nodeList = [];this.deptList = [];
    this.roleList = [];this.dept = [];this.role = [];this.node = [];
  }

  @Output()
  public jdsqSaveChange=new EventEmitter<string>();

  public emitjdsqSet(event):void {
    let postData = {
      nodes:[]
    }
    if(!this.node||!this.dept||!this.role) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请在每个框内至少选择一项"}];
      return;
    }
    postData.nodes = this.node;
    this.PostService.jdsqSet(postData,this.dept,this.role).then(res=>{
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:"流程节点设置成功"}];
      this.jdsqSaveChange.emit();
      this.jdsqsetHide();
    }).catch(res=>{
      // res = res.json();
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    });
  }
}
