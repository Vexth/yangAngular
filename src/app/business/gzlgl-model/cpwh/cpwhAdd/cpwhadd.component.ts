import {Component, OnInit, Inject, Output, ViewChild ,Injectable, EventEmitter} from '@angular/core';
import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';
import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective,ModalModule,ModalOptions } from 'ngx-bootstrap/modal';
import { Header, Footer,ConfirmationService,Message,MenuItem} from 'primeng/primeng';//右上角提示框组件
import { GetList } from '../../../services/getlist';
import { PostService } from '../../../services/post.service';
import { CpwhList } from '../../../../module/business/getlist';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'cpwh-cpadd',
  templateUrl: './cpwhadd.component.html',
  styleUrls: ['./cpwhadd.component.css']
})

export class cpwhcpaddComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  private GetList: GetList;private PostService: PostService;
  msgs: Message[] = [];
  post:any = {
    departId:"",typeId:"",jieId:"",gradeId:"",kindId1:"",kindId2:"",subjectId:"",workloadType:""
  };
  cpAddTjhs:string = "";//添加行数
  addList:any = {};
  addListV2:any = {
    optJie:[],optKind1:[],optGrade:[],optModule:[],optSubject:[],optEdition:[],optLocalEdition:[],optUsageType:[],optBatch:[]
  };
  tableList: any = [];
  temporaryList:any = [];//存放添加的稿件
  datakey:number = 0;
  selectedTab:any = [];
  constructor(@Inject(GetList) getList: GetList,private confirmationService: ConfirmationService,@Inject(PostService) postService: PostService){
    this.GetList = getList;
    this.PostService = postService;
  }
  ngOnInit() {
    
  }
  public cpwhcpaddShow(data):void {
    this.childModal.show();
    data.optKind1.forEach(item => {item['label']=item.optionName;item['value']=item.optionId;});
    data.optKind1.unshift({label:"--请选择--",optionName:"--请选择--",value:""});
    this.addList = data;
    for(let i = 0;i <　this.addList.optJie.length; i++) {this.addListV2.optJie[this.addList.optJie[i].optionId] = this.addList.optJie[i].optionName;}
    for(let i = 0;i <　this.addList.optKind1.length; i++) {this.addListV2.optKind1[this.addList.optKind1[i].optionId] = this.addList.optKind1[i].optionName;}
    for(let i = 0;i <　this.addList.optGrade.length; i++) {this.addListV2.optGrade[this.addList.optGrade[i].optionId] = this.addList.optGrade[i].optionName;}
    for(let i = 0;i <　this.addList.optModule.length; i++) {this.addListV2.optModule[this.addList.optModule[i].optionId] = this.addList.optModule[i].optionName;}
    for(let i = 0;i <　this.addList.optSubject.length; i++) {this.addListV2.optSubject[this.addList.optSubject[i].optionId] = this.addList.optSubject[i].optionName;}
    for(let i = 0;i <　this.addList.optEdition.length; i++) {this.addListV2.optEdition[this.addList.optEdition[i].optionId] = this.addList.optEdition[i].optionName;}
    for(let i = 0;i <　this.addList.optLocalEdition.length; i++) {this.addListV2.optLocalEdition[this.addList.optLocalEdition[i].optionId] = this.addList.optLocalEdition[i].optionName;}
    for(let i = 0;i <　this.addList.optUsageType.length; i++) {this.addListV2.optUsageType[this.addList.optUsageType[i].optionId] = this.addList.optUsageType[i].optionName;}
    for(let i = 0;i <　this.addList.optBatch.length; i++) {this.addListV2.optBatch[this.addList.optBatch[i].optionId] = this.addList.optBatch[i].optionName;}
  }
  public cpwhcpaddHide():void {
    this.childModal.hide();
    this.tableList = [];this.datakey = 0;this.cpAddTjhs = "";this.temporaryList = [];this.selectedTab = [];
    this.post = {departId:"",typeId:"",jieId:"",gradeId:"",kindId1:"",kindId2:"",subjectId:"",workloadType:""};
    this.addListV2 = {optJie:[],optKind1:[],optGrade:[],optModule:[],optSubject:[],optEdition:[],optLocalEdition:[],optUsageType:[],optBatch:[]};
  }
  delete() {
    if(this.selectedTab.length === 0){this.msgs=[];this.msgs=[{severity:'error', summary:'错误提示', detail:"请选择要删除的数据"}];return;}
    let deleteArr = Object.assign([],this.tableList);
    let selectArr = [];
    this.selectedTab.forEach(item => {selectArr.push(item.datakey);});
    for (let i = deleteArr.length - 1; i >= 0; i--) {
      if(selectArr.indexOf(deleteArr[i].datakey) > -1){
        deleteArr.splice(i,1);
      }
    }
    this.tableList = deleteArr;
    this.temporaryList = deleteArr;
  }
  pladd(){
    if(!this.cpAddTjhs){this.msgs = [];this.msgs = [{severity:'error', summary:'错误提示', detail:"请输入添加行数"}]; return;}
    if(+this.cpAddTjhs > 20) {this.msgs = [];this.msgs.push({severity:'error', summary:'错误提示', detail:'一次最多添加20行'}); return;}
    let pustArr = [];const indexNum = this.datakey;pustArr = Object.assign([],this.tableList);
    for(let i = 0;i < +this.cpAddTjhs; i++) {
      let indexNumber = indexNum+i;
      pustArr[indexNumber] = {datakey:indexNumber,editionId:"",moduleId:"",localEditionId:"",usageId:"",batchId:""};
    }
    this.datakey = indexNum + (+this.cpAddTjhs);
    for(let k = pustArr.length - 1; k >= 0; k--) {if(!pustArr[k]){pustArr.splice(k,1);}}
    this.tableList = pustArr;
    this.temporaryList = pustArr;
  }
  myFunction(element,key,index) {
    this.temporaryList.forEach((x,i) => {
      if(x.datakey === key) {
        x[index] = element.path[0].value;
      }
    });
  }
  getDocumentName(moduleId,editionId,localEditionId,usageId,batchId){
    let nameArr = [];let nameStr = "";
    nameArr[0] = this.addListV2.optJie[this.post.jieId];nameArr[1] = this.addListV2.optKind1[this.post.kindId1];nameArr[2] = this.addListV2.optGrade[this.post.gradeId];
    nameArr[3] = this.addListV2.optModule[moduleId];nameArr[4] = this.addListV2.optSubject[this.post.subjectId];nameArr[5] = this.addListV2.optEdition[editionId];
    nameArr[6] = this.addListV2.optLocalEdition[localEditionId];nameArr[7] = this.addListV2.optUsageType[usageId];nameArr[8] = this.addListV2.optBatch[batchId];
    nameStr = nameArr.join("");
    return nameStr;
  }

  @Output()
  public cpwhAdd=new EventEmitter<string>();

  public emitSave(event):void {
    let postData = {productList:[]};
    for (let x in this.post){
      if(!this.post[x]){this.msgs=[];this.msgs=[{severity:'error', summary:'错误提示', detail:"请填写完整后提交"}];return;}
    }
    if(this.temporaryList.length === 0) {this.msgs=[];this.msgs=[{severity:'error', summary:'错误提示', detail:"请在下方表格中至少添加一条数据"}];return;}
    for(let i = 0; i < this.temporaryList.length; i++){
      if(!this.temporaryList[i].editionId){this.msgs=[];this.msgs=[{severity:'error', summary:'错误提示', detail:"请选择表格中数据的版本"}];return;}
      let temporaryData = {}; let pushData = {};
      temporaryData['editionId']=this.temporaryList[i].editionId;temporaryData['moduleId']=this.temporaryList[i].moduleId;
      temporaryData['localEditionId']=this.temporaryList[i].localEditionId;temporaryData['usageId']=this.temporaryList[i].usageId;
      temporaryData['batchId']=this.temporaryList[i].batchId;
      temporaryData['name']=this.getDocumentName(this.temporaryList[i].moduleId,this.temporaryList[i].editionId,this.temporaryList[i].localEditionId,this.temporaryList[i].usageId,this.temporaryList[i].batchId);
      pushData = Object.assign(temporaryData,this.post);
      postData.productList.push(temporaryData);
    }
    console.log(postData);
    this.PostService.cpwhAdd(postData).catch(res => {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res => {
      this.cpwhAdd.emit("cpwhAdd");
      this.cpwhcpaddHide();
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:'新增产品成功'}];
    });
  }
}