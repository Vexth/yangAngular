import { Component, OnInit, ViewChild, Input, Inject, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/observable/of';
import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';
import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective, ModalModule, ModalOptions } from 'ngx-bootstrap/modal';
import { GetList } from '../../../services/getlist';
import { PostService } from '../../../services/post.service';
import { FormsModule } from '@angular/forms';
import { PageBackContent_M1V1 } from '../../../../module/business/getlist';

import { SelectItem, Message } from 'primeng/primeng';

@Component({
  selector: 'app-jsszopen',
  templateUrl: './jsszopen.component.html',
  styleUrls: ['./jsszopen.component.css']
})
export class JsszopenComponent implements OnInit {
  public selected: string;
  unit: any;//单选下拉框
  unitList: SelectItem[];

  msgs: Message[] = [];

  findNodeOfZzbList: SelectItem[];
  findNodeOfZzbListCode: any;
  isLp: boolean = false;
  isHuat: boolean = false;
  isTiaot: boolean = false;
  isDatika: boolean = false;
  isHouqi: boolean = false;
  multiple: string;
  type: number;
  nodeId: number;

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
  typeList: any = [
    { id: 0, name: '启用' },
    { id: 1, name: '禁用' },
  ];

  P: PageBackContent_M1V1 = new PageBackContent_M1V1();
  Post: PageBackContent_M1V1 = new PageBackContent_M1V1();

  constructor( @Inject(GetList) getList: GetList, @Inject(PostService) postService: PostService ) {
    this.GetList = getList;
    this.PostService = postService;
  }

  ngOnInit() {
    this.unitList = [{label:'套', value: '套'},{label:'页', value: '页'},{label:'版面', value: '版面'},{label:'期', value: '期'}];
    this.GetList.findNodeOfZzb().then(res => {
      this.findNodeOfZzbList = [];
      for (let i = 0; i < res.length; i++) {
        let labelList = {label: '', value: ''};
        labelList.label = res[i].nodeName;
        labelList.value = res[i];
        this.findNodeOfZzbList.push(labelList)
      }
    })
  }

  public showChildModal(dataItem: any): void {
    if (dataItem[0].id == null) {
      this.ShowType = '新增';
      this.IsAdd = true;
      this.P.type = dataItem[0].type;
      this.type = dataItem[0].type;
      this.findNodeOfZzbListCode = null;
      this.nodeId = null;
      this.isLp = false;
      this.isHuat = false;
      this.isTiaot = false;
      this.isDatika = false;
      this.isHouqi = false;
      this.multiple = null;
      this.unit = null;
    } else {
      this.ShowType = '修改';
      this.IsAdd = false;
      this.P.id = dataItem[0].id;
      this.P.type = dataItem[0].type;
      this.P.nodeId = dataItem[0].nodeId;
      this.findNodeOfZzbListCode = dataItem[0].name;

      this.P.isLp = dataItem[0].isLp;
      dataItem[0].isLp === true ? (this.isLp = true) : (this.isLp = false)

      this.P.isHuat = dataItem[0].isHuat;
      dataItem[0].isHuat === true ? (this.isHuat = true) : (this.isHuat = false)

      this.P.isTiaot = dataItem[0].isTiaot;
      dataItem[0].isTiaot === true ? (this.isTiaot = true) : (this.isTiaot = false)

      this.P.isDatika = dataItem[0].isDatika;
      dataItem[0].isDatika === true ? (this.isDatika = true) : (this.isDatika = false)

      this.P.isHouqi = dataItem[0].isHouqi;
      dataItem[0].isHouqi === true ? (this.isHouqi = true) : (this.isHouqi = false)

      this.P.multiple = dataItem[0].multiple;
      this.multiple = dataItem[0].multiple

      this.P.unit = dataItem[0].unit;
      this.unit = dataItem[0].unit;

      this.P.remarks = dataItem[0].remarks;
      this.P.delFlag = dataItem[0].delFlag;

      this.nodeId = dataItem[0].nodeId;
    }
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  public onSubmit(formValue: any): void {
    let List = {
      id: null,
      type: null,
      nodeId: '',
      isLp: null,
      isHuat: null,
      isTiaot: null,
      isDatika: null,
      isHouqi: null,
      multiple: null,
      unit: ''
    };
    if(!this.findNodeOfZzbListCode){
      this.msgs = [{severity:'error', summary:'错误提示', detail:'请输入流程节点'}];
      return ;
    }
    if(!this.multiple){
      this.msgs = [{severity:'error', summary:'错误提示', detail:'请输入倍数'}];
      return ;
    }
    if(!this.unit){
      this.msgs = [{severity:'error', summary:'错误提示', detail:'请选择单位'}];
      return ;
    }
    List.id = this.P.id;
    List.type = +this.P.type;
    List.nodeId = this.nodeId != null ? this.nodeId : this.findNodeOfZzbListCode.nodeId;
    List.isLp = Number(this.isLp);
    List.isHuat = Number(this.isHuat);
    List.isTiaot = Number(this.isTiaot);
    List.isDatika = Number(this.isDatika);
    List.isHouqi = Number(this.isHouqi);
    List.multiple = +this.multiple;
    List.unit = this.unit;

    console.log(List)
    this.PostService.addUpdateNode(List).then(res => {
      if (res.code == 0) {
        this.change.emit();
        this.hideChildModal();
        this.msgs = [];
        this.msgs = [{severity:'success', summary:'成功提示', detail:"修改成功"}];
      } else {
        this.msgs = [];
        this.msgs = [{severity:'error', summary:'错误提示', detail:res.msg}];
      }
    });
  }
}
