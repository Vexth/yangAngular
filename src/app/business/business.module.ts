import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GrowlModule,Message,ConfirmDialogModule,ConfirmationService,
  CalendarModule,TreeTableModule,SharedModule,DataTableModule,AutoCompleteModule,DataGridModule,
  DataListModule,CheckboxModule,DropdownModule,ChipsModule} from '../../../primeng/primeng';

import { PublicModule } from '../public/public.module';
import { BusinessRoutingModule } from './business.routing.module';
import { CommonFunctionModule } from '../common/common.function.module';

import { A1Component } from './a1/a1.component';
import { M1v1Component } from './m1/m1v1/m1v1.component';
import { M1v2Component } from './m1/m1v2/m1v2.component';
import { M2v1Component } from './m2/m2v1/m2v1.component';
import { M2v2Component } from './m2/m2v2/m2v2.component';
import { M2v3Component } from './m2/m2v3/m2v3.component';
import { M2v4Component } from './m2/m2v4/m2v4.component';
import { M3v1Component } from './m3/m3v1/m3v1.component';
import { M3v2Component } from './m3/m3v2/m3v2.component';
import { M3v3Component } from './m3/m3v3/m3v3.component';
import { M3v4Component } from './m3/m3v4/m3v4.component';
import { M3v5Component } from './m3/m3v5/m3v5.component';
import { M3v6Component } from './m3/m3v6/m3v6.component';
import { M3v7Component } from './m3/m3v7/m3v7.component';

import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjCoreModule } from 'wijmo/wijmo.angular2.core';

import { NodeService } from './services/treeNode';
// import { SharedModule } from 'wijmo/wijmo.angular2.core';

import { DataSvc } from './services/DataSvc';
import { DataSvcV2 } from './services/DataSvcV2';
import { PostService } from './services/post.service';
import { GetList } from './services/getlist';

import { AlertModule,TypeaheadModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
// 产品维护
import { M2v2openComponent } from './m2/m2v2/m2v2open/m2v2open.component';
import { M2v3openComponent } from './m2/m2v3/m2v3open/m2v3open.component';
import { CpwhComponent} from './gzlgl-model/cpwh/cpwh.component';
import { cpwhcpaddComponent } from './gzlgl-model/cpwh/cpwhAdd/cpwhadd.component';
import { cpwhgjaddComponent } from './gzlgl-model/cpwh/cpwhGjAdd/cpwhgjadd.component';
import { cpwhpladdComponent } from './gzlgl-model/cpwh/cpwhpladd/cpwhpladd.component';
// 流转查询
import { LzcxComponent } from'./gzlgl-model/lzcx/lzcx.component';
// 模板维护
import { MbwhComponent } from './gzlgl-model/mbwh/mbwh.component';
import { mbwhaddComponent } from './gzlgl-model/mbwh/mbwhAdd/mbwhadd.component';
// 工作量设置
import { SzgzlComponent } from './gzlgl-model/szgzl/szgzl.component';
import { szgzlplComponent } from './gzlgl-model/szgzl/szgzlPl/szgzlPl.component';
// 调整工作量
import { TjgzlComponent } from './gzlgl-model/tjgzl/tjgzl.component';
import { tjgzlcxComponent } from './gzlgl-model/tjgzl/tjgzlCx/tjgzlCx.component';
// 节点维护
import { JdwhComponent } from './gzlgl-model/jdwh/jdwh.component';
import { jdwhaddComponent } from './gzlgl-model/jdwh/jdwhAdd/jdwhAdd.component';
import { jdwhbjComponent } from './gzlgl-model/jdwh/jdwhAdd/jdwhBj.component';
// 节点授权
import { JdsqComponent } from './gzlgl-model/jdsq/jdsq.component';
// 页码输入
import { YmsrComponent } from './gzlgl-model/ymsr/ymsr.component';
// 角色分配
import { JsfpComponent } from './gzlgl-model/jsfp/jsfp.component';
import { jsfpaddComponent } from './gzlgl-model/jsfp/jsfpAdd/jsfpAdd.component';
// 用户管理
import { YhglComponent } from './gzlgl-model/yhgl/yhgl.component';

// 基础设置 （JsszComponent为计算设置，XswhComponent系数维护）
// JsszComponent为计算设置
import { JsszComponent } from './jcsz/jssz/jssz.component';
import { JsszopenComponent } from './jcsz/jssz/jsszopen/jsszopen.component';
// XswhComponent系数维护
import { XswhComponent } from './jcsz/xswh/xswh.component';

@NgModule({
  entryComponents: [
    cpwhcpaddComponent,
    cpwhgjaddComponent,
    cpwhpladdComponent,
    mbwhaddComponent,
    szgzlplComponent,
    tjgzlcxComponent,
    jdwhaddComponent,
    jdwhbjComponent,
    jsfpaddComponent,
  ],
  imports: [
    CommonModule,
    PublicModule,
    BusinessRoutingModule,
    CommonFunctionModule,
    FormsModule,
    WjInputModule,
    WjGridModule,
    WjCoreModule,
    AlertModule,
    ModalModule,
    TreeTableModule,
    SharedModule,
    GrowlModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    CalendarModule,
    DataTableModule,
    TypeaheadModule,
    AutoCompleteModule,
    DataGridModule,
    DataListModule,
    CheckboxModule,
    DropdownModule,
    ChipsModule,
  ],
  declarations: [
    A1Component,
    M1v1Component,
    M1v2Component,
    M2v1Component,
    M2v2Component,
    M2v3Component,
    M2v4Component,
    M3v1Component,
    M3v2Component,
    M3v3Component,
    M3v4Component,
    M3v5Component,
    M3v6Component,
    M3v7Component,
    M2v2openComponent,
    M2v3openComponent,
    CpwhComponent,
    cpwhcpaddComponent,
    cpwhgjaddComponent,
    cpwhpladdComponent,
    LzcxComponent,
    MbwhComponent,
    mbwhaddComponent,
    SzgzlComponent,
    szgzlplComponent,
    TjgzlComponent,
    tjgzlcxComponent,
    JdwhComponent,
    jdwhaddComponent,
    jdwhbjComponent,
    JdsqComponent,
    YmsrComponent,
    JsfpComponent,
    jsfpaddComponent,
    YhglComponent,
    JsszComponent,
    JsszopenComponent,
    XswhComponent,
  ],
  providers: [DataSvc,DataSvcV2,PostService,GetList,NodeService,ConfirmationService]
})
export class BusinessModule { }
