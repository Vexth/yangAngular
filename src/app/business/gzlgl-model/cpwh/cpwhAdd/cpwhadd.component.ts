import {Component, OnInit, Inject, Output, ViewChild ,Injectable, EventEmitter} from '@angular/core';

import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';

import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';

import { Header, Footer,ConfirmationService,Message,MenuItem} from '../../../../../../primeng/primeng';//右上角提示框组件

import { GetList } from '../../../services/getlist';
import { PostService } from '../../../services/post.service';

import { CpwhList } from '../../../../module/business/getlist';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'cpwh-cpadd',
  templateUrl: './cpwhadd.component.html',
  styleUrls: ['./cpwhadd.component.css']
})

export class cpwhcpaddComponent implements OnInit {
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('childModal') public childModal:ModalDirective;
  private GetList: GetList;
  private PostService: PostService;
  cpAddTjhs:number;//添加行数
  addList:any = [];//条件集合
  model:any = [];//提交条件

  departId:string="";//部门
  typeId:string="";//分类
  jieId:string="";//届别
  gradeId:string="";//年级
  kindId1:string="";//产品I类
  kindId2:string="";//产品II类
  workloadType:number;//是否按页码计算工作量
  subjectId:string="";//科目

  optEditionId:string="";//版本
  optModuleId:string="";//模块
  optLocalEditionId:string="";//地方版
  optUsageTypeId:string="";//使用类型
  optBatchId:string="";//批次
  dataList:any = [];
  constructor(@Inject(GetList) getList: GetList,private confirmationService: ConfirmationService,@Inject(PostService) postService: PostService){
    this.GetList = getList;
    this.PostService = postService;
  }

  ngOnInit() {
    this.GetList.cpwhadd().then(res => this.addList = res);
  }
  optJieV2 = [];
  optKind1V2 = [];
  optGradeV2 = [];
  optModuleV2 = [];
  optSubjectV2 = [];
  optEditionV2 = [];
  optLocalEditionV2 = [];
  optUsageTypeV2 = [];
  optBatchV2 = [];
  public cpwhcpaddShow():void {
    this.childModal.show();
    for(let i = 0;i <　this.addList.optJie.length; i++) {
      this.optJieV2[this.addList.optJie[i].optionId] = this.addList.optJie[i].optionName;
    }
    for(let i = 0;i <　this.addList.optKind1.length; i++) {
      this.optKind1V2[this.addList.optKind1[i].optionId] = this.addList.optKind1[i].optionName;
    }
    for(let i = 0;i <　this.addList.optGrade.length; i++) {
      this.optGradeV2[this.addList.optGrade[i].optionId] = this.addList.optGrade[i].optionName;
    }
    for(let i = 0;i <　this.addList.optModule.length; i++) {
      this.optModuleV2[this.addList.optModule[i].optionId] = this.addList.optModule[i].optionName;
    }
    for(let i = 0;i <　this.addList.optSubject.length; i++) {
      this.optSubjectV2[this.addList.optSubject[i].optionId] = this.addList.optSubject[i].optionName;
    }
    for(let i = 0;i <　this.addList.optEdition.length; i++) {
      this.optEditionV2[this.addList.optEdition[i].optionId] = this.addList.optEdition[i].optionName;
    }
    for(let i = 0;i <　this.addList.optLocalEdition.length; i++) {
      this.optLocalEditionV2[this.addList.optLocalEdition[i].optionId] = this.addList.optLocalEdition[i].optionName;
    }
    for(let i = 0;i <　this.addList.optUsageType.length; i++) {
      this.optUsageTypeV2[this.addList.optUsageType[i].optionId] = this.addList.optUsageType[i].optionName;
    }
    for(let i = 0;i <　this.addList.optBatch.length; i++) {
      this.optBatchV2[this.addList.optBatch[i].optionId] = this.addList.optBatch[i].optionName;
    }
  }

  public cpwhcpaddHide():void {
    this.childModal.hide();
  }

  //点击批量添加
  msgs: Message[] = [];
  // dataList2: any = [];
  // pladd() {
  //   this.dataList = [];
  //   console.log('批量添加');
  //   // if(this.cpAddTjhs > 20) {
  //   //   this.msgs = [];
  //   //   this.msgs.push({severity:'error', summary:'错误提示', detail:'一次最多添加20行'});
  //   //   return;
  //   // }
  //   // console.log(this.dataList2);
  //   for(let j = 0; j < this.dataList2.length; j++){
  //     this.dataList.push(this.dataList2[j]);
  //   }
  //   // for(let i = 0; i < this.cpAddTjhs; i++){
  //     this.dataList.push({optEditionId:"",optModuleId:"",optLocalEditionId:"",optUsageTypeId:"",optBatchId:""});
  //   // }
  //   this.dataList2 = this.dataList;
  //   // console.log(this.dataList2);
  // }


  //打开关闭
  optsList($event: ModalDirective) {
    
  }
  handler($event: ModalDirective) {
    this.getDataList();
  }
  P:CpwhList = new CpwhList();
  getDataList() {
    this.GetList.cpwhList(1,10).catch(res => {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res => {
        this.P = res.products.content;
        this.change.emit();
    });
  }
  //保存
  /*uploadData = {
    batchId:"",usageId:"",localEditionId:"",moduleId:"",editionId:"",departId:"",gradeId:"",jieId:"",kindId1:"",subjectId:"",kindId2:"",typeId:"",workloadType:"",name:""
  }*/
  uploadName = {
    optJieName:"",optKind1Name:"",optGradeName:"",optModuleName:"",optSubjectName:"",optEditionName:"",optLocalEditionName:"",optUsageTypeName:"",optBatchName:""
  }
  save() {
    if(!this.departId||!this.typeId||!this.jieId||!this.gradeId||!this.kindId1||!this.kindId2||!this.subjectId||!this.workloadType){
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:'请填写完全后提交'}];
      return;
    }else if(this.tableList.length == 0) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:'请最少添加一条数据'}];
      return;
    }
    let product = {
      productList: []
    };
    let indexofKey = [];
    let uploadTabList = [];
    let uploadList = [];
    let uploadData = {
      batchId:"",usageId:"",localEditionId:"",moduleId:"",editionId:"",departId:"",gradeId:"",jieId:"",kindId1:"",subjectId:"",kindId2:"",typeId:"",workloadType:0,name:""
    }
    for(let i = 0; i < this.tableList.length; i++) {
      indexofKey.push(this.tableList[i].tabListKeyId);
    }
    for(let j = 0; j < this.addTableList.length; j++){
      if(indexofKey.indexOf(this.addTableList[j].tabListKeyId) != -1){
        uploadTabList.push(this.addTableList[j]);
      }
    }
    for(let x = 0; x < uploadTabList.length; x++){
      uploadData = {
        batchId:"",usageId:"",localEditionId:"",moduleId:"",editionId:"",departId:"",gradeId:"",jieId:"",kindId1:"",subjectId:"",kindId2:"",typeId:"",workloadType:0,name:""
      }
      uploadData.batchId = uploadTabList[x].batchId;
      uploadData.usageId = uploadTabList[x].usageId;
      uploadData.localEditionId = uploadTabList[x].localEditionId;
      uploadData.moduleId = uploadTabList[x].moduleId;
      uploadData.editionId = uploadTabList[x].editionId;
      uploadData.departId = this.departId;
      uploadData.gradeId = this.gradeId;
      uploadData.jieId = this.jieId;
      uploadData.kindId1 = this.kindId1;
      uploadData.subjectId = this.subjectId;
      uploadData.kindId2 = this.kindId2;
      uploadData.typeId = this.typeId;
      uploadData.workloadType = this.workloadType;
      uploadData.name=this.optJieV2[this.jieId]+this.optKind1V2[this.kindId1]+this.optGradeV2[this.gradeId]+uploadTabList[x].moduleId?this.optModuleV2[uploadTabList[x].moduleId]:""+this.optSubjectV2[this.subjectId]+this.optEditionV2[uploadTabList[x].editionId]+
      uploadTabList[x].localEditionId?this.optLocalEditionV2[uploadTabList[x].localEditionId]:""+uploadTabList[x].usageId?this.optUsageTypeV2[uploadTabList[x].usageId]:""+uploadTabList[x].batchId?this.optBatchV2[uploadTabList[x].batchId]:"";
      product.productList.push(uploadData);
    }
    this.PostService.cpwhAdd(product).catch(res => {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res => {
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:'新增产品成功'}];
      this.childModal.hide();
    });
  }


  displayDialog: boolean;
  addTable: cpwhAddTableList = new gzlglCpwhAdd();
  selectedCar: cpwhAddTableList;
  newList: boolean;
  tableList: cpwhAddTableList[];
  tabListKey:number = 0;
  pladd() {
    this.newList = true;
    this.addTable = new gzlglCpwhAdd();
    this.addTable.tabListKeyId = this.tabListKey;
    this.displayDialog = true;
    this.tabListKey += 1;
  }

  //新增保存
  addTableList:any=[];
  saveAdd() {
    // let tableList = [...this.tableList];
    let tableList = [];
    let addTableV2 = {
      tabListKeyId:'',editionId:'',moduleId:'',localEditionId:'',usageId:'',batchId:''
    }
    if(this.tableList){
      for(let i = 0; i < this.tableList.length; i++) {
        tableList.push(this.tableList[i]);
      }
    }
    
    if(this.newList){
      if(!this.addTable.editionId) {
        this.msgs = [{severity:'error', summary:'错误提示', detail:'请选择版本后提交'}];
      }else{
        addTableV2.tabListKeyId = this.addTable.tabListKeyId;
        addTableV2.editionId = this.addTable.editionId.split("`")[0];
        addTableV2.moduleId = this.addTable.moduleId?this.addTable.moduleId.split("`")[0]:"";
        addTableV2.localEditionId = this.addTable.localEditionId?this.addTable.localEditionId.split("`")[0]:"";
        addTableV2.usageId = this.addTable.usageId?this.addTable.usageId.split("`")[0]:"";
        addTableV2.batchId = this.addTable.batchId?this.addTable.batchId.split("`")[0]:"";

        this.addTable.editionId = this.addTable.editionId.split("`")[1];
        this.addTable.moduleId = this.addTable.moduleId?this.addTable.moduleId.split("`")[1]:"";
        this.addTable.localEditionId = this.addTable.localEditionId?this.addTable.localEditionId.split("`")[1]:"";
        this.addTable.usageId = this.addTable.usageId?this.addTable.usageId.split("`")[1]:"";
        this.addTable.batchId = this.addTable.batchId?this.addTable.batchId.split("`")[1]:"";

        tableList.push(this.addTable);
        this.tableList = tableList;
        this.addTableList.push(addTableV2);//保存要提交的数据
        console.log(this.addTableList);
        console.log(this.tableList);
        this.addTable = null;
        this.displayDialog = false;
      }
    }else{
      tableList[this.findSelectedCarIndex()] = this.addTable;
      this.tableList = tableList;
      this.addTable = null;
      this.displayDialog = false;
    }
  }
  //新增删除
  delete() {
    let arr = [];
    let tableListV2 = Object.assign({},this.tableList);
    let tableListV3 = [];
    for(let x in tableListV2){
      tableListV3.push(tableListV2[x]);
    }
    for(let item in this.selectedCar){
        arr.push(this.selectedCar[item].tabListKeyId);
    }
    for (let i = tableListV3.length - 1; i >= 0; i--) {
      if(arr.indexOf(tableListV3[i].tabListKeyId) != -1){
        tableListV3.splice(i,1);
      }
    }
    /*console.log(this.tableList);
    let index = this.findSelectedCarIndex();
    this.tableList = this.tableList.filter((val,i) => i!=index);*/
    this.tableList = tableListV3;
    this.addTable = null;
    this.displayDialog = false;
  }
  findSelectedCarIndex(): number {
    return this.tableList.indexOf(this.selectedCar);
  }
  
}

export interface cpwhAddTableList {
  tabListKeyId?;
  editionId?;
  moduleId?;
  localEditionId?;
  usageId?;
  batchId?;
}

class gzlglCpwhAdd implements cpwhAddTableList {
  constructor(public tabListKeyId?,public editionId?, public moduleId?, public localEditionId?, public usageId?, public batchId?) {}
}
