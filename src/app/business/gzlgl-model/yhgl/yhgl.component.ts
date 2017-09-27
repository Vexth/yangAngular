import {Component, OnInit, Inject, ViewChild ,Injectable} from '@angular/core';

import { Auxiliary } from '../../../common/constants/auxiliary';
import { Message,ConfirmationService} from 'primeng/primeng';//右上角提示框组件，删除对话框
import { yhgljsComponent } from './yhglJS/yhglJS.component';
import { yhgldeptComponent } from './yhglJS/yhglDept.component';

import { GetList } from '../../services/getlist';

@Component({
  selector: 'app-yhgl',
  templateUrl: './yhgl.component.html',
  styleUrls: ['./yhgl.component.css'],
})
export class YhglComponent implements OnInit {
  private GetList:GetList;
  msgs: Message[] = [];
  deptList:any = [];
  deptData:any = "";
  nameOrId:any = "";
  total:any = 10;
  pageSize:any = 10;
  pageNum:any = 1;
  selected:any = {};
  @ViewChild('yhglJS') public yhglJS:yhgljsComponent;
  @ViewChild('yhglDept') public yhglDept:yhgldeptComponent;
  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
    this.getDept();
    this.getFormData();
  }
  constructor(private confirmationService: ConfirmationService,@Inject(GetList) getList: GetList) {
    this.GetList = getList;
  }

  //获取部门
  getDept() {
    this.deptList = [];
    this.GetList.yhglGetDept().catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res}];
      return;
    }).then(res=>{
      this.deptList = res;
    })
  }
  formDataList: any = [];
  //获取页面表格数据
  getFormData() {
    this.selected = {};
    let postData = {
      pageNum:this.pageNum,pageSize:this.pageSize,nameOrId:this.nameOrId,treeSign:this.deptData
    }
    this.GetList.yhglGetFromData(postData).catch(res=>{
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:res}];
      return;
    }).then(res=>{
      res.list.forEach((x,i) => {
        let departmentArr = [];let roleArr = [];let departmentIdArr = []; let roleIdArr = [];
        for(let j = 0; j < x.departments.length; j++){
          departmentArr.push(x.departments[j].name);
          departmentIdArr.push(x.departments[j].id);
        }
        for(let k = 0; k < x.roles.length; k++){
          roleArr.push(x.roles[k].name);
          roleIdArr.push(x.roles[k].id);
        }
        x["departmentStr"] = departmentArr.join(",");
        x["departmentIdArr"] = departmentIdArr;
        x["roleStr"] = roleArr.join(",");
        x["roleIdArr"] = roleIdArr;
      });
      this.pageSize = res.pageSize;
      this.pageNum = res.pageNum;
      this.total = (+res.totalPages)*(+res.pageSize);
      this.formDataList = [];
      this.formDataList = res.list;
    });
  }
  paginate(event){
    this.pageSize = event.rows;
    this.pageNum = event.page + 1;
    this.getFormData();
  }
  // ===========================
  // 搜索
  refresh() {
    this.pageSize= 10;
    this.pageNum = 1;
    this.getFormData();
  }
  // 重置
  clearOpts() {
    this.selected = {};
    this.deptData = "";
    this.nameOrId = "";
    this.getFormData();
  }
  role() {
    console.log(this.selected);
    if(!this.selected.id) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请选择一条进行设置"}];
      return;
    }
    this.yhglJS.yhglJSShow(this.selected);
  }
  public saveJSChange():void{
    console.log("刷新");
    this.clearOpts();
  }

  dept() {
    if(!this.selected.id) {
      this.msgs = [];
      this.msgs = [{severity:'error', summary:'错误提示', detail:"请选择一条进行设置"}];
      return;
    }
    this.yhglDept.yhglDeptShow(this.selected,this.deptList);
  }
  public saveDeptChange():void{
    console.log("刷新");
    this.clearOpts();
  }
}