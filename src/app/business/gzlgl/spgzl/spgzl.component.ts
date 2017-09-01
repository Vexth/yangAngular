import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { GetList } from '../../services/getlist';
import { PostService } from '../../services/post.service';

import 'rxjs/add/operator/toPromise';
// 导入表格组件
import { Header, Footer, TreeNode, Message, MenuItem, ConfirmationService } from 'primeng/primeng';

// 弹窗
import { ModalformComponent } from '../../../common/component/modalform/modalform.component';
import { SpgzlopenComponent } from './spgzlopen/spgzlopen.component';
// 获取页面高度
import { Auxiliary } from '../../../common/constants/auxiliary';

import { ZtreeComponent } from '../../../public/ztree/ztree.component'

@Component({
  selector: 'app-spgzl',
  templateUrl: './spgzl.component.html',
  styleUrls: ['./spgzl.component.css'],
  providers: [ConfirmationService]
})
export class SpgzlComponent implements OnInit {
  @ViewChild('ztreeInstance') ztreeInstance: ZtreeComponent;

  private GetList: GetList;
  private PostService: PostService;
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
  statu: string = '-1';
  // findProductDoc	产品稿件树
  findProductDoc: MenuItem[];
  username: string;

  // rangeDates
  rangeDates: string;

  constructor(
    @Inject(GetList) getList: GetList,
    @Inject('title') private titleService,
    private confirmationService: ConfirmationService,
    @Inject(PostService) postService: PostService,
  ) {
    this.GetList = getList;
    this.PostService = postService;
    this.titleService.setTitle("审批工作量");
  }

  bindpage (name) {
    this.GetList.workloadChecklist(name).then(res => {
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
    this.emptyList.statu = +this.statu;
    this.bindpage(this.emptyList);
    this.GetList.findNodeOfZzb().then(res => this.findNodeOfZzbList = res);
    this.GetList.findUserList().then(res => this.findUserList = res);
    this.GetList.findProductDoc().then(res => {
      this.findProductDoc = res;
      console.log(res)
    });
    Auxiliary.prototype.ControlHeight();
  }

  // 查询
  query () {
    this.dataListCode = [];
    this.emptyList.nodeId = this.findNodeOfZzbId;
    this.emptyList.uId = this.findUserListId;
    this.emptyList.statu = +this.statu;
    
    this.bindpage(this.emptyList);
  }

  onFocus(){
    this.username = 'text';
  }
  onBlur(){
    this.username = '';
  }

  publicFunc (typeId, obj) {
    let ids, teleit, checkList;
    let newData = this.dataListCode;
    if (obj == '审核') {
      teleit = '只有未审核的数据才能被审核！';
    } else if (obj == '退回') {
      teleit = '只有已审核的数据才能被退回！';
    } else if (obj == '删除') {
      teleit = '只有未审核的数据才能被删除！';
    } else {
      return ;
    }
    if (newData == undefined) {
      this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请选择你要'+ obj +'的数据！' });
      return ;
    } else if (newData.length == 0) {
      this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请选择你要'+ obj +'的数据！' });
      return ;
    } else {
      let arr = [];
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].check_statu != (typeId - 1)) { console.log(newData[i].check_statu)
          this.msgs.push({ severity: 'error', summary: '错误提示', detail: teleit });
          return ;
        }
        if(newData[i].check_statu == typeId || newData[i].check_statu == 3){
          this.msgs.push({ severity: 'error', summary: '错误提示', detail: teleit });
          return ;
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
            this.msgs = [{severity:'info', summary:'成功', detail: obj + '成功'}];
            this.query();
          });
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: '取消', detail: '取消成功' }];
        }
      });
    }
  }

  // 审核
  review(itme): void {
    let typeId = 1;
    this.publicFunc(typeId, itme.target.innerHTML);
  }
  // 退回
  retreat(itme): void {
    let typeId = 2;
    this.publicFunc(typeId, itme.target.innerHTML);
  }
  // 删除
  dellList(itme): void {
    let typeId = 3;
    this.publicFunc(typeId, itme.target.innerHTML);
  }

  // 追加
  add(): void {}

  // 修改
  public edit(): void {
    let flex = this.dataListCode;
    if (flex.length === 0) {
      this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请选择你要修改的数据' });
    } else if (flex.length > 1) {
      this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请选择一条数据进行修改' });
    } else {
      this.confirmationService.confirm({
        message: '确定要修改此记录吗?',
        header: '修改',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.spgzlopen.showChildModal(flex);
          // this.msgs = [{severity:'info', summary:'成功', detail:'修改成功'}];
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: '取消', detail: '取消成功' }];
        }
      });
    }
  }

  // 切换

}
