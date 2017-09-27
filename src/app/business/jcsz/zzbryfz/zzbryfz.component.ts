import { Component, OnInit, Inject, ViewChild, Attribute } from '@angular/core';
import { GetList } from '../../services/getlist';
import { PostService } from '../../services/post.service';

import 'rxjs/add/operator/toPromise';
// 导入表格组件
import { TreeNode, Message, MenuItem, ConfirmationService, SelectItem } from 'primeng/primeng';

// 获取页面高度
import { Auxiliary } from '../../../common/constants/auxiliary';

@Component({
  selector: 'app-zzbryfz',
  templateUrl: './zzbryfz.component.html',
  styleUrls: ['./zzbryfz.component.css'],
  providers: [ConfirmationService]
})
export class ZzbryfzComponent implements OnInit {

  private GetList: GetList;
  private PostService: PostService;

  // 获取表格数据
  dataList: any[];
  dataListCode: any[];
  msgs: Message[] = [];

  // 下拉部门组
  findCourseDataList: SelectItem[];
  findCourseList: SelectItem[];

  // 下拉排版员或领导
  userpostFindTypeList: SelectItem[];
  userpostFindType: SelectItem[];

  // 分页
  rows: number;
  pageLinks: number;
  // level 组别
  postid: string = '-1';
  postId: number;
  // name 人员
  name: string = '';
  // joblvListId 技能等级
  joblvListId: number = 0;

  pageNum: number = 1;
  pageSize: number = 10;

  leader: number;
  id: number;
  postIdchangeId: number;
  leaderChangeId: number;

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
    this.dataList = [];
    let nameList = {
      postid: this.postid,
      name: this.name,
      pageNum: this.pageNum,
      pageSize: this.pageSize
    }
    this.GetList.userpostList(nameList).then(res => {
      this.rows = res.pageSize;
      this.pageLinks = res.totalCount;
      this.dataList = res.nodeList;
    })
  }

  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
    this.jobList();
    // 获取下拉部门组
    this.GetList.userpostFindPost().then(res => this.findCourseList = this.bindpage(res.postList, 'name'));
    // 下拉排版员或领导
    this.GetList.userpostFindType().then(res => this.userpostFindType = this.bindpage(res.list, 'text'));
    
  }

  // 下拉修改
  postList(){
    let list = {
      userId: this.id,
      postId: this.postId,
      leader: this.leader
    }
    this.PostService.updateUserPost(list).then(res => {
      if (res.code == 0) {
        this.msgs = [];
        this.msgs = [{severity:'info', summary:'成功提示', detail:'保存成功'}];
        // this.jobList();
      } else {
        this.msgs = [];
        this.msgs = [{severity:'error', summary:'错误提示', detail:'保存失败'}];
      }
    })
  }
  // 下拉组别选择
  postIdchange(itme){
    if(this.findCourseList.length == 0){
      return ;
    }
    console.log(itme)
    console.log(itme.leader)
    // if(itme.)
    this.findCourseList.map(res => {
      if(res.label == itme.postName){
        this.postId = res['valueName']['id']
      }
    })
    this.postIdchangeId = itme.id;

    if(!itme['leader'] && itme['leader'] != undefined){
      this.leaderChangeId = itme.id;
      this.leader = itme.leader;
    }
    if(this.postIdchangeId == this.leaderChangeId){
      this.id = itme.id;
      this.postList();
    }
  }

  // 下拉岗位选择
  leaderChange(itme){
    if(this.findCourseList.length == 0){
      return ;
    }
    this.userpostFindType.map(res => {
      if(res.label == itme.leaderName){
        this.leader = res['valueName']['id']
      }
    })
    this.leaderChangeId = itme.id;
    if(!itme['postId'] && itme['postId'] != undefined){
      this.postIdchangeId = itme.id;
      this.postId = itme.postId;
    }
    if(this.postIdchangeId == this.leaderChangeId){
      this.id = itme.id;
      this.postList();
    }
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
