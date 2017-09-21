import { Component, OnInit, Inject, ViewChild, Attribute } from '@angular/core';
import { GetList } from '../../services/getlist';
import { PostService } from '../../services/post.service';

import 'rxjs/add/operator/toPromise';
// 导入表格组件
import { TreeNode, Message, MenuItem, ConfirmationService, SelectItem } from 'primeng/primeng';

// 获取页面高度
import { Auxiliary } from '../../../common/constants/auxiliary';

@Component({
  selector: 'app-kmgfh',
  templateUrl: './kmgfh.component.html',
  styleUrls: ['./kmgfh.component.css'],
  providers: [ConfirmationService]
})
export class KmgfhComponent implements OnInit{

  private GetList: GetList;
  private PostService: PostService;

  // 获取表格数据
  dataList: any[];
  dataListCode: any[];
  name: string = '';
  msgs: Message[] = [];

  // 获取学科
  findCourseDataList: SelectItem[];
  findCourseList: SelectItem[];

  // 分页
  rows: number;
  pageLinks: number;
  pageNum: number = 1;
  pageSize: number = 10;

  text: string;

  constructor(
    @Inject(GetList) getList: GetList, 
    @Inject('title') private titleService, 
    private confirmationService: ConfirmationService,
    @Inject(PostService) postService: PostService
  ) {
    this.GetList = getList;
    this.PostService = postService;
    this.titleService.setTitle("科目规范化");
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

  paginate(event){
    this.pageSize = event.rows;
    this.pageNum = event.page + 1;
    this.search();
  }

  // 获取数据填充表格
  crList(){
    let list = {
      name: this.name,
      pageNum: this.pageNum,
      pageSize: this.pageSize
    }
    this.GetList.crList(list).then(res => {
      this.rows = res.pageSize;
      this.pageLinks = res.totalCount;
      this.dataList = res.nodeList;
    })
  }

  // 获取学科数据
  findCourse () {
    this.GetList.findCourse().then(res => this.findCourseDataList = res);
  }

  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
    this.crList();
    this.GetList.findCourse().then(res => this.findCourseList = this.bindpage(res, 'course_name'));
  }

  // 下拉修改数据
  change(itme){
    this.GetList.findCourse().then(res => res.map(res => {
      if (res.course_name == itme.course_name) {
        return res.id
      }
    })).then(res => {
      let postvalue = {courseId: '', commonId: ''}
      postvalue.courseId = res.sort()[0];
      postvalue.commonId = itme.id;
      this.PostService.crUpdateCourse(postvalue).then(res => {
        this.crList();
        this.msgs = [{severity:'info', summary:'成功提示', detail:'保存成功'}];
      })
    })
  }

  // 搜索
  search () {
    this.name = this.text;
    this.crList();
  }
}
