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
  dept:any = [];
  role:any = [];
  node:any = [];

  getRoleData() {
    this.roleList = [];
    this.GetList.getRoleList().catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res=>{
      res.role_list.forEach((x,i) => {
        let p = {label:"",value:""};
        p.label = x.name;
        p.value = x.id;
        this.roleList.push(p);
      });
    });
  }
  getNodeData() {
    this.nodeList = [];
    this.GetList.getNodeList().catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res=>{
      res.nodeList.forEach((x,i) => {
        let p = {label:"",value:""};
        p.label = x.name;
        p.value = x.id;
        this.nodeList.push(p);
      });
    });
  }
  getDeptData() {
    this.deptList = [];
    this.GetList.getDeptList().catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res=>{
      res.department_list.forEach((x,i) => {
        let p = {label:"",value:""};
        p.label = x.name;
        p.value = x.id;
        this.deptList.push(p);
      });
    });
  }
  getChack() {
    this.node = [];
    let postList = {
      department:this.getDepart.department.id,
      role:this.getDepart.role.id
    }
    this.GetList.jdsqGetCheck(postList).catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res=>{
      res.forEach((x,i) => {
        this.node.push(x.id);
      });
    })
  }
  getDepart:any = {};
  public jdsqsetShow(data):void {
    this.dept = [];this.role = [];
    this.getDepart = {};
    this.getDepart = Object.assign({},data);
    this.dept.push(this.getDepart.department.id);
    this.role.push(this.getDepart.role.id);
    this.childModal.show();
    this.getRoleData();
    this.getNodeData();
    this.getDeptData();
    this.getChack();
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
    postData.nodes = this.node;
    this.PostService.jdsqSet(postData,this.dept[0],this.role[0]).catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res=>{
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:"流程节点设置成功"}];
      this.jdsqsetHide();
    })
  }
}
