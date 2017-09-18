import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { QRCodeModule } from 'angular2-qrcode';

import { 
  GrowlModule,
  Message,
  ConfirmDialogModule,
  ConfirmationService,
  CalendarModule,
  TreeTableModule,
  SharedModule,
  DataTableModule,
  AutoCompleteModule,
  DataGridModule,
  DataListModule,
  CheckboxModule,
  DropdownModule,
  ChipsModule,
  TreeNode,
  DialogModule,
  InputMaskModule,
  RadioButtonModule,
  TreeModule,
  ListboxModule,
  ButtonModule,
  PanelMenuModule,
  PaginatorModule
} from 'primeng/primeng';

import { PublicModule } from '../public/public.module';
import { BusinessRoutingModule } from './business.routing.module';
import { CommonFunctionModule } from '../common/common.function.module';

import { A1Component } from './a1/a1.component';

// 基础设置 （计算设置，系数维护, 科目规范化, 人员技能等级, 技能工资维护）
// JsszComponent为计算设置
import { JsszComponent } from './jcsz/jssz/jssz.component';
import { JsszopenComponent } from './jcsz/jssz/jsszopen/jsszopen.component';
// XswhComponent系数维护
import { XswhComponent } from './jcsz/xswh/xswh.component';
// KmgfhComponent科目规范化
import { KmgfhComponent } from './jcsz/kmgfh/kmgfh.component';
// RyjndjComponent人员技能等级
import { RyjndjComponent } from './jcsz/ryjndj/ryjndj.component';
// JngzwhComponent 技能工资维护
import { JngzwhComponent } from './jcsz/jngzwh/jngzwh.component';
import { JngzwhopenComponent } from './jcsz/jngzwh/jngzwhopen/jngzwhopen.component';

// 工作量管理（SpgzlComponent审批工作量）
// SpgzlComponent 审批工作量
import { SpgzlComponent } from './gzlgl/spgzl/spgzl.component';
import { SpgzlopenComponent } from './gzlgl/spgzl/spgzlopen/spgzlopen.component';
// CygzlComponent 查阅工作量
import { CygzlComponent } from './gzlgl/cygzl/cygzl.component';

// 数据统计
// KhgzglComponent 考核工资管理 ZzbgzlComponent 制作部工作量 FwrygzComponent 发外工资管理
import { KhgzglComponent } from './sjtj/khgzgl/khgzgl.component';
import { ZzbgzlComponent } from './sjtj/zzbgzl/zzbgzl.component';
import { FwrygzComponent } from './sjtj/fwrygz/fwrygz.component';

import { NodeService } from './services/treeNode';

import { PostService } from './services/post.service';
import { GetList } from './services/getlist';

import { AlertModule,TypeaheadModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
// 产品维护
import { CpwhComponent} from './gzlgl-model/cpwh/cpwh.component';
import { cpwhcpaddComponent } from './gzlgl-model/cpwh/cpwhAdd/cpwhadd.component';
import { cpwhgjaddComponent } from './gzlgl-model/cpwh/cpwhGjAdd/cpwhgjadd.component';
import { cpwhpladdComponent } from './gzlgl-model/cpwh/cpwhpladd/cpwhpladd.component';
import { cpwhqrcodeComponent } from './gzlgl-model/cpwh/cpwhQRcode/cpwhQRcode.component';
// 流转查询
import { LzcxComponent } from'./gzlgl-model/lzcx/lzcx.component';
// 模板维护
import { MbwhComponent } from './gzlgl-model/mbwh/mbwh.component';
import { mbwhaddComponent } from './gzlgl-model/mbwh/mbwhAdd/mbwhadd.component';
import { mbwhchangeComponent } from './gzlgl-model/mbwh/mbwhChange/mbwhchange.component';
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
import { JdsqsetComponent } from './gzlgl-model/jdsq/jdsqSet/jdsqSet.component';
// 页码输入
import { YmsrComponent } from './gzlgl-model/ymsr/ymsr.component';
// 角色分配
import { JsfpComponent } from './gzlgl-model/jsfp/jsfp.component';
import { jsfpaddComponent } from './gzlgl-model/jsfp/jsfpAdd/jsfpAdd.component';
import { jsfpeditComponent } from './gzlgl-model/jsfp/jsfpAdd/jsfpEdit.component';
import { jsfpwarComponent } from './gzlgl-model/jsfp/jsfpAdd/jsfpWar.component';
// 用户管理
import { YhglComponent } from './gzlgl-model/yhgl/yhgl.component';
import { yhgljsComponent } from './gzlgl-model/yhgl/yhglJS/yhglJS.component';
import { yhgldeptComponent } from './gzlgl-model/yhgl/yhglJS/yhglDept.component';

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
    cpwhqrcodeComponent
  ],
  imports: [
    CommonModule,
    PublicModule,
    BusinessRoutingModule,
    CommonFunctionModule,
    FormsModule,
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
    ButtonModule,
    PanelMenuModule,
    CalendarModule,
    DialogModule,
    InputMaskModule,
    RadioButtonModule,
    TreeModule,
    ListboxModule,
    PaginatorModule,
    QRCodeModule
  ],
  declarations: [
    A1Component,
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
    RyjndjComponent,
    JngzwhComponent,
    JngzwhopenComponent,
    KmgfhComponent,
    SpgzlComponent,
    SpgzlopenComponent,
    CygzlComponent,
    KhgzglComponent,
    ZzbgzlComponent,
    FwrygzComponent,
    JdsqsetComponent,
    jsfpeditComponent,
    jsfpwarComponent,
    yhgldeptComponent,
    yhgljsComponent,
    mbwhchangeComponent,
    cpwhqrcodeComponent
  ],
  providers: [PostService,GetList,NodeService,ConfirmationService]
})
export class BusinessModule { }
