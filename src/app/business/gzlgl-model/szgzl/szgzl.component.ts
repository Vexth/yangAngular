import {Component, OnInit, Inject, ViewChild ,Injectable} from '@angular/core';

import { Auxiliary } from '../../../common/constants/auxiliary';
import { Message,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { szgzlplComponent } from './szgzlPl/szgzlPl.component';

import { PostService } from '../../services/post.service';
import { GetList } from '../../services/getlist';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-szgzl',
  templateUrl: './szgzl.component.html',
  styleUrls: ['./szgzl.component.css'],
})
export class SzgzlComponent implements OnInit {
  private PostService: PostService;
  private GetList: GetList;
  isadSearch:number = 0;//判断是否展示高级搜索模块
  msgs: Message[] = [];
  optsDataList:any = {
    departments:[],optBatch:[],optEdition:[],optGrade:[],optGroup:[],optJie:[],optKind1:[],
    optKind2:[],optLocalEdition:[],optModule:[],optNode:[],optSubject:[],optType:[],optUsageType:[]
  }
  opts:any = {
    name:"",departId:"",kindId1:"",kindId2:"",typeId:"",jieId:"",gradeId:"",localEditionId:"",subjectId:"",editionId:"",moduleId:"",usageId:"",batchId:"",workloadType:"",page:"1",size:"10"
  }
  fromDataList:any = {
    nodelist:[],pagelist:{
      content:[
        // {productId: 335, departId: "28", departName: "信息技术部",name:"17届金太阳考案一年级必修1语文人教版AH教师用书01期",workloadType:1}
      ]
    }
  }
  total:any = "";
  selected:any = {};
  indexDeptId:string="";
  btnFn: any;
  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
    this.getOptsDataList();
    this._activatedRoute.queryParams.subscribe(queryParams=>{
      this.btnFn = Auxiliary.prototype.queryParamsList(queryParams);
    })
  }
  constructor(
    private confirmationService: ConfirmationService,
    @Inject(PostService) postService: PostService,
    private _activatedRoute: ActivatedRoute,
    @Inject(GetList) getList: GetList
  ) {
    this.PostService = postService;this.GetList = getList;
  }
  deptChange() {
    this.total = "";
    this.opts.page = "1";this.opts.size = "10";
    this.indexDeptId = this.opts.departId;
    this.getFormData();
  }
  //获取页面数据
  getFormData() {
    if(!this.opts.departId){
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请选择部门"}];
      return;
    }
    this.GetList.szgzlDataList(this.opts).catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res=>{
      res.pagelist.content.forEach((x,i) => {
        this.dataTreat(x.document,x);
        x["children"] = x.document.children;
        x["data"] = x.document.data;
      });
      console.log(res);
      this.fromDataList = res;
      if(!this.total) {
        this.total = (+res.pagelist.count)*(+res.pagelist.totalPage);
      }
     
    })
  }
  /**
   * 数据处理
   */
  dataTreat(data,item) {
    data['data'] = {documentId:data.documentId,name:data.name,workloadType:item.workloadType,departName:item.departName,departId:item.departId,workloadList:data.workloadList}
    if (data.children.length !== 0) {
      data.children.forEach((x) => {
        this.dataTreat(x,item);
      });
    }
    return data;
  }

  //获取搜索条件集合
  getOptsDataList() {
    this.GetList.cpwhadd().catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res=>{
      this.optsDataList = res;
    });
  }

  // ===========================
  // 搜索
  refresh() {
    this.getFormData();
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
    this.cancel();
    this.opts = {
      name:"",departId:this.indexDeptId,kindId1:"",kindId2:"",typeId:"",jieId:"",gradeId:"",localEditionId:"",subjectId:"",editionId:"",moduleId:"",usageId:"",batchId:"",page:"1",size:"10"
    }
    this.saveDataList = [];this.selected = {};
    this.getFormData();
  }
  // 取消
  cancel() {
    this.isadSearch = 0;
  }

  //批量设置
  @ViewChild('szgzlPl') public szgzlPl:szgzlplComponent;
  plSet():void {
    if(this.checkList.length == 0){
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请选择要设置的项"}];
      return;
    }
    this.szgzlPl.szgzlplShow(this.opts.departId,this.checkList);
  }

  //保存
  saveDataList:any = [];
  save() {
    if(this.saveDataList.length === 0) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"未修改任何项"}];
      return;
    }
    console.log(this.saveDataList);
    let postData = {
      dataList:this.saveDataList
    }
    this.PostService.szgzlSet(postData).then(res=>{
      this.clearOpts();
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:"工作量保存成功"}];
    }).catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    });
  }

   // 双击修改
   ShowElement(element,selected) {
    console.log(selected);
    let postData = {
      children:selected.children,departId:selected.departId,departName:selected.departName,document:"",documentId:selected.data.documentId,
      name:selected.name,productId:selected.productId,workloadList:selected.data.workloadList,workloadType:selected.workloadType
    }
    let oldhtml = element.target.innerHTML;
    //创建新的input元素
    let newobj = document.createElement('input');
    //为新增元素添加类型
    newobj.type = 'text';
    newobj.style.width = '80px';
    newobj.style.color = '#000';
    newobj.maxLength = 5;
    //为新增元素添加value值
    newobj.value = oldhtml;
    //为新增元素添加光标离开事件
    newobj.addEventListener('blur', () => {
      //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值 
      if(isNaN(+newobj.value) || newobj.value==="") {newobj.value = "未设置";}
      element.target.innerHTML = newobj.value == oldhtml ? oldhtml : newobj.value;
      // console.log(element.path[0].className);
      postData.workloadList[+element.path[0].className] = newobj.value;
      this.saveDataList.forEach((x,i) => {
        if(x.documentId == postData.documentId) {
          this.saveDataList.splice(i,1);
        }
      });
      if(newobj.value !== "未设置") {
        this.saveDataList.push(postData);
      }
      //当触发时设置父节点的双击事件为ShowElement
      // element.target.setAttribute("ondblclick", "ShowElement(this);");
    });
    //设置该标签的子节点为空
    element.target.innerHTML = '';
    //添加该标签的子节点，input对象
    element.target.appendChild(newobj);
    //设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置）
    newobj.setSelectionRange(0, oldhtml.length);
    //设置获得光标
    newobj.focus();
    //设置父节点的双击事件为空
    // newobj.parentNode.setAttribute("ondblclick", "");
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
  
  public saveModelChange():void{
    console.log("刷新");
    this.clearOpts();
  }
  paginate(event) {
    console.log(event);
    this.opts.size = 10;
    this.opts.page = event.page + 1;
    this.getFormData();
  }
  szgzlid:number = 0;
  changeOptKind2:any = [];
  changeKind1(){
    console.log(this.opts.kindId1);
    if(this.opts.kindId1){
      this.szgzlid = 1;
      this.getkindId2(this.opts.kindId1);
    }else{
      this.szgzlid = 0;
      this.changeOptKind2 = [];
    }
  }
  //获取kindId2List
  getkindId2(data) {
    this.GetList.getKindId2(data).catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res=>{
      this.changeOptKind2 = res.optKind2;
    });
  }

  clickFn(event){
    if (event == '批量设置') {
      this.plSet()
    } else if (event == '保存') {
      this.save()
    }
  }
}