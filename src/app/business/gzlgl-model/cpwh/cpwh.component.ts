import {Component, OnInit, Inject, ViewChild ,Injectable} from '@angular/core';

import { ModalformComponent } from '../../../common/component/modalform/modalform.component';
import { cpwhcpaddComponent } from './cpwhAdd/cpwhadd.component';//新增产品
import { cpwhgjaddComponent } from './cpwhGjAdd/cpwhgjadd.component';//新增稿件
import { cpwhpladdComponent } from './cpwhpladd/cpwhpladd.component';//批量新增稿件
import { cpwhqrcodeComponent } from './cpwhQRcode/cpwhQRcode.component';//二维码

import { Message,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { GetList } from '../../services/getlist';
import { PostService } from '../../services/post.service';

import { Auxiliary } from '../../../common/constants/auxiliary';

@Component({
  selector: 'app-cpwh',
  templateUrl: './cpwh.component.html',
  styleUrls: ['./cpwh.component.css'],
})

export class CpwhComponent implements OnInit {
  private GetList: GetList;
  private PostService: PostService;
  msgs: Message[] = [];
  isadSearch:number = 0;//判断是否展示高级搜索模块
  optsList:any = []//搜索集合
  total:any;//分页
  selected:any = {};
  opts:any = {
    name:"",departId:"",kindId1:"",kindId2:"",typeId:"",jieId:"",gradeId:"",localEditionId:"",subjectId:"",editionId:"",moduleId:"",usageId:"",batchId:"",workloadType:"",page:"",size:""
  }
  addList:any = {}//新增模块条件集合

  public dataList:any;//表格数据data

  constructor(
    private confirmationService: ConfirmationService,
    @Inject(GetList) getList: GetList,
    @Inject(PostService) postService: PostService
  ) {
    this.PostService = postService;
    this.GetList = getList;
  }

  public cpwhAddchange():void{
    this.clearOpts();
  }
  public cpwhGJchange():void{
    this.clearOpts();
  }
  public cpwhPLchange():void{
    this.clearOpts();
  }
  id:number = 0;
  changeKind1(){
    if(this.opts.kindId1){
      this.id = 1;
    }else{
      this.id = 0;
      this.opts.kindId2 = "";
    }
  }
  
  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
    this.clearOpts();
    this.GetList.cpwhadd().then(res => this.optsList = res);
    this.getAddList();
  }

  getDataList() {
    this.GetList.cpwhList(this.opts).catch(res => {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res => {
      res.products.content.forEach((x,i) => {
        this.dataTreat(x.document,x);
        x["children"] = x.document.children;
        x["data"] = x.document.data;
      });
      if(!this.opts.size) {
        this.opts.size = res.products.count;
      }
      if(!this.total) {
        this.total = (+res.products.count)*(+res.products.totalPage);
      }
      this.dataList = res.products.content;
    });
  }

  /**数据处理 */
  dataTreat(data,item) {
    data['data'] = {name:data.name,jieId:item.jieId,kindId2:item.kindId2,subjectId:item.subjectId,batchId:item.batchId,
      editionId:item.editionId,moduleId:item.moduleId,localEditionId:item.localEditionId,usageId:item.usageId,
      typeId:item.typeId, departId:item.departId,documentId:data.documentId,docName:data.docName}
      if (data.children.length !== 0) {
        data.children.forEach((x,i) => {
          this.dataTreat(x,item);
        });
      }
      return data;
  }
  paginate(event) {
    console.log(this.total);
    this.opts.size = event.rows;
    this.opts.page = event.page + 1;
    this.getDataList();
  }
  checkList:any = [];
  iptIsChecked(data){
    if(this.checkList.indexOf(data) == -1) {
      this.checkList.push(data);
    }else{
      this.checkList.splice(this.checkList.indexOf(data),1);
    }
    console.log(this.checkList);
  }

  // ===========================
  // 搜索
  refresh() {
    this.getDataList();
    // console.log(this.optsList);
  }
  // 高级搜索
  adSearch():void {
    if(this.isadSearch == 0) {
      this.isadSearch = 1;
    }else if(this.isadSearch == 1){
      this.isadSearch = 0;
    }
  }
  // 重置
  clearOpts() {
    this.opts = {
      name:"",departId:"",kindId1:"",kindId2:"",typeId:"",jieId:"",gradeId:"",localEditionId:"",subjectId:"",editionId:"",moduleId:"",usageId:"",batchId:"",workloadType:"",page:"1",size:"10"
    }
    this.checkList = [];
    this.selected = {};
    this.isadSearch = 0;
    this.getDataList();
  }
  // 取消
  cancel() {
    this.isadSearch = 0;
  }
//新增产品

  getAddList() {
    this.GetList.cpwhadd().then(res => {
      this.addList = res;
    });
  }

  @ViewChild('cpwhcpadd') public cpwhcpadd:cpwhcpaddComponent;
  addcp():void {
    this.cpwhcpadd.cpwhcpaddShow(this.addList);
  }


  //新增稿件
  @ViewChild('cpwhgjadd') public cpwhgjadd:cpwhgjaddComponent;
  addgj() {
    console.log(this.selected);
    if(!this.selected || !this.selected.productId) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请选择一条数据进行操作"}];
      return;
    }
    this.cpwhgjadd.cpwhGJShow(this.selected);
  }

  //批量新增稿件
  @ViewChild('cpwhpladd') public cpwhpladd:cpwhpladdComponent;
  pladd():void {
    if(!this.selected || !this.selected.productId) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请选择一条数据进行操作"}];
      return;
    }
    this.cpwhpladd.cpwhgjaddShow(this.selected);
  }

  //删除
  delete() {
    if(this.checkList.length == 0) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:'请选择要删除的项'}];
      return;
    }
    let postData = {
      docidList:this.checkList
    }
    this.confirmationService.confirm({
      message: '删除后无法恢复！',
      header: '你确定删除吗？',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.PostService.cpwhDelete(postData).then(res=>{
          this.clearOpts();
          this.msgs = [];
          this.msgs = [{severity:'success', summary:'成功提示', detail:"删除成功"}];
          return;
        }).catch(res=>{
          res = res.json();
          this.msgs = [];
          this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
          return;
        });
      },
      reject: () => {
          // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }
  print() {
    if(this.checkList.length == 0) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:'请选择要打印的项'}];
      return;
    }
    let hashStr = this.checkList.join('&id=');
    console.log(hashStr);
    window.open('http://ches.jtyjy.com/qrcode.html?id='+hashStr+'&');
  }

  //二维码
  @ViewChild('cpwhqrcode') public cpwhqrcode:cpwhqrcodeComponent;
  goQrcode(id,name) {
    this.cpwhqrcode.cpwhQrcodeShow(id,name);
  }
}