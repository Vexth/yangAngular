import {Component, OnInit, Inject, ViewChild ,Injectable} from '@angular/core';

import { Auxiliary } from '../../../common/constants/auxiliary';

import { tjgzlcxComponent } from './tjgzlCx/tjgzlCx.component';

@Component({
  selector: 'app-tjgzl',
  templateUrl: './tjgzl.component.html',
  styleUrls: ['./tjgzl.component.css'],
})
export class TjgzlComponent implements OnInit {
  selected: any;
  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
  }
  total:any = 10;
  pageSize:any = 10;
  pageNum:any = 1;
  formData:any = {
    // dataPage:{},colList:[]
    dataPage:{
      content:[]
    }
  };
  getFromData() {

  }
  paginate(event){
    this.pageSize = event.rows;
    this.pageNum = event.page + 1;
    this.getFromData();
  }
  indexArr:any = [];
  public tzgzlCxChange(event):void{
    this.indexArr = [];
    console.log(event);
    event.data.result.colList.forEach((x,i) => {
      let indexData = {
        id: i,name: x
      }
      this.indexArr.push(indexData);
      event.data.result['headerList'] = this.indexArr;
    });
    // console.log(event.data.result.dataPage.content);
    event.data.result.dataPage.content.push(["1","2"]);
    
    this.formData = event.data.result;

    console.log(this.formData);
    this.getFromData();
  }
 //================
  //查询
  @ViewChild('tjgzlCx') public tjgzlCx:tjgzlcxComponent;
  inquiry():void {
    this.tjgzlCx.tjgzlCxShow();
  }
}