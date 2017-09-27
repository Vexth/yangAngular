import { Component, OnInit, ViewChild, Input, Inject, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/observable/of';
import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';
// import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective, ModalModule, ModalOptions } from 'ngx-bootstrap/modal';
import { GetList } from '../../../services/getlist';
import { PostService } from '../../../services/post.service';
import { FormsModule } from '@angular/forms';

import { Auxiliary } from '../../../../common/constants/auxiliary';

import { SelectItem, Message, MenuItem, TreeNode } from 'primeng/primeng';

@Component({
  selector: 'app-spgzlopen',
  templateUrl: './spgzlopen.component.html',
  styleUrls: ['./spgzlopen.component.css']
})
export class SpgzlopenComponent implements OnInit {
  msgs: Message[] = [];
  zh: any;
  // findUserList 人员
  findUserListId: any;
  findUserList: SelectItem[];
  empNo: any;

  // 流程节点
  findNodeOfZzbList: SelectItem[];
  findNodeOfZzbListCode: any;
  // findProductDoc	产品稿件树
  treeTest: TreeNode[];
  filesTree: TreeNode[];
  selectedFile: TreeNode;
  filesTreeId: string;
  // 下拉树显示隐藏
  hide: number = 0;
  // 追加日期
  gmtCreate: string;
  // 稿件ID
  documentId: number;
  // 流程节点ID
  nodeId: number;
  // 人员ID
  userId: number;
  // 工作量
  checkCalcWorkload: number;
  // 手动、自动
  calc: string;
  checkDanweiCount: number;
  checkDawei: string;
  unit: string;

  checkYemaCount: number;
  checkXgCount: number;

  checkHtCount: number;
  is_huat: boolean;

  checkTtCount: number;
  is_tiaot: boolean;

  checkDtkCount: number;
  is_datika: boolean;

  // 年级
  njName: string;
  // 学科
  xkName: string;
  // 分类
  typeName: string;
  // 流程节点
  nodeName: string;
  // 记录id
  id: number;

  // 判断显示隐藏
  xglBoolean: boolean;
  ymlBoolean: boolean;
  huatBoolean: boolean;
  tiaotBoolean: boolean;
  datikaBoolean: boolean;
  houqiBoolean: boolean;
  dwlBoolean: boolean;

  private PostService: PostService;

  private GetList: GetList;
  @ViewChild('childModal') public childModal: ModalDirective;
  @Input() Title: string = '表单模板页';
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  IsAdd: boolean;
  ShowType: string;

  constructor( @Inject(GetList) getList: GetList, @Inject(PostService) postService: PostService) {
    this.GetList = getList;
    this.PostService = postService;
    this.IsAdd = true;
    this.ShowType = '编辑';
  }

  onNodeExpand(event: any): void {
    event.originalEvent.stopPropagation();
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
    this.GetList.getProductDoc().then(res => {
      this.filesTree = res;
      this.treeTest = res;
    })
    this.GetList.findNodeOfZzb().then(res => {
      this.findNodeOfZzbList = [];
      this.findNodeOfZzbList = Auxiliary.prototype.publicList(res, 'nodeName');
    })
    this.GetList.findUserList().then(res => {
      this.findUserList = [];
      this.findUserList = Auxiliary.prototype.publicList(res, 'name');
    })
  }

  formatDate(date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
  }

  noChange() {
    if (this.calc == '0') {
      this.checkCalcWorkload = null;
    } else {
      this.checkCalcWorkload = null;
      this.checkDanweiCount = null;
      this.unit = '';
      this.checkYemaCount = null
      this.checkXgCount = null
      this.checkHtCount = null
      this.checkTtCount = null
      this.checkDtkCount = null
    }
  }

  hideList() {
    this.hide = 0;
  }

  nodeSelect(event): void {
    this.filesTreeId = event.node.label;
    this.documentId = event.node.id
    this.hideList();
    this.onChange();
  }

  onFocus(event) {
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

  zzDocument(documentId: number, nodeId: number): void {
    this.xglBoolean = false;
    this.ymlBoolean = false;
    this.huatBoolean = false;
    this.tiaotBoolean = false;
    this.datikaBoolean = false;
    this.houqiBoolean = false;
    this.dwlBoolean = false;
    this.GetList.zzdocument(documentId, nodeId).then(res => {
      if(res == undefined){
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: '错误提示', detail: '该节点未设置计算公式' }];
        return;
      }
      if (res['is_lp'] != false) {
        this.xglBoolean = true;
        if (res.unit == '页') {
          this.dwlBoolean = true;
        } else {
          this.dwlBoolean = true;
          this.ymlBoolean = true;
        }
      }

      if (res['is_huat'] != false) {
        this.huatBoolean = true;
      }
      if (res['is_tiaot'] != false) {
        this.tiaotBoolean = true;
      }
      if (res['is_datika'] != false) {
        this.datikaBoolean = true;
      }

      if (res['is_houqi'] != false) {
        this.dwlBoolean = true;
      }


      this.unit = res.unit;
    })
  }
  onChange() {
    if (this.documentId == undefined) {
      return;
    }
    if (this.findNodeOfZzbListCode == undefined) {
      return;
    }
    this.nodeId = this.findNodeOfZzbListCode.nodeId;
    this.zzDocument(this.documentId, this.nodeId);
  }

  // 计算
  workloadCalc() {
    let list = {
      documentId: this.documentId,
      nodeId: this.nodeId,
      checkDanweiCount: this.checkDanweiCount == undefined ? null : +this.checkDanweiCount,
      checkDawei: this.unit,
      checkYemaCount: this.checkYemaCount == undefined ? null : +this.checkYemaCount,
      checkXgCount: this.checkXgCount == undefined ? null : +this.checkXgCount,
      checkHtCount: this.checkHtCount == undefined ? null : +this.checkHtCount,
      checkTtCount: this.checkTtCount == undefined ? null : +this.checkTtCount,
      checkDtkCount: this.checkDtkCount == undefined ? null : +this.checkDtkCount
    }
    this.PostService.workloadCalc(list).then(res => {
      this.msgs = [];
      if (res.code == 0) {
        this.checkCalcWorkload = res.data;
      } else {
        this.msgs = [{ severity: 'error', summary: '错误提示', detail: res.msg }];
      }
    })
  }

  public showChildModal(dataItem: any): void {
    if (dataItem == '追加') {
      this.ShowType = '追加';
      this.IsAdd = true;
      // 姓名
      this.findUserListId = null;
      // 工号
      this.empNo = null;
      // 时间
      this.gmtCreate = null;
      // 稿件
      this.filesTreeId = null;
      // 年级
      this.njName = null;
      // 学科
      this.xkName = null;
      // 流程节点
      this.nodeName = null;
      // 分类
      this.typeName = null;
      // 自动、手动
      this.calc = null;
      // 单位
      this.unit = null;
      // 工作量
      this.checkCalcWorkload = null;

      this.documentId = null;
      this.nodeId = null;
      this.checkDanweiCount = null;
      this.checkDtkCount = null;
      this.checkDawei = null;
      this.checkHtCount = null;
      this.checkTtCount = null;
      this.checkXgCount = null;
      this.checkYemaCount = null;
      this.userId = null;
      this.id = null;

      this.selectedFile = null;
      this.findNodeOfZzbListCode = null;
    } else {
      this.ShowType = '调整';
      this.IsAdd = false;
      // 姓名
      this.findUserListId = dataItem[0].userName;
      // 工号
      this.empNo = dataItem[0].empNo;
      // 时间
      this.gmtCreate = dataItem[0].gmt_create;
      // 稿件
      this.filesTreeId = dataItem[0].workName;
      // 年级
      this.njName = dataItem[0].njName;
      // 学科
      this.xkName = dataItem[0].xkName;
      // 流程节点
      this.nodeName = dataItem[0].nodeName;
      // 分类
      this.typeName = dataItem[0].typeName;
      // 自动、手动
      this.calc = dataItem[0].calc.toString();
      // 单位
      this.unit = dataItem[0].check_dawei;
      // 工作量
      this.checkCalcWorkload = dataItem[0].check_calc_workload

      this.documentId = dataItem[0].document_id
      this.nodeId = dataItem[0].node_id
      this.checkDanweiCount = dataItem[0].check_danwei_count
      this.checkDtkCount = dataItem[0].check_dtk_count
      this.checkDawei = dataItem[0].check_dawei
      this.checkHtCount = dataItem[0].check_ht_count
      this.checkTtCount = dataItem[0].check_tt_count
      this.checkXgCount = dataItem[0].check_xg_count
      this.checkYemaCount = dataItem[0].check_yema_count
      this.userId = dataItem[0].user_id
      this.id = dataItem[0].id
      this.zzDocument(this.documentId, this.nodeId);
    }
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  public onSubmit(formValue: any): void {
    // if (!this.checkCalcWorkload || this.checkCalcWorkload.toString() == '') {
    //   this.msgs = [];
    //   this.msgs = [{ severity: 'error', summary: '错误提示', detail: '工作量不能为空' }];
    //   return;
    // }
    if (this.ShowType == '追加') {
      if (!this.gmtCreate) {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: '错误提示', detail: '请选择追加日期' }];
        return;
      }
      if (!this.findUserListId) {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: '错误提示', detail: '请选择追加人员' }];
        return;
      }
      if (!this.findNodeOfZzbListCode) {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: '错误提示', detail: '请选择流程节点' }];
        return;
      }
      if (!this.filesTreeId) {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: '错误提示', detail: '请选择稿件' }];
        return;
      }
      if (!this.calc) {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: '错误提示', detail: '请选择工作量计算方式' }];
        return;
      }
      let list = {
        calc: +this.calc,
        gmtCreate: this.formatDate(this.gmtCreate),
        userId: this.findUserListId.id,
        documentId: this.documentId,
        nodeId: this.nodeId,
        checkCalcWorkload: +this.checkCalcWorkload,

        checkDanweiCount: +this.calc == 0 ? (this.checkDanweiCount == undefined ? null : +this.checkDanweiCount) : null,
        checkDawei: +this.calc == 0 ? this.unit : undefined,
        checkYemaCount: +this.calc == 0 ? (this.checkYemaCount == undefined ? null : +this.checkYemaCount) : null,
        checkXgCount: +this.calc == 0 ? (this.checkXgCount == undefined ? null : +this.checkXgCount) : null,
        checkHtCount: +this.calc == 0 ? this.checkHtCount == undefined ? null : +this.checkHtCount : null,
        checkTtCount: +this.calc == 0 ? this.checkTtCount == undefined ? null : +this.checkTtCount : null,
        checkDtkCount: +this.calc == 0 ? this.checkDtkCount == undefined ? null : +this.checkDtkCount : null
      }
      this.PostService.addOfCheck(list).then(res => {
        if (res.code == 0) {
          this.change.emit();
          this.hideChildModal();
          this.msgs = [];
          this.msgs = [{ severity:'info', summary:'成功', detail: '成功' }];
        } else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: '错误提示', detail: res.msg }];
        }
      });
    } else if (this.ShowType == '调整') {
      let list = {
        calc: +this.calc,
        id: this.id,
        documentId: this.documentId,
        nodeId: this.nodeId,
        checkCalcWorkload: +this.checkCalcWorkload,

        checkDanweiCount: +this.calc == 0 ? (this.checkDanweiCount == undefined ? null : +this.checkDanweiCount) : null,
        checkDawei: +this.calc == 0 ? this.unit : undefined,
        checkYemaCount: +this.calc == 0 ? (this.checkYemaCount == undefined ? null : +this.checkYemaCount) : null,
        checkXgCount: +this.calc == 0 ? (this.checkXgCount == undefined ? null : +this.checkXgCount) : null,
        checkHtCount: +this.calc == 0 ? this.checkHtCount == undefined ? null : +this.checkHtCount : null,
        checkTtCount: +this.calc == 0 ? this.checkTtCount == undefined ? null : +this.checkTtCount : null,
        checkDtkCount: +this.calc == 0 ? this.checkDtkCount == undefined ? null : +this.checkDtkCount : null
      }
      this.PostService.updateOfCheck(list).then(res => {
        if (res.code == 0) {
          this.change.emit();
          this.hideChildModal();
          this.msgs = [];
          this.msgs = [{ severity:'info', summary:'成功', detail: '成功' }];
        } else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: '错误提示', detail: res.msg }];
        }
      })
    }
  }
}
