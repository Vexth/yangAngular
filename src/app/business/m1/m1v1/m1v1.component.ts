import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QmAngular,BackCode,NewsList } from '../../../module/business/formdata';
import { PostService } from '../../services/post.service';
import { Auxiliary } from '../../../common/constants/auxiliary';

// import { Component, OnInit ,Inject} from '@angular/core';
import { GetList } from '../../services/getlist';
import * as wjCore from 'wijmo/wijmo';
//import * as wjInput from 'wijmo/wijmo.input';
import * as wjGrid from 'wijmo/wijmo.grid';
import { PageBackList } from '../../../module/business/getlist';
// import { Auxiliary } from '../../../common/constants/auxiliary';
import { DataSvc } from "../../services/DataSvc";

@Component({
  selector: 'app-m1v1',
  templateUrl: './m1v1.component.html',
  styleUrls: ['./m1v1.component.css']
})
export class M1v1Component implements OnInit {
  public groupSelected:string;

  private GetList: GetList;
  cvPaging: wjCore.CollectionView = new wjCore.CollectionView();
  pageNews:number[] = [];
  comId:number = 10;
  comIdList:number[] = [10,15,20,25,50,100];

  username : string = '';

    protected dataSvc: DataSvc;
    data: wjCore.CollectionView;
    selectionMode = 'ListBox';

    @ViewChild('flex1') flex1: wjGrid.FlexGrid;

    // constructor( @Inject(DataSvc) dataSvc: DataSvc) {
    //     this.dataSvc = dataSvc;
    //     var data = dataSvc.getData();
    //     this.data1 = dataSvc.getCv(data);
    // }

  constructor(@Inject(GetList) getList: GetList, @Inject('title') private titleService,) {
    this.username = 'tc';
    this.GetList = getList;
    this.bindpage(1);
    this.titleService.setTitle("计算设置");
  }

  ngAfterViewInit() {
    if (this.flex1) {
        this.flex1.columnFooters.rows.push(new wjGrid.GroupRow());
    }
  }

  bindpage(event: number):void {
    this.GetList.GetListPageBySSM(event, this.comId).then(backobj =>{
      this.cvPaging.sourceCollection = backobj.List;
      this.pageNews = backobj.pageNews;
    });
  }

  ngOnInit() {
    Auxiliary.prototype.ControlHeight();
  }

  itemFormatter(panel, r, c, cell) {
      if (panel.cellType === wjGrid.CellType.ColumnHeader) { cell.style.textAlign = 'center'; }
      // if (panel.cellType === wjGrid.CellType.Cell && panel.columns[c].header === '工作量') {
      //   cell.innerHTML = ``;
      //   console.log(panel.rows[r].dataItem)
      // }
      if(panel.cellType === wjGrid.CellType.Cell){ cell.style.textAlign = 'center'; }

      if (panel.cellType === wjGrid.CellType.Cell && panel.columns[c].header === '工作量') {
          let rowData = panel.rows[r].dataItem;
          console.log(panel.columns[c])
          cell.innerHTML = `<select style="padding: 0px; height: initial;" class="form-control" placeholder=".col-xs-3" (click)="onChange($event)">
              <option value="0">Volvo</option>
              <option value="1">Saab</option>
              <option value="2">Mercedes</option>
              <option value="3">Audi</option>
          </select>`;
      }
  }

  onChange(classId){
    this.comId = classId;
    this.bindpage(1);
  }

  addClick(){
    var id = this.cvPaging.sourceCollection.length + 1;
    this.cvPaging.sourceCollection.push({
      A: "",
      C: "",
      ID: id,
      P: "",
      check: false,
      check1: false,
      check2: false,
      check3: false,
      check4: false,
      check5: false
    })
  }

  removeClick(){
    console.log(wjGrid.FlexGrid.getControl)
  }

  onRenovate(list) {
    this.username = list;
    console.log(list)
  }

}
