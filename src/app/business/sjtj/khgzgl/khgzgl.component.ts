import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { GetList } from '../../services/getlist';
import { PostService } from '../../services/post.service';

import * as moment from 'moment'

import 'rxjs/add/operator/toPromise';
// 导入表格组件
import { Header, Footer, TreeNode, Message, MenuItem, ConfirmationService } from 'primeng/primeng';

// 获取页面高度
import { Auxiliary } from '../../../common/constants/auxiliary';

import { InitIalize } from '../../services/doing';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-khgzgl',
  templateUrl: './khgzgl.component.html',
  styleUrls: ['./khgzgl.component.css'],
  providers: [ConfirmationService]
})
export class KhgzglComponent implements OnInit {
  private GetList: GetList;
  private PostService: PostService;
  pageNews: number[] = [];
  zh: any;

  // 获取表格数据
  dataList: any[];
  dataListCode: any[];
  msgs: Message[] = [];
  // 分页
  rows: number;
  pageLinks: number;
  emptyList = {
    name: '',
    level: -1,
    bearDate: this.formatDate(new Date()),
    pageNum: 1,
    pageSize: 10
  };
  // collectionList 技能等级
  collectionId: string = '-1';
  collectionList: any[];
  // findUserList 人员
  findUserListId: string = '';
  findUserList: any[];

  bearDate: string;

  maxDate: Date;
  btnFn: any;

  constructor(
    @Inject(GetList) getList: GetList,
    @Inject('title') private titleService,
    private confirmationService: ConfirmationService,
    private _activatedRoute: ActivatedRoute,
    @Inject(PostService) postService: PostService
  ) {
    this.GetList = getList;
    this.PostService = postService;
    this.titleService.setTitle("审批工作量");
  }

  bindpage(name: number): void {

    this.GetList.tongjiList(this.emptyList).then(res => {
      if (res.code) {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: '错误提示', detail: res.msg }];
        this.dataList = [];
        return;
      }
      this.dataListCode = [];
      if (res.checkList != undefined) {
        this.dataList = res.checkList;
        this.rows = res.pageSize;
        this.pageLinks = res.totalCount;
      } else {
        this.dataList = [];
      }
    })
  }

  ngOnInit() {
    this.zh = {
      firstDayOfWeek: 0,
      dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
      monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      today: 'Today',
      clear: 'Clear'
    };
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.maxDate = new Date();
    // this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    this.GetList.joblvList(-1).then(res => this.collectionList = res.joblvList);
    this.bindpage(0);
    this.GetList.findUserList().then(res => {
      this.findUserList = [];
      this.findUserList = Auxiliary.prototype.publicList(res, 'name');
    });

    this._activatedRoute.queryParams.subscribe(queryParams=>{
      this.btnFn = Auxiliary.prototype.queryParamsList(queryParams);
    })
    Auxiliary.prototype.ControlHeight();
  }

  paginate(event) {
    this.emptyList.pageSize = event.rows;
    this.emptyList.pageNum = event.page + 1;
    this.bindpage(0);
  }

  formatDate(date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    // return y + '-' + m + '-' + d;  
    return y + '-' + m;
  }

  // 查询
  query() {
    this.dataListCode = [];
    this.emptyList.level = +this.collectionId;
    // this.emptyList.name = this.findUserListId['id'];
    this.emptyList.name = this.findUserListId == '' ? '' : this.findUserListId['emp_no'];
    this.emptyList.bearDate = this.bearDate == null ? this.formatDate(new Date()) : this.bearDate;
    this.bindpage(0);
  }

  // 计算
  tongjiWages() {
    if (this.bearDate == null) {
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: '错误提示', detail: '请选择期间' }];
    } else {
      this.confirmationService.confirm({
        message: '确定要计算吗?',
        header: '提示',
        icon: 'fa fa-question-circle',
        accept: () => {
          InitIalize.prototype.initialize();
          // let date = this.formatDate(this.bearDate);
          let date = this.bearDate;
          this.GetList.tongjiWages(date).then(res => {
            if (res.code == 0) {
              this.msgs = [];
              this.msgs = [{ severity: 'info', summary: '成功', detail: '计算成功' }];
              InitIalize.prototype.endializ();
              this.query();
            } else {
              this.msgs = [];
              this.msgs = [{ severity: 'error', summary: '错误提示', detail: res.msg }];
              InitIalize.prototype.endializ();
            }
          })
        },
        reject: () => {
          this.msgs = [];
        }
      });
    }
  }

  // 完结
  lockWages() {
    if (this.bearDate == '') {
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: '错误提示', detail: '请选择期间' }];
    } else {
      this.confirmationService.confirm({
        message: '完结后不允许再对数据进行修改，确定要完结吗?',
        header: '提示',
        icon: 'fa fa-question-circle',
        accept: () => {
          // let date = this.formatDate(this.bearDate);
          InitIalize.prototype.initialize();
          let date = this.bearDate;
          this.GetList.lockWages(date).then(res => {
            if (res.code == 0) {
              this.msgs = [];
              this.msgs = [{ severity: 'info', summary: '成功', detail: res.msg }];
              InitIalize.prototype.endializ();
              this.query();
            } else {
              this.msgs = [];
              this.msgs = [{ severity: 'error', summary: '错误提示', detail: res.msg }];
              InitIalize.prototype.endializ();
            }
          })
        },
        reject: () => {
          this.msgs = [];
          // this.msgs = [{ severity: 'info', summary: '取消', detail: '取消成功' }];
        }
      });
    }
  }

  // 双击修改
  ShowElement(element, itme) {
    if (itme.statu == 1) {
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: '错误提示', detail: '已完结不能修改' }];
      return;
    }
    let oldhtml = element.target.innerHTML;
    let newobj = document.createElement('input');
    newobj.type = 'text';
    newobj.style.width = '100%';
    newobj.style.height = '32px';
    newobj.onkeyup = function(){
      newobj.value = newobj.value.replace(/[^\- \d.]/g,"");  //清除“数字”和“.”以外的字符     
      newobj.value = newobj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
      newobj.value = newobj.value.replace(/\-{2,}/g,"-"); //只保留第一个- 清除多余的
    }
    // newobj.maxLength = 5;
    //为新增元素添加value值
    newobj.value = oldhtml;
    //为新增元素添加光标离开事件
    newobj.addEventListener('blur', () => {
      //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值 
      // element.target.innerHTML = newobj.value == oldhtml ? oldhtml : newobj.value;
      if (newobj.value == oldhtml) {
        element.target.innerHTML = oldhtml;
        return;
      } else {
        element.target.innerHTML = newobj.value;
        let list = {
          id: itme.id,
          innerMoney: +element.target.innerHTML
        }
        this.PostService.updateUserInnerMoney(list).then(res => {
          if (res.code == 0) {
            this.msgs = [];
            this.msgs = [{ severity: 'info', summary: '成功', detail: '成功' }];
            this.query();
          } else {
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: '错误提示', detail: res.msg }];
          }
        })
      }
    });
    element.target.innerHTML = '';
    element.target.appendChild(newobj);
    newobj.setSelectionRange(0, oldhtml.length);
    newobj.focus();
  }

  // 重置
  resetting() {
    this.bearDate = null;
    this.findUserListId = '';
    this.collectionId = '-1';
    this.query();
  }

  // 导出
  tongjiListExcel(){
    if (!this.bearDate) {
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: '错误提示', detail: '请选择日期' }];
      return ;
    }
    let url = `http://192.168.230.240:8000/api/tongji/tongjiListExcel?name=${this.findUserListId}&level=${this.collectionId}&bearDate=${this.bearDate}`;
    window.open(url)
    // var a = document.createElement('a');
    // a.href = `http://192.168.230.240:8888/api/tongji/tongjiListExcel?name=${this.findUserListId}&level=${this.collectionId}&bearDate=${this.bearDate}`;
    // a.click();
  }
  clickFn(event){
    if (event == '计算') {
      this.tongjiWages()
    } else if (event == '完结') {
      this.lockWages()
    } else if (event == '导出') {
      this.tongjiListExcel();
    }
  }
}
