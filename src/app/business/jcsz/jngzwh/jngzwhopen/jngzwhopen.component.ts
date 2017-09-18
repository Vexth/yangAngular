import { Component, OnInit, ViewChild, Input, Inject, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetList } from '../../../services/getlist';
import { PostService } from '../../../services/post.service';

import { SelectItem, Message } from 'primeng/primeng';

@Component({
  selector: 'app-jngzwhopen',
  templateUrl: './jngzwhopen.component.html',
  styleUrls: ['./jngzwhopen.component.css']
})
export class JngzwhopenComponent implements OnInit {
  msgs: Message[] = [];

  jobName: string;
  jobIncome: number;
  jobWorkload: number;

  private PostService: PostService;

  private GetList: GetList;
  @ViewChild('childModal') public childModal: ModalDirective;
  @Input() Title: string = '表单模板页';
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  indexcode: string;
  indexname: string;
  indexremark: string;
  isdel: number = 0;
  IsAdd: boolean = true;
  ShowType: string = '编辑';

  constructor( @Inject(GetList) getList: GetList, @Inject(PostService) postService: PostService ) {
    this.GetList = getList;
    this.PostService = postService;
  }

  ngOnInit() {
  }

  clearNoNum (obj) {
    obj = obj.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符     
    obj = obj.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的     
    obj = obj.replace(".","$#$").replace(/\./g,"").replace("$#$",".");    
    obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数     
    if (obj.indexOf(".") < 0 && obj !="") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额    
     obj= parseFloat(obj);    
    }
    return obj;
  }

  jobIncomeNo (itme) {
    this.jobIncome = this.clearNoNum(itme);
  }
  jobWorkloadNo (itme) {
    this.jobWorkload = this.clearNoNum(itme);
  }


  public showChildModal(dataItem: any): void {
    console.log(dataItem)
    if (dataItem[0].id == null) {
      this.ShowType = '新增';
      this.IsAdd = true;
      this.jobIncome = dataItem[0].jobIncome;
      this.jobName = dataItem[0].jobName;
      this.jobWorkload = dataItem[0].jobWorkload;
    } else {
      this.ShowType = '修改';
      this.IsAdd = false;
    }
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  public onSubmit(formValue: any): void {
    console.log(this.jobIncome);
    console.log(this.jobName);
    console.log(this.jobWorkload);
    let List = {
      jobIncome: null,
      jobWorkload: null,
      jobName: ''
    };
    if(!this.jobIncome){
      this.msgs.push({severity:'error', summary:'错误提示', detail:'请输入等级工资'});
      return ;
    }

    if(!this.jobName){
      this.msgs.push({severity:'error', summary:'错误提示', detail:'请输入等级名称'});
      return ;
    }

    if(!this.jobWorkload){
      this.msgs.push({severity:'error', summary:'错误提示', detail:'请输入等级工作量'});
      return ;
    }
    
    List.jobIncome = +this.jobIncome;
    List.jobWorkload = +this.jobWorkload;
    List.jobName = this.jobName;
    this.PostService.addUpdateJoblv(List).then(res => {
      if (res.code == 0) {
        this.change.emit();
        this.hideChildModal();
      } else {
        this.msgs.push({severity:'error', summary:'错误提示', detail:res.msg});
      }
    })
  }
}
