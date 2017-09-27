import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';
import { Message} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { PostService } from '../../../services/post.service';
import { GetList } from '../../../services/getlist';

@Component({
  selector: 'yhgl-Dept',
  templateUrl: './yhglDept.component.html',
  styleUrls: ['../yhgl.component.css']
})

export class yhgldeptComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  private PostService: PostService;
  private GetList: GetList;
  msgs: Message[] = [];
  deptList:any = [];
  dept:any = [];
  isDpet:string = "";
  id:string = "";

  constructor(@Inject(PostService) postService: PostService,@Inject(GetList) getList: GetList) {
    this.PostService = postService;this.GetList = getList;
  }
  ngOnInit() {
    
  }
  

  public yhglDeptShow(data,deptData):void {
    this.childModal.show();
    this.deptList = [];this.dept = [];this.isDpet = "";
    // console.log(deptData);
    deptData.forEach((x,i) => {
      let p = {label:"",value:""};
      p.label = x.name;
      p.value = x.id;
      this.deptList.push(p);
    });
    // this.deptList = deptData;
    this.dept = data.departmentIdArr;
    this.isDpet = data.departId;
    this.id = data.id;
    // console.log(this.deptList);
    console.log(event);
  }

  public yhglDeptHide():void {
    this.childModal.hide();
    this.msgs = [];
    this.deptList = [];
    this.dept = [];
    this.isDpet = "";
    this.id = "";
  }
  
  @Output()
  public saveDept=new EventEmitter<string>();

  public emitYhglDept(event):void {
    // console.log(this.role);
    this.PostService.yhglDept(this.dept,this.id).catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res=>{
      this.saveDept.emit("saveDept");
      this.yhglDeptHide();
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:"保存成功"}];
    });
  }

  clickCheck(event) {
    if(this.isDpet && event.value.indexOf(this.isDpet)===-1) {
      this.dept.push(this.isDpet);
    }
  }
}
