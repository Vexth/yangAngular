import { Component, OnInit, Inject, ViewChild, Attribute } from '@angular/core';
import { GetList } from '../../services/getlist';
import { PostService } from '../../services/post.service';

import 'rxjs/add/operator/toPromise';
// 导入表格组件
import { TreeNode, Message, MenuItem, ConfirmationService, SelectItem } from 'primeng/primeng';

// 获取页面高度
import { Auxiliary } from '../../../common/constants/auxiliary';

@Component({
  selector: 'app-xswh',
  templateUrl: './xswh.component.html',
  styleUrls: ['./xswh.component.css'],
  providers: [ConfirmationService]
})
export class XswhComponent implements OnInit{
  // 获取tab切换的值
  ListFindType: any[];

  private GetList: GetList;
  private PostService: PostService;
  pageNews:number[] = [];

  // 获取表格数据
  dataList: any[];
  dataListCode: any[];
  msgs: Message[] = [];

  username: string = '1';
  unit: any = {id: 201, text: '图书'};//单选下拉框
  unitList: SelectItem[];

  // newRatio 修改后的ratio值
  newRatio: number;

  courseClassId: number;

  // 科目/年级
  findCourse: any;
  findCourseList: SelectItem[];

  constructor(
    @Inject(GetList) getList: GetList, 
    @Inject('title') private titleService, 
    private confirmationService: ConfirmationService,
    @Inject(PostService) postService: PostService
  ) {
    this.GetList = getList;
    this.PostService = postService;
    this.titleService.setTitle("系数维护");
  }

  bindpage(itme, text) {
    let arr = [];
    for (let i = 0; i < itme.length; i++) {
      let resList = {label: '', value: ''}
      resList.label = itme[i][text];
      resList.value = itme[i];
      arr.push(resList);
    }
    return arr;
  }

  ngOnInit() {
    this.GetList.findTab().then(res => this.ListFindType = res);
    this.ColToggler(this.username);
    this.GetList.GetListFindType().then(res => this.unitList = this.bindpage(res, 'text')); // 产品类别
    Auxiliary.prototype.ControlHeight();
  }

  // 新增
  add(){
    let tabid = +this.username;
    let typeid;
    if(tabid === 1){
      typeid = this.unit != undefined ? this.unit.id : '';
    }
    let addNew = { tabType: tabid, type: typeid, courseClassId: null, ratio: null, a: ''};
    this.dataList.push(addNew);
  }

  // 保存
  conserve (itme) {
    if(this.newRatio != undefined){
      itme.ratio = +this.newRatio;
    }
    itme.tabType = +this.username;
    if(itme.a == ''){
      itme.courseClassId = this.courseClassId
    } else {
      itme.courseClassId = itme.course_class_id
    }
    this.PostService.addUpdateRatio(itme).then(res => {
      if(res.code === 0){
        this.msgs = [];
        this.ColToggler(this.username);
        this.msgs.push({severity:'info', summary:'成功提示', detail:'保存成功'});
      } else {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'错误提示', detail:res.msg});
      }
    }).then(res => {this.newRatio = null;});
  }

  // tab切换
  ColToggler(itme: any){
    this.username = '';
    this.findCourseList = [];
    this.findCourse = null;
    this.username = itme;
    let tabid = itme - 0;
    let typeid;
    (tabid !== 1) ? (typeid = '') : (typeid = this.unit.id);
    tabid === 5 
    ? this.GetList.findClass().then(res => this.findCourseList = this.bindpage(res, 'class_name')) // 年级
    : this.GetList.findCourse().then(res => this.findCourseList = this.bindpage(res, 'course_name')); // 学科
    this.dataLiat(tabid, typeid);
  }

  // 下拉切换数据
  OnChange () {
    let tabid = +this.username;
    let typeid = this.unit != undefined ? this.unit.id : '';
    this.dataLiat(tabid, typeid);
  }

  // 表格数据
  dataLiat(tabid, typeid){
    this.dataList = [];
    this.dataListCode = [];
    this.GetList.ratioList(tabid, typeid).then(res => this.dataList = res);
  }

  // 表格中下拉框选中的参数
  findex (itme) {
    // console.log(itme)
    this.courseClassId = this.findCourse.id;
    // this.courseClassId = itme.value.id;
    this.conserve(itme);
  }

  // 双击修改
  ShowElement(element, list) {
    // console.log(list)
    let oldhtml = element.target.innerHTML;
    //创建新的input元素
    let newobj = document.createElement('input');
    //为新增元素添加类型
    newobj.type = 'text';
    newobj.style.width = '80px';
    newobj.maxLength = 5;
    //为新增元素添加value值
    newobj.value = oldhtml;
    //为新增元素添加光标离开事件
    newobj.addEventListener('blur', () => {
      if(newobj.value == oldhtml){
        element.target.innerHTML = oldhtml;
        return ;
      } else {
        element.target.innerHTML = newobj.value;
        this.newRatio = element.target.innerHTML;
        this.conserve(list);
      }
      //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值 
      // element.target.innerHTML = newobj.value == oldhtml ? oldhtml : newobj.value;
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
}
