import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { GetList } from '../../services/getlist';
import { PostService } from '../../services/post.service';

import {ActivatedRoute} from "@angular/router";

import 'rxjs/add/operator/toPromise';
// 导入表格组件
import { Header, Footer, TreeNode, Message, MenuItem, ConfirmationService } from 'primeng/primeng';

// 弹窗
import { ModalformComponent } from '../../../common/component/modalform/modalform.component';
import { SpgzlopenComponent } from './spgzlopen/spgzlopen.component';
// 公共方法
import { Auxiliary } from '../../../common/constants/auxiliary';

@Component({
  selector: 'app-spgzl',
  templateUrl: './spgzl.component.html',
  styleUrls: ['./spgzl.component.css'],
  providers: [ConfirmationService]
})
export class SpgzlComponent implements OnInit,OnDestroy {
  private GetList: GetList;
  private PostService: PostService;
  zh: any;
  pageNews: number[] = [];
  @ViewChild('spgzlopen') public spgzlopen: SpgzlopenComponent;

  // 获取表格数据
  dataList: any[];
  dataListCode: any[];
  msgs: Message[] = [];
  // 分页
  rows: number;
  pageLinks: number;
  emptyList = {
    documentId: '',
    nodeId: '',
    uId: '',
    statu: null,
    stime: '',
    etime: '',
    pageNum: 1,
    pageSize: 10
  };
  // findNodeOfZzb 流程节点
  findNodeOfZzbId: string = '';
  findNodeOfZzbList: any[];
  // findUserList 人员
  findUserListId: string = '';
  findUserList: any[];
  // statu 计算状态
  statu: string = '0';
  // findProductDoc	产品稿件树
  treeTest: TreeNode[];
  filesTree: TreeNode[];
  selectedFile: TreeNode;
  filesTreeId: string;
  // 下拉树显示隐藏
  hide: number = 0;

  // rangeDates
  rangeDates: string;

  private sub:any;
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

  bindpage (name: number): void {
    this.GetList.workloadChecklist(this.emptyList).then(res => {
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

  onNodeExpand(event: any):void {
    event.originalEvent.stopPropagation();
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
    this.sub = this._activatedRoute.queryParams.subscribe(queryParams=>{
      this.btnFn = Auxiliary.prototype.queryParamsList(queryParams);
    })
    this.emptyList.statu = +this.statu;
    this.bindpage(0);
    this.GetList.findNodeOfZzb().then(res => {
      this.findNodeOfZzbList = [];
      this.findNodeOfZzbList = Auxiliary.prototype.publicList(res, 'nodeName');
    })
    this.GetList.findUserList().then(res => {
      this.findUserList = [];
      this.findUserList = Auxiliary.prototype.publicList(res, 'name');
    })
    this.GetList.findProductDoc().then(res => {
      this.filesTree = res;
      this.treeTest = res;
    });
    Auxiliary.prototype.ControlHeight();
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
  paginate(event){
    this.emptyList.pageSize = event.rows;
    this.emptyList.pageNum = event.page + 1;
    this.bindpage(0);
  }

  formatDate (date) {  
    let y = date.getFullYear();  
    let m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    let d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d;  
  }

  // 查询
  query () {
    this.dataListCode = [];
    this.emptyList.nodeId = this.findNodeOfZzbId == '' ? '' : this.findNodeOfZzbId['nodeId'];
    this.emptyList.uId = this.findUserListId == '' ? '' : this.findUserListId['emp_no'];
    this.emptyList.statu = +this.statu;
    this.emptyList.stime = this.emptyList.stime == '' ? '' : this.formatDate(this.emptyList.stime);
    this.emptyList.etime = this.emptyList.etime == '' ? '' : this.formatDate(this.emptyList.etime);

    this.bindpage(0);
  }

  onFocus(event){
    var This = this;
    var cpLock = false;
    var tree = This.filesTree;
    var treeArr;
    event.target.addEventListener('compositionstart', function(){
        cpLock = true;
    })
    event.target.addEventListener('compositionend', function(){
        cpLock = false;
        if (!cpLock) {
            if (event.target.value != '') {
                treeArr = [];
                for(var i = 0; i < tree.length; i++){
                    if(tree[i].data.indexOf(event.target.value) > -1){
                        treeArr.push(tree[i]);
                    }
                }
                This.filesTree = treeArr;
            } else {
                This.filesTree = This.treeTest;
            }
        }
    })
    event.target.addEventListener('input', function(){
        if (!cpLock) {
            if (event.target.value != '') {
                treeArr = [];
                for(var i = 0; i < tree.length; i++){
                    if(tree[i].data.indexOf(event.target.value) > -1){
                        treeArr.push(tree[i]);
                        console.log(tree[i])
                    }
                }
                This.filesTree = treeArr;
            } else {
                This.filesTree = This.treeTest;
            }
        }
    });
    event.target.addEventListener('propertychange', () => {
        console.log(this.filesTree)
        console.log(event.target.value)
    })

    this.hide = 1;
  }
  onHide(){
    this.hide = 0;
  }
  nodeSelect(event):void{
    this.filesTreeId = event.node.label;
    this.emptyList.documentId = event.node.id;
    this.onHide();
  }

  publicFunc (typeId, obj) {
    let ids, teleit, checkList;
    let newData = this.dataListCode;
    if (newData == undefined) {
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: '错误提示', detail: '请选择你要'+ obj +'的数据！' }];
      return ;
    } else if (newData.length == 0) {
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: '错误提示', detail: '请选择你要'+ obj +'的数据！' }];
      return ;
    } else {
      let arr = [];
      for (let i = 0; i < newData.length; i++) {
        if (obj == '审核') {
          if (newData[i].check_statu != 0) {
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: '错误提示', detail: '只有未审核的数据才能被审核！' }];
            return ;
          }
        } else if (obj == '退回') {
          if (newData[i].check_statu != 1) {
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: '错误提示', detail: '只有已审核的数据才能被退回！' }];
            return ;
          }
        } else if (obj == '删除') {
          if (newData[i].check_statu != 0) {
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: '错误提示', detail: '只有未审核的数据才能被删除！' }];
            return ;
          }
        }
        arr.push(newData[i].id);
      }
      ids = arr.join(',');
      this.confirmationService.confirm({
        message: '确定要'+ obj +'此记录吗?',
        header: obj,
        icon: 'fa fa-question-circle',
        accept: () => {
          let typeData = {
            type: typeId,
            ids: ids
          };
          this.PostService.checkBackDel(typeData).then(res => {
            this.msgs = [];
            this.msgs = [{severity:'info', summary:'成功', detail: obj + '成功'}];
            this.query();
          });
        },
        reject: () => {
          this.msgs = [];
        }
      });
      this.dataListCode = [];
    }
  }

  // 审核
  review(itme): void {
    let typeId = 1;
    this.publicFunc(typeId, itme);
  }
  // 退回
  retreat(itme): void {
    let typeId = 2;
    this.publicFunc(typeId, itme);
  }
  // 删除
  dellList(itme): void {
    let typeId = 3;
    this.publicFunc(typeId, itme);
  }

  // 追加
  add(): void {
    let dataItem = '追加';
    this.spgzlopen.showChildModal(dataItem);
  }

  // 调整
  public edit(): void {
    let flex = this.dataListCode;
    if (flex === undefined) {
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: '错误提示', detail: '请选择你要调整的数据' }];
    } else if (flex.length === 0) {
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: '错误提示', detail: '请选择你要调整的数据' }];
    } else if (flex.length > 1) {
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: '错误提示', detail: '请选择一条数据进行调整' }];
    } else if(flex[0].check_statu != 0){
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: '错误提示', detail: '请选择未审核的数据进行调整' }];
    } else {
      this.confirmationService.confirm({
        message: '确定要调整此记录吗?',
        header: '调整',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.spgzlopen.showChildModal(flex);
          // this.msgs = [{severity:'info', summary:'成功', detail:'调整成功'}];
        },
        reject: () => {
          this.msgs = [];
        }
      });
    }
  }

  // 重置
  resetting () {
    this.findNodeOfZzbId = '';
    this.findUserListId = '';
    this.filesTreeId = null;
    this.emptyList.stime = '';
    this.emptyList.etime = '';
    this.statu = '-1';
    this.query();
  }

  clickFn(event){
    if (event == '追加') {
      this.add()
    } else if (event == '调整') {
      this.edit()
    } else if (event == '删除') {
      this.dellList(event)
    } else if (event == '审核') {
      this.review(event)
    } else if (event == '退回') {
      this.retreat(event)
    }
  }
}
