import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { GetList } from '../../services/getlist';
import { PostService } from '../../services/post.service';

import 'rxjs/add/operator/toPromise';
// 导入表格组件
import { Header, Footer, TreeNode, Message, MenuItem, ConfirmationService } from 'primeng/primeng';

// 弹窗
import { ModalformComponent } from '../../../common/component/modalform/modalform.component';
import { JsszopenComponent } from './jsszopen/jsszopen.component';
// 获取页面高度
import { Auxiliary } from '../../../common/constants/auxiliary';

@Component({
  selector: 'app-jssz',
  templateUrl: './jssz.component.html',
  styleUrls: ['./jssz.component.css'],
  providers: [ConfirmationService]
})
export class JsszComponent implements OnInit{
  // 获取tab切换的值
  private ListFindType: string[];

  private GetList: GetList;
  private PostService: PostService;
  pageNews:number[] = [];
  @ViewChild('jsszopen') public jsszopen:JsszopenComponent;

  // 获取表格数据
  dataList: any[];
  dataListCode: any[];
  msgs: Message[] = [];

  username: string = '201';

  constructor(
    @Inject(GetList) getList: GetList, 
    @Inject('title') private titleService, 
    private confirmationService: ConfirmationService,
    @Inject(PostService) postService: PostService
  ) {
    this.GetList = getList;
    this.PostService = postService;
    this.bindpage(1);
    this.titleService.setTitle("计算设置");
  }

  bindpage(event:number):void {
    let pageindex:number = event;
    if(pageindex == 0){ pageindex = this.pageNews[2];}
    this.onRenovate(this.username);
  }

  ngOnInit() {
    this.GetList.GetListFindType().then(res => this.ListFindType = res);
    Auxiliary.prototype.ControlHeight();
  }

  // 新增
  add(type):void {
    // console.log(type);
    let flxe = [];
    flxe = [{
      type: type,
      nodeId: '',
      isLp: false,
      isHuat: false,
      isTiaot: false,
      isDatika: false,
      isHouqi: false,
      multiple: '',
      unit: ""
    }]
    this.jsszopen.showChildModal(flxe);
  }

  // 修改
  public edit(): void {
    let flex = this.dataListCode;
    if(flex.length === 0) {
      this.msgs.push({severity:'error', summary:'错误提示', detail:'请选择你要修改的数据'});
    } else if(flex.length > 1){
      this.msgs.push({severity:'error', summary:'错误提示', detail:'请选择一条数据进行修改'});
    } else {
      this.confirmationService.confirm({
        message: '确定要修改此记录吗?',
        header: '修改',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.jsszopen.showChildModal(flex);
            // this.msgs = [{severity:'info', summary:'成功', detail:'修改成功'}];
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'取消', detail:'取消成功'}];
        }
      });
    }
  }

  // 删除
  dellList():void{
    let flex = this.dataListCode;
    let checkboxId:number[] = [];
    if(flex === undefined) {
      this.msgs.push({severity:'error', summary:'错误提示', detail:'请选择你要删除的数据'});
    } else {
      this.confirmationService.confirm({
        message: '确定要删除此记录吗?',
        header: '删除',
        icon: 'fa fa-question-circle',
        accept: () => {
          flex.map(vel => {
            this.username = vel.type;
            checkboxId.push(vel.id);
          });
          let velId = { ids: checkboxId.join(",")};
          this.PostService.batchDelete(velId).then(res => {
            this.onRenovate(this.username);
            this.msgs = [{severity:'info', summary:'成功', detail:'删除成功'}]
          })
        },
        reject: () => {
          this.msgs = [{severity:'info', summary:'取消', detail:'取消成功'}];
        }
      });
    }
  }

  // 切换
  onRenovate(itme){
    this.username = itme;
    this.dataList = [];
    this.dataListCode = [];
    this.GetList.GetListPageBy_M1V1(itme).then(res => this.dataList = res)
  }
}
