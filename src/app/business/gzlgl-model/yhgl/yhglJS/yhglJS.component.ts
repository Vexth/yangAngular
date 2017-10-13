import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';
import { Message} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { PostService } from '../../../services/post.service';
import { GetList } from '../../../services/getlist';

@Component({
  selector: 'yhgl-JS',
  templateUrl: './yhglJS.component.html',
  styleUrls: ['../yhgl.component.css']
})

export class yhgljsComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  private PostService: PostService;
  private GetList: GetList;
  msgs: Message[] = [];
  roleList:any = [];
  role:any = [];
  id:any = "";

  constructor(@Inject(PostService) postService: PostService,@Inject(GetList) getList: GetList) {
    this.PostService = postService;this.GetList = getList;
  }
  ngOnInit() {
    this.getRoleList();
  }

  //获取角色列表
  getRoleList() {
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

  public yhglJSShow(data):void {
    this.childModal.show();
    this.role = data.roleIdArr;
    this.id = data.id;
  }

  public yhglJSHide():void {
    this.childModal.hide();
    this.role = [];
    this.id = "";

  }
  @Output()
  public saveJS=new EventEmitter<string>();

  public emitYhglRole(event):void {
    console.log(this.role);
    this.PostService.yhglJS(this.role,this.id).then(res=>{
      this.saveJS.emit("saveJS");
      this.yhglJSHide();
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:"保存成功"}];
    }).catch(res=>{
      // res = res.json();
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    });
  }
   
}
