import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { GetList } from '../../services/getlist';
import { PostService } from '../../services/post.service';

import 'rxjs/add/operator/toPromise';
// 导入表格组件
import { Header, Footer, TreeNode, Message, MenuItem, SelectItem, ConfirmationService } from 'primeng/primeng';

// 弹窗
import { ModalformComponent } from '../../../common/component/modalform/modalform.component';
import { JngzwhopenComponent } from './jngzwhopen/jngzwhopen.component';
// 获取页面高度
import { Auxiliary } from '../../../common/constants/auxiliary';

@Component({
  selector: 'app-jngzwh',
  templateUrl: './jngzwh.component.html',
  styleUrls: ['./jngzwh.component.css'],
  providers: [ConfirmationService]
})

export class JngzwhComponent implements OnInit{

  private GetList: GetList;
  private PostService: PostService;
  pageNews:number[] = [];
  @ViewChild('jngzwhopen') public jngzwhopen: JngzwhopenComponent;

  // 获取表格数据
  dataList: any[];
  dataListCode: any[];
  msgs: Message[] = [];

  // 获取技能等级
  findCourseDataList: SelectItem[];
  findCourseList: SelectItem[];
  level: string = '-1';

  // “jobName”:”五级”,” jobIncome”:320，”jobWorkload”:500, id: 2
  jobName: string;
  jobIncome: number;
  jobWorkload: number;
  id: number;

  constructor(
    @Inject(GetList) getList: GetList, 
    @Inject('title') private titleService, 
    private confirmationService: ConfirmationService,
    @Inject(PostService) postService: PostService
  ) {
    this.GetList = getList;
    this.PostService = postService;
    this.titleService.setTitle("计算设置");
  }

  bindpage(event:number):void {
    this.GetList.joblvList(+this.level).then(res => {
      this.dataList = res.joblvList;
      this.findCourseList = this.bindpageList(res.joblvList, 'job_name');
    });
  }

  bindpageList(itme, text) {
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

  ngOnInit() {
    this.query();
    Auxiliary.prototype.ControlHeight();
  }

  // 新增
  add(type):void {
    let flxe = [];
    flxe = [{
      jobName: this.jobName,
      jobIncome: this.jobIncome,
      jobWorkload: this.jobWorkload
    }]
    this.jngzwhopen.showChildModal(flxe);
  }

  publicAddUpdateJoblv () {
    let AddUpdateJoblv = {
      jobName: this.jobName,
      jobIncome: this.jobIncome,
      jobWorkload: this.jobWorkload,
      id: this.id
    }
    this.PostService.addUpdateJoblv(AddUpdateJoblv).then(res => {
      if (res.code == 0) {
        this.query();
        this.msgs = [{severity:'info', summary:'成功', detail: '修改成功'}];
      } else {
        this.msgs.push({ severity: 'error', summary: '错误提示', detail: res.msg });
      }
    })
  }

  // 修改、新增
  // 双击修改
  ShowElement(element, car, itme) {
    let oldhtml = element.target.innerHTML;
    let newobj = document.createElement('input');

    newobj.type = 'text';
    newobj.style.width = '100%';
    newobj.maxLength = 5;
    //为新增元素添加value值
    newobj.value = oldhtml;
    //为新增元素添加光标离开事件
    newobj.addEventListener('blur', () => {
      // element.target.innerHTML = newobj.value == oldhtml ? oldhtml : newobj.value;
      if(newobj.value == oldhtml){
        element.target.innerHTML = oldhtml;
        return ;
      } else {
        element.target.innerHTML = newobj.value;
        this.jobIncome = itme === 'djgz' ? +element.target.innerHTML : car.job_income;
  
        this.id = car.id;
        this.jobName = car.job_name;
  
        this.jobWorkload = itme === 'djgzl' ? +element.target.innerHTML : car.job_workload;
        this.publicAddUpdateJoblv();
      }
      
    });

    element.target.innerHTML = '';
    element.target.appendChild(newobj);
    newobj.setSelectionRange(0, oldhtml.length);
    newobj.focus();
  } 

  // 启用、禁用公共方法
  publicFunc (obj, teleit, ztId) {
    let ids, checkList;
    let newData = this.dataListCode;
    if (newData == undefined) {
      this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请选择你要'+ obj +'的数据！' });
      return ;
    } else if (newData.length == 0) {
      this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请选择你要'+ obj +'的数据！' });
      return ;
    } else {
      let arr = [];
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].job_flag == ztId) {
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
          let typeData = { ids: ids };
          if (ztId === 0) {
            this.PostService.joblvBatchOpen(typeData).then(res => {
              this.dataListCode = [];
              this.msgs = [{severity:'info', summary:'成功', detail: obj + '成功'}];
              this.query();
            })
          } else {
            this.PostService.joblvBatchClose(typeData).then(res => {
              this.dataListCode = [];
              this.msgs = [{severity:'info', summary:'成功', detail: obj + '成功'}];
              this.query();
            })
          }
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: '取消', detail: '取消成功' }];
        }
      });
    }
  }

  // 启用
  batchOpen(itme): void {
    // 0 启用
    // 1 禁用
    this.publicFunc(itme.target.innerHTML, '只有禁用的数据才能被启用！', 0)
  }
  // 禁用
  batchClose(itme): void {
    this.publicFunc(itme.target.innerHTML, '只有启用的数据才能被禁用！', 1)
  }

  // 查询
  query () {
    this.bindpage(1);
  }
}
