import {Component, OnInit, Inject, ViewChild ,Injectable} from '@angular/core';

import { Auxiliary } from '../../../common/constants/auxiliary';
import { Message,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { GetList } from '../../services/getlist';
import { PostService } from '../../services/post.service';
@Component({
  selector: 'app-ymsr',
  templateUrl: './ymsr.component.html',
  styleUrls: ['./ymsr.component.css'],
})
export class YmsrComponent implements OnInit {
  isadSearch:number = 0;//判断是否展示高级搜索模块
  private GetList: GetList;
  private PostService: PostService;
  msgs: Message[] = [];
  selected:any;
  deptData:any;
  optsDataList:any = {
    departments:[],optBatch:[],optEdition:[],optGrade:[],optGroup:[],optJie:[],optKind1:[],
    optKind2:[],optLocalEdition:[],optModule:[],optNode:[],optSubject:[],optType:[],optUsageType:[]
  }
  total:any = 10;
  formDataList:any = [];
  optsData:any = {
    name:"",departId:"",kindId1:"",kindId2:"",typeId:"",jieId:"",gradeId:"",localEditionId:"",subjectId:"",editionId:"",moduleId:"",usageId:"",batchId:"",page:"1",size:"10"
  }
  updataList:any = [];
  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
    this.getDeptList();
    this.getFormData();
  }
  constructor(private confirmationService: ConfirmationService,@Inject(GetList) getList: GetList,@Inject(PostService) postService: PostService) {
    this.GetList = getList;this.PostService = postService;
  }
  clearOptData() {
    this.optsData = {
      name:"",departId:"",kindId1:"",kindId2:"",typeId:"",jieId:"",gradeId:"",localEditionId:"",subjectId:"",editionId:"",moduleId:"",usageId:"",batchId:"",page:"1",size:"10"
    }
  }

  //获取部门
  getDeptList() {
    this.GetList.lzcxOpts().catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res=>{
      this.optsDataList = res;
    });
  }
  //获取表格数据
  getFormData() {
    this.GetList.ymsrDataList(this.optsData).catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res=>{
      res.pagelist.content.forEach(( x,i ) => {
        this.dataTreat(x.document,x.departName);
        x["children"] = x.document.children;
        x["data"] = x.document.data;
      })
      
      this.formDataList = res.pagelist.content;
      // this.optsData.size = res.pagelist.count?res.pagelist.count:10;
      this.optsData.size = 10;
      this.optsData.page = res.pagelist.page;
      let indexTotal = (+res.pagelist.totalPage)*(+res.pagelist.count);
      if(indexTotal>0) {this.total = indexTotal;}else{this.total = 10;}
      // this.total = (+res.pagelist.totalPage)*(+res.pagelist.count);
      console.log(this.formDataList);
    });
  }
  paginate(event) {
    this.optsData.size = event.rows;
    this.optsData.page = event.page + 1;
    this.getFormData();
  }
  //数据处理docId
  dataTreat(data,departName) {
    data['data'] = {departName:departName,documentId:data.documentId,name:data.name,pageNumber:data.pageNumber,isMin:false}
    if (data.children.length !== 0) {
      data.children.forEach((x,i) => {
        this.dataTreat(x,departName);
      });
    }else{
      data['data']['isMin'] = true;
    }
    return data;
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
    this.clearOptData();
    this.getFormData();
  }
  // 取消
  cancel() {
    this.isadSearch = 0;
  }
  //保存
  save() {
    if(this.updataList.length === 0) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:'没有修改任何项'}];
      return;
    }
    console.log(this.updataList);
    let pageList = {
      pageList:this.updataList
    }
    this.PostService.ymsrSet(pageList).catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      return;
    }).then(res=>{
      this.clearOpts();
      this.msgs = [];
      this.msgs = [{severity:'success', summary:'成功提示', detail:"保存成功"}];
    });
  }
  // 双击修改
  ShowElement(element,selected) {
    if(selected.children.length !== 0) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"非子集稿件不能修改"}];
      return;
    }
    let indexDocId = selected.data.documentId;
    let pushData = {
      docId:"",pageNum:""
    }
    // console.log(element)
    let oldhtml = element.target.innerHTML;
    //创建新的input元素
    let newobj = document.createElement('input');
    //为新增元素添加类型
    newobj.type = 'text';
    newobj.style.width = '80px';
    newobj.style.color = '#000';
    // newobj.maxLength = 5;
    //为新增元素添加value值
    newobj.value = oldhtml;
    //为新增元素添加光标离开事件
    newobj.addEventListener('blur', () => {
      //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值
      if(isNaN(+newobj.value) || newobj.value==="") {newobj.value = "未设置";}
      element.target.innerHTML = newobj.value == oldhtml ? oldhtml : newobj.value;
      if(this.updataList.length > 0) {
        this.updataList.forEach((x,i) => {
          if(x.docId == indexDocId) {
            this.updataList.splice(i,1)
          }
        });
      }
      if(newobj.value !== "未设置") {
        pushData.docId = indexDocId;
        pushData.pageNum = newobj.value;
        this.updataList.push(pushData);
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
  ymsrid:number = 0;
  changeOptKind2:any = [];
  changeKind1(){
    console.log(this.optsData.kindId1);
    if(this.optsData.kindId1){
      this.ymsrid = 1;
      this.getkindId2(this.optsData.kindId1);
    }else{
      this.ymsrid = 0;
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
}