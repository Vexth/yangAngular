import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { Header, Footer,ConfirmationService,Message,MenuItem} from 'primeng/primeng';//右上角提示框组件

import { GetList } from '../../../services/getlist';
import { TjgzlList } from '../../../../module/business/getlist';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'tjgzl-cx',
  templateUrl: './tjgzlCx.component.html',
  styleUrls: ['./tjgzlCx.component.css']
})

export class tjgzlcxComponent implements OnInit {
  P:TjgzlList = new TjgzlList();
  private GetList: GetList;
  private PostService: PostService;
  @ViewChild('childModal') public childModal:ModalDirective;
  
  invalidDates: Array<Date>;
  dateFrom: Date;
  dateTo: Date;//时间选择组件
  
  cpyl:boolean = false;cpel:boolean = false;cpmc:boolean = false;lcjd:boolean = false;
  lx:boolean = false;km:boolean = false;jb:boolean = false;bb:boolean = false;
  ry:boolean = false;

  fzsx:string = '';
  fzsxList:any = [];

  kindId1:string = "";
  kindId2:string = "";
  jieId:string = "";
  gradeId:string = "";
  localEditionId:string = "";
  editionId:string = "";
  moduleId:string = "";
  batchId:string = "";
  usageId:string = "";
  typeId:string = "";
  subjectId:string = "";
  productName:string = "";
  userName:string = "";
  nodeId:string = "";
  groupList:any = [];
  msgs: Message[] = [];
  constructor(@Inject(GetList) getList: GetList,@Inject(PostService) postService: PostService) {
    this.GetList = getList;this.PostService = postService;
  }

  optsList:any = []//搜索集合
  ngOnInit() {
    this.GetList.tjgzlOptsList().then(res => this.optsList = res);
  }
  getFormetDate(time:any) {
    const Dates = new Date( time );
    const year: number = Dates.getFullYear();
    const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    // console.log(year + '-' + month + '-' + day);
    return year + '-' + month + '-' + day;
  }

  @Output()
  public tzgzlCx=new EventEmitter<string>();

  public refresh():void {
    console.log("查询");
    if(this.dateFrom) {this.P.dateFrom = this.getFormetDate(this.dateFrom);}else{this.P.dateFrom = "";}
    if(this.dateTo) {this.P.dateTo = this.getFormetDate(this.dateTo);}else{this.P.dateTo = "";}
    console.log(this.P);
    this.PostService.tjgzl(this.P,"page=1&size=10").catch(res=> {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res=>{
      this.tzgzlCx.emit(res);
      this.tjgzlCxHide();
    });
  }
  clearOpts() {
    this.P.kindId1 = "";this.P.kindId2 = "";this.P.jieId = "";this.P.gradeId = "";this.P.localEditionId= "";this.P.editionId = "";this.P.moduleId = "";this.P.batchId = "";
    this.P.usageId = "";this.P.typeId = "";this.P.subjectId = "";this.P.productName = "";this.P.userName = "";this.P.nodeId = "";this.P.groupList = [];
    this.fzsxList = [];this.fzsx = "";this.dateFrom = null;this.dateTo = null;this.P.groupList = [];this.P.dateFrom = "";this.P.dateTo = "";
    this.cpyl = false;this.cpel = false;this.cpmc = false;this.lcjd = false;this.lx = false;this.km = false;this.jb = false;this.bb = false;this.ry = false;
  }

  public tjgzlCxShow():void {
    this.childModal.show();
  }

  public tjgzlCxHide():void {
    this.childModal.hide();
    this.clearOpts();
  }

  //=======================================
  Ccpyl() {
    if(this.cpyl == false) {
      this.cpyl = true;
      this.fzsxList.push("产品I类");
      this.fzsx = this.fzsxList.join(",");
      this.P.groupList.push("1");
    }else{
      this.cpyl = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "产品I类"){this.fzsxList.splice(i,1);this.P.groupList.splice(i,1);}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
  Ccpel() {
    if(this.cpel == false) {
      this.cpel = true;
      this.fzsxList.push("产品II类");
      this.fzsx = this.fzsxList.join(",");
      this.P.groupList.push("2");
    }else{
      this.cpel = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "产品II类"){this.fzsxList.splice(i,1);this.P.groupList.splice(i,1);}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
  Ccpmc() {
    if(this.cpmc == false) {
      this.cpmc = true;
      this.fzsxList.push("产品名称");
      this.fzsx = this.fzsxList.join(",");
      this.P.groupList.push("3");
    }else{
      this.cpmc = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "产品名称"){this.fzsxList.splice(i,1);this.P.groupList.splice(i,1);}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
  Clcjd() {
    if(this.lcjd == false) {
      this.lcjd = true;
      this.fzsxList.push("流程节点");
      this.fzsx = this.fzsxList.join(",");
      this.P.groupList.push("4");
    }else{
      this.lcjd = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "流程节点"){this.fzsxList.splice(i,1);this.P.groupList.splice(i,1);}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
  Clx() {
    if(this.lx == false) {
      this.lx = true;
      this.fzsxList.push("类型");
      this.fzsx = this.fzsxList.join(",");
      this.P.groupList.push("5");
    }else{
      this.lx = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "类型"){this.fzsxList.splice(i,1);this.P.groupList.splice(i,1);}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
  Ckm() {
    if(this.km == false) {
      this.km = true;
      this.fzsxList.push("科目");
      this.fzsx = this.fzsxList.join(",");
      this.P.groupList.push("6");
    }else{
      this.km = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "科目"){this.fzsxList.splice(i,1);this.P.groupList.splice(i,1);}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
  Cjb() {
    if(this.jb == false) {
      this.jb = true;
      this.fzsxList.push("届别");
      this.fzsx = this.fzsxList.join(",");
      this.P.groupList.push("7");
    }else{
      this.jb = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "届别"){this.fzsxList.splice(i,1);this.P.groupList.splice(i,1);}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
  Cbb() {
    if(this.bb == false) {
      this.bb = true;
      this.fzsxList.push("版本");
      this.fzsx = this.fzsxList.join(",");
      this.P.groupList.push("8");
    }else{
      this.bb = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "版本"){this.fzsxList.splice(i,1);this.P.groupList.splice(i,1);}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
  Cry() {
    if(this.ry == false) {
      this.ry = true;
      this.fzsxList.push("人员");
      this.fzsx = this.fzsxList.join(",");
      this.P.groupList.push("9");
    }else{
      this.ry = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "人员"){this.fzsxList.splice(i,1);this.P.groupList.splice(i,1);}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
}
