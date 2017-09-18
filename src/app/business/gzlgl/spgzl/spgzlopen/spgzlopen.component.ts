import { Component, OnInit, ViewChild, Input, Inject, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/observable/of';
import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';
// import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective, ModalModule, ModalOptions } from 'ngx-bootstrap/modal';
import { GetList } from '../../../services/getlist';
import { PostService } from '../../../services/post.service';
import { FormsModule } from '@angular/forms';

import { SelectItem, Message, MenuItem, TreeNode } from 'primeng/primeng';

@Component({
  selector: 'app-spgzlopen',
  templateUrl: './spgzlopen.component.html',
  styleUrls: ['./spgzlopen.component.css']
})
export class SpgzlopenComponent implements OnInit {
  msgs: Message[] = [];
  // findUserList 人员
  findUserListId: any;
  findUserList: SelectItem[];
  empNo: any;

  // 流程节点
  findNodeOfZzbList: SelectItem[];
  findNodeOfZzbListCode: any;
  // findProductDoc	产品稿件树
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

  publicList(arr, str) {
    let List = [];
    for (let i = 0; i < arr.length; i++) {
      let labelList = { label: '', value: '' };
      labelList.label = arr[i][str];
      labelList.value = arr[i];
      List.push(labelList)
    }
    return List;
  }

  ngOnInit() {
    this.GetList.getProductDoc().then(res => this.filesTree = res)
    this.GetList.findNodeOfZzb().then(res => {
      this.findNodeOfZzbList = [];
      this.findNodeOfZzbList = this.publicList(res, 'nodeName');
    })
    this.GetList.findUserList().then(res => {
      this.findUserList = [];
      this.findUserList = this.publicList(res, 'name');
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

  onFocus() {
    this.hide = 1;
  }
  onChange() {
    if (this.documentId == undefined) {
      return;
    }
    if (this.findNodeOfZzbListCode == undefined) {
      return;
    }
    this.nodeId = this.findNodeOfZzbListCode.nodeId;
    this.GetList.zzdocument(this.documentId, this.nodeId).then(res => {
      this.unit = res.unit;
      this.is_huat = res.is_huat;
      this.is_tiaot = res.is_tiaot;
      this.is_datika = res.is_datika;
    })
  }

  // 计算
  workloadCalc () {
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
      if (res.code == 0) {
        this.checkCalcWorkload = res.data;
      } else {
        this.msgs.push({ severity: 'error', summary: '错误提示', detail: res.msg });
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
    }
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  public onSubmit(formValue: any): void {
    if (!this.checkCalcWorkload || this.checkCalcWorkload.toString() == '') {
      this.msgs.push({ severity: 'error', summary: '错误提示', detail: '工作量不能为空' });
      return;
    }
    if (this.ShowType == '追加') {
      if (!this.gmtCreate) {
        this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请选择追加日期' });
        return;
      }
      if (!this.findUserListId) {
        this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请选择追加人员' });
        return;
      }
      if (!this.findNodeOfZzbListCode) {
        this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请选择流程节点' });
        return;
      }
      if (!this.filesTreeId) {
        this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请选择稿件' });
        return;
      }
      if (!this.calc) {
        this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请选择工作量计算方式' });
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
        } else {
          this.msgs.push({ severity: 'error', summary: '错误提示', detail: res.msg });
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
        } else {
          this.msgs.push({ severity: 'error', summary: '错误提示', detail: res.msg });
        }
      })
    }
  }
}
