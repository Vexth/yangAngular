import {Component, OnInit, Inject, ViewChild ,Injectable} from '@angular/core';
// import { DatePipe } from '@angular/common';//日期格式化

import { Auxiliary } from '../../../common/constants/auxiliary';
import { Message,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框

import { GetList } from '../../services/getlist';

@Component({
  selector: 'app-lzcx',
  templateUrl: './lzcx.component.html',
  styleUrls: ['./lzcx.component.css'],
})
export class LzcxComponent implements OnInit {
  private GetList: GetList;
  
  es: any;
  invalidDates: Array<Date>;
  pageNum:any = 1;//当前页
  pageSize:any = 10;//每页条数
  total:any = 10;//总条数
  beginDate: any;
  endDate: any;//时间选择组件
  nodeId:any = "";//流程节点
  departmentId:any = "";//所属部门
  documentName:any;//稿件名称
  username:any;//人员
  // id:number;//数据id
  isadSearch:number = 0;//判断是否展示高级搜索模块
  optsList:any = [];//存放搜索下拉数据字典
  tableList:any = [];//存放表格数据
  rows:any = 10;//分页
  selected: any = [];//表格选中数据


  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
    this.GetList.lzcxOpts().catch(res => {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res}];
      return;
    }).then(res => {
      this.optsList = res;
    });
    this.getTableList();
  }
  constructor(@Inject(GetList) getList: GetList,private confirmationService: ConfirmationService) {
    this.GetList = getList;
  }

  //获取表格数据
  getTableList() {
    let optsData = {
      documentName:"",username:"",nodeId:"",departmentId:"",beginDate:"",endDate:"",pageNum:"",pageSize:""
    }
    optsData.documentName = this.documentName?this.documentName:"";
    optsData.username = this.username?this.username:"";
    optsData.nodeId = this.nodeId?this.nodeId:"";
    optsData.departmentId = this.departmentId?this.departmentId:"";
    optsData.beginDate = this.beginDate?this.getFormetDate(this.beginDate):"";
    optsData.endDate = this.endDate?this.getFormetDate(this.endDate):"";
    optsData.pageNum = this.pageNum?this.pageNum:"";
    optsData.pageSize = this.pageSize?this.pageSize:"";
    this.GetList.lzcxDataList(optsData).catch(res => {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res}];
      return;
    }).then(res => {
      this.tableList = res.list;
      this.pageSize = res.pageSize;
      this.pageNum = res.pageNum;
      this.total = res.total;
    });
  }
  paginate(event) {
    this.pageSize = event.rows;
    this.pageNum = event.page + 1;
    this.getTableList();
  }
  //格式化日期
  getFormetDate(time:any) {
    const Dates = new Date( time );
    const year: number = Dates.getFullYear();
    const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + '-' + month + '-' + day;
  }
  // ===========================
  // 搜索
  refresh() {
    this.getTableList();
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
    this.documentName = "";
    this.username = "";
    this.nodeId = "";
    this.departmentId = "";
    this.beginDate = "";
    this.endDate = "";
    this.pageNum = "";
    this.pageSize = "";
    this.getTableList();
  }
  // 取消
  cancel() {
    this.isadSearch = 0;
  }
  //删除
  msgs: Message[] = [];
  delete() {
    if(this.selected.length == 0) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:'请选择要删除的项'}];
      return;
    }
    this.confirmationService.confirm({
      message: '删除后无法恢复！',
      header: '你确定删除吗？',
      icon: 'fa fa-question-circle',
      accept: () => {
        let deleteList = [];
        for(let i = 0; i < this.selected.length; i++){
          deleteList.push(this.selected[i].id);
        }
        this.GetList.lzcxDataList(deleteList).catch(res => {
          this.msgs = [];
          this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
          return;
        }).then(res => {
          if(res.code == 0) {
            this.getTableList();
            this.msgs = [{severity:'success', summary:'成功提示', detail:'删除成功'}];
          }
        })
      },
      reject: () => {
          // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
  });
  }
}