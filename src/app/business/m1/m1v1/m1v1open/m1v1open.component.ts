import { Component, OnInit, ViewChild, Input, Inject, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/observable/of';
import { ModalformComponent } from '../../../../common/component/modalform/modalform.component';
import * as Modal from 'ngx-bootstrap/modal';
import { ModalDirective, ModalModule, ModalOptions } from 'ngx-bootstrap/modal';
import { GetList } from '../../../services/getlist';
import { FormsModule } from '@angular/forms';
import { PageBackContent_M2V2 } from '../../../../module/business/getlist';

import { AutoCompleteModule } from 'primeng/primeng';

@Component({
  selector: 'app-m1v1open',
  templateUrl: './m1v1open.component.html',
  styleUrls: ['./m1v1open.component.css']
})
export class M1v1openComponent implements OnInit {
  public selected: string;
  public states: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
    'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico',
    'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

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

  P: PageBackContent_M2V2 = new PageBackContent_M2V2();
  Post: PageBackContent_M2V2 = new PageBackContent_M2V2();

  constructor( @Inject(GetList) getList: GetList) {
    this.GetList = getList;
  }

  ngOnInit() {
    /*
    this.GetList.GetSequenceCode(1,1).
      then(backobj =>{
           alert(backobj.toString());
      });
    */
  }

  public showChildModal(dataItem: any): void {
    if (dataItem == null) {
      this.ShowType = '新增';
      this.IsAdd = true;
      this.P.id = null;
      this.P.indexname = null;
      this.P.isdel = null;
      this.P.isdelandedit = null;
      this.P.indexremark = null;
      this.GetList.GetSequenceCode(1, 1).then(backobj => {
        if (backobj === null) {
          this.P.indexcode = '';
        } else {
          this.P.indexcode = backobj.toString();
        }
      });
    } else {
      this.ShowType = '编辑';
      this.P.id = dataItem.id;
      this.P.indexcode = dataItem.indexcode;
      this.P.indexname = dataItem.indexname;
      this.P.isdel = dataItem.isdel;
      this.P.isdelandedit = dataItem.isdelandedit;
      this.P.indexremark = dataItem.indexremark;
      this.IsAdd = false;
      this.isdel = this.P.isdel;
    }
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  public onSubmit(formValue: any): void {
    if (formValue.indexname.length == 0 || formValue.indexname == null) {
      return;
    }
    this.Post.indexcode = formValue.indexcode;
    this.Post.indexname = formValue.indexname;
    this.Post.indexremark = formValue.indexremark;
    this.Post.isdel = this.isdel;
    if (this.IsAdd == false) this.Post.id = this.P.id;

    this.GetList.Form_M2V2(this.Post, this.IsAdd).then(
      ub => {
        if (ub.backCode == 1) {
          if (this.IsAdd) { this.GetList.GetSequenceCode(1, 0).then(backobj => { }); }
          this.change.emit();
          this.hideChildModal();
        }
        else {
          if (this.IsAdd)
            alert('添加失败！');
          else
            alert('修改失败！');
        }
      }
    );
  }
}
