import { Component, OnInit,ViewChild,Input,Inject,Output,EventEmitter } from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import {CalendarModule,DataTableModule,SharedModule} from 'primeng/primeng';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'tjgzl-cx',
  templateUrl: './tjgzlCx.component.html',
  styleUrls: ['./tjgzlCx.component.css']
})

export class tjgzlcxComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  
  invalidDates: Array<Date>;
  startData: Date;
  endData: Date;//时间选择组件
  comId:string = '';//单选下拉框
  comIdList:any = [
    {id: 1, name: '公司A'},
    {id: 2, name: '公司B'},
    {id: 3, name: '公司C'},
    {id: 4, name: '公司D'},
    {id: 5, name: '公司E'},
    {id: 6, name: '公司F'},
  ];
  cpyl:boolean = false;cpel:boolean = false;cpmc:boolean = false;lcjd:boolean = false;
  lx:boolean = false;km:boolean = false;jb:boolean = false;bb:boolean = false;
  ry:boolean = false;

  fzsx:string = '';
  fzsxList:any = [];
  ngOnInit() {
    
  }
  refresh() {
    console.log("查询");
  }
  clearOpts() {
    console.log("重置");
  }

  public tjgzlCxShow():void {
    this.childModal.show();
  }

  public tjgzlCxHide():void {
    this.childModal.hide();
  }

  Ccpyl() {
    if(this.cpyl == false) {
      this.cpyl = true;
      this.fzsxList.push("产品I类");
      this.fzsx = this.fzsxList.join(",");
    }else{
      this.cpyl = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "产品I类"){this.fzsxList.splice(i,1)}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
  Ccpel() {
    if(this.cpel == false) {
      this.cpel = true;
      this.fzsxList.push("产品II类");
      this.fzsx = this.fzsxList.join(",");
    }else{
      this.cpel = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "产品II类"){this.fzsxList.splice(i,1)}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
  Ccpmc() {
    if(this.cpmc == false) {
      this.cpmc = true;
      this.fzsxList.push("产品名称");
      this.fzsx = this.fzsxList.join(",");
    }else{
      this.cpmc = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "产品名称"){this.fzsxList.splice(i,1)}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
  Clcjd() {
    if(this.lcjd == false) {
      this.lcjd = true;
      this.fzsxList.push("流程节点");
      this.fzsx = this.fzsxList.join(",");
    }else{
      this.lcjd = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "流程节点"){this.fzsxList.splice(i,1)}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
  Clx() {
    if(this.lx == false) {
      this.lx = true;
      this.fzsxList.push("类型");
      this.fzsx = this.fzsxList.join(",");
    }else{
      this.lx = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "类型"){this.fzsxList.splice(i,1)}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
  Ckm() {
    if(this.km == false) {
      this.km = true;
      this.fzsxList.push("科目");
      this.fzsx = this.fzsxList.join(",");
    }else{
      this.km = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "科目"){this.fzsxList.splice(i,1)}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
  Cjb() {
    if(this.jb == false) {
      this.jb = true;
      this.fzsxList.push("届别");
      this.fzsx = this.fzsxList.join(",");
    }else{
      this.jb = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "届别"){this.fzsxList.splice(i,1)}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
  Cbb() {
    if(this.bb == false) {
      this.bb = true;
      this.fzsxList.push("版本");
      this.fzsx = this.fzsxList.join(",");
    }else{
      this.bb = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "版本"){this.fzsxList.splice(i,1)}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
  Cry() {
    if(this.ry == false) {
      this.ry = true;
      this.fzsxList.push("人员");
      this.fzsx = this.fzsxList.join(",");
    }else{
      this.ry = false;
      this.fzsxList.forEach((x,i) => {
        if(x == "人员"){this.fzsxList.splice(i,1)}
      });
      this.fzsx = this.fzsxList.join(",");
    }
  }
}
