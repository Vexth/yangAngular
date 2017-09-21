import { Component, OnInit, Inject, ViewChild, Attribute } from '@angular/core';
import { GetList } from '../../services/getlist';
import { PostService } from '../../services/post.service';

import 'rxjs/add/operator/toPromise';
// 导入表格组件
import { TreeNode, Message, MenuItem, ConfirmationService, SelectItem } from 'primeng/primeng';

// 获取页面高度
import { Auxiliary } from '../../../common/constants/auxiliary';

@Component({
  selector: 'app-ryjndj',
  templateUrl: './ryjndj.component.html',
  styleUrls: ['./ryjndj.component.css'],
  providers: [ConfirmationService]
})
export class RyjndjComponent implements OnInit{

  private GetList: GetList;
  private PostService: PostService;

  // 获取表格数据
  dataList: any[];
  dataListCode: any[];
  msgs: Message[] = [];

  // 获取技能等级
  findCourseDataList: SelectItem[];
  findCourseList: SelectItem[];

  // 分页
  rows: number;
  pageLinks: number;
  // flag 未设置等级
  flag: boolean = false;
  // level 技能等级
  level: string = '-1';
  // name 人员
  name: string = '';
  // joblvListId 技能等级
  joblvListId: number = 0;

  pageNum: number = 1;
  pageSize: number = 10;

  constructor(
    @Inject(GetList) getList: GetList, 
    @Inject('title') private titleService, 
    private confirmationService: ConfirmationService,
    @Inject(PostService) postService: PostService
  ) {
    this.GetList = getList;
    this.PostService = postService;
    this.titleService.setTitle("人员技能等级");
  }

  bindpage(itme, text) {
    let arr = [];
    for (let i = 0; i < itme.length; i++) {
      let resList = {label: '', value: '', valueName: ''}
      resList.label = itme[i][text];
      resList.value = itme[i][text];
      resList.valueName = itme[i];
      arr.push(resList);
    }
    return arr;
  }

  // 获取数据填充表格
  jobList(){
    // this.dataList = [];
    let nameList = {
      flag: Number(this.flag),
      level: this.level,
      name: this.name,
      pageNum: this.pageNum,
      pageSize: this.pageSize
    }
    this.GetList.jobList(nameList).then(res => {
      this.rows = res.pageSize;
      this.pageLinks = res.totalCount;
      this.dataList = res.nodeList;
    })
  }

  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
    this.jobList();
    // 获取技能等级数据
    this.GetList.joblvList(this.joblvListId).then(res => this.findCourseList = this.bindpage(res.joblvList, 'job_name'));
  }

  // 下拉修改数据
  change(itme){
    this.GetList.joblvList(this.joblvListId).then(res => res.joblvList.map(res => {
      if (res.job_name == itme.jobName) {
        return res.id
      }
    })).then(res => {
      let postvalue = {userId: null, jobId: null}
      postvalue.jobId = res.sort()[0];
      postvalue.userId = +itme.id;
      this.PostService.updateJob(postvalue).then(res => {
        if (res.code == 0) {
          this.jobList();
          this.msgs = [{severity:'info', summary:'成功提示', detail:'保存成功'}];
        } else {
          this.msgs = [{severity:'error', summary:'错误提示', detail:'保存失败'}];
        }
      })
    })
  }

  paginate(event){
    this.pageSize = event.rows;
    this.pageNum = event.page + 1;
    this.search();
  }

  // 查询
  search () {
    this.jobList();
  }
}
