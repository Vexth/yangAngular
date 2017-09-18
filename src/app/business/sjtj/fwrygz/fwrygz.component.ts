import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { GetList } from '../../services/getlist';
import { PostService } from '../../services/post.service';

import * as moment from 'moment'

import 'rxjs/add/operator/toPromise';
// 导入表格组件
import { Header, Footer, TreeNode, Message, MenuItem, ConfirmationService } from 'primeng/primeng';

// 获取页面高度
import { Auxiliary } from '../../../common/constants/auxiliary';

@Component({
  selector: 'app-fwrygz',
  templateUrl: './fwrygz.component.html',
  styleUrls: ['./fwrygz.component.css'],
  providers: [ConfirmationService]
})
export class FwrygzComponent implements OnInit {
  private GetList: GetList;
  private PostService: PostService;
  pageNews: number[] = [];
  zh: any;
  // @ViewChild('spgzlopen') public spgzlopen: SpgzlopenComponent;

  // 获取表格数据
  dataList: any[];
  dataListCode: any[];
  msgs: Message[] = [];
  // 分页
  rows: number;
  pageLinks: number;
  emptyList = {
    name: '',
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

  constructor(
    @Inject(GetList) getList: GetList,
    @Inject('title') private titleService,
    private confirmationService: ConfirmationService,
    @Inject(PostService) postService: PostService
  ) {
    this.GetList = getList;
    this.PostService = postService;
    this.titleService.setTitle("审批工作量");
  }

  bindpage (name: number): void {

    this.GetList.tongjiWaiList(this.emptyList).then(res => {
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
      dayNamesMin: ["日","一","二","三","四","五","六"],
      monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
      monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
      today: 'Today',
      clear: 'Clear'
    };
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.maxDate = new Date();
    this.maxDate.setFullYear(nextYear);
    
    this.bindpage(0);
    Auxiliary.prototype.ControlHeight();
  }

  formatDate (date) {  
    let y = date.getFullYear();  
    let m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    let d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    // return y + '-' + m + '-' + d;  
    return y + '-' + m;
  }

  paginate(event){
    this.emptyList.pageSize = event.rows;
    this.emptyList.pageNum = event.page + 1;
    this.bindpage(0);
  }

  // 查询
  query () {
    this.dataListCode = [];
    this.emptyList.name = this.findUserListId;
    this.emptyList.bearDate = this.bearDate == null ? this.formatDate(new Date()) : this.formatDate(this.bearDate)
    this.bindpage(0);
  }

  // 计算
  tongjiWaiWages () {
    if (this.bearDate == null) {
      this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请选择期间' });
    } else {
      this.confirmationService.confirm({
        message: '确定要计算吗?',
        header: '提示',
        icon: 'fa fa-question-circle',
        accept: () => {
          let date = this.formatDate(this.bearDate);
          this.GetList.tongjiWaiWages(date).then(res => {
            if (res.code == 0) {
              this.msgs = [{severity:'info', summary:'成功', detail:'计算成功'}];
              this.query();
            } else {
              this.msgs.push({ severity: 'error', summary: '错误提示', detail: res.msg });
            }
          })
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: '取消', detail: '取消成功' }];
        }
      });
    }
  }

  // 完结
  lockWaiWages () {
    if (this.bearDate == null) {
      this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请选择期间' });
    } else {
      this.confirmationService.confirm({
        message: '完结后不允许再对数据进行修改，确定要完结吗?',
        header: '提示',
        icon: 'fa fa-question-circle',
        accept: () => {
          let date = this.formatDate(this.bearDate);
          this.GetList.tongjiWaiWages(date).then(res => {
            if (res.code == 0) {
              this.msgs = [{severity:'info', summary:'成功', detail:res.msg}];
              this.query();
            } else {
              this.msgs.push({ severity: 'error', summary: '错误提示', detail: res.msg });
            }
          })
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: '取消', detail: '取消成功' }];
        }
      });
    }
  }
}
