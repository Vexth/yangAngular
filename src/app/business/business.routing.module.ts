import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../core/auth-guard.service';

import { A1Component } from './a1/a1.component';
import { CpwhComponent } from './gzlgl-model/cpwh/cpwh.component';
import { LzcxComponent } from './gzlgl-model/lzcx/lzcx.component';
import { MbwhComponent } from './gzlgl-model/mbwh/mbwh.component';
import { SzgzlComponent } from './gzlgl-model/szgzl/szgzl.component';
import { TjgzlComponent } from './gzlgl-model/tjgzl/tjgzl.component';
import { JdwhComponent } from './gzlgl-model/jdwh/jdwh.component';
import { JdsqComponent } from './gzlgl-model/jdsq/jdsq.component';
import { YmsrComponent } from './gzlgl-model/ymsr/ymsr.component';
import { JsfpComponent } from './gzlgl-model/jsfp/jsfp.component';
import { YhglComponent } from './gzlgl-model/yhgl/yhgl.component';

// 基础设置 （JsszComponent为计算设置，XswhComponent系数维护, KmgfhComponent科目规范化, RyjndjComponent人员技能等级, JngzwhComponent 技能工资维护）
import { JsszComponent } from './jcsz/jssz/jssz.component';
import { XswhComponent } from './jcsz/xswh/xswh.component';
import { KmgfhComponent } from './jcsz/kmgfh/kmgfh.component';
import { RyjndjComponent } from './jcsz/ryjndj/ryjndj.component';
import { JngzwhComponent } from './jcsz/jngzwh/jngzwh.component';
import { ZzbryfzComponent } from './jcsz/zzbryfz/zzbryfz.component';
// 工作量管理（SpgzlComponent 审批工作量，CygzlComponent 查阅工作量）
import { SpgzlComponent } from './gzlgl/spgzl/spgzl.component';
import { CygzlComponent } from './gzlgl/cygzl/cygzl.component';
//外发工作量
import { FwgzlComponent } from './gzlgl/fwgzl/fwgzl.component';
// 数据统计
import { KhgzglComponent } from './sjtj/khgzgl/khgzgl.component';
import { ZzbgzlComponent } from './sjtj/zzbgzl/zzbgzl.component';
import { FwrygzComponent } from './sjtj/fwrygz/fwrygz.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: A1Component, //A1Component  M1v1Component
  },
  {
    path: 'business',
    // canActivate: [AuthGuardService],
    component: A1Component,
  },
  {
    path: 'business/A1',
    // canActivate: [AuthGuardService],
    component: A1Component,
  },
  {
    path: 'business/gzlgl-model/cpwh',
    // canActivate: [AuthGuardService],
    component: CpwhComponent,
  },
  {
    path: 'business/gzlgl-model/lzcx',
    // canActivate: [AuthGuardService],
    component: LzcxComponent,
  },
  {
    path: 'business/gzlgl-model/mbwh',
    // canActivate: [AuthGuardService],
    component: MbwhComponent,
  },
  {
    path: 'business/gzlgl-model/szgzl',
    // canActivate: [AuthGuardService],
    component: SzgzlComponent,
  },
  {
    path: 'business/gzlgl-model/tjgzl',
    // canActivate: [AuthGuardService],
    component: TjgzlComponent,
  },
  {
    path: 'business/gzlgl-model/jdwh',
    // canActivate: [AuthGuardService],
    component: JdwhComponent,
  },
  {
    path: 'business/gzlgl-model/jdsq',
    // canActivate: [AuthGuardService],
    component: JdsqComponent,
  },
  {
    path: 'business/gzlgl-model/ymsr',
    // canActivate: [AuthGuardService],
    component: YmsrComponent,
  },
  {
    path: 'business/gzlgl-model/jsfp',
    // canActivate: [AuthGuardService],
    component: JsfpComponent,
  },
  {
    path: 'business/gzlgl-model/yhgl',
    // canActivate: [AuthGuardService],
    component: YhglComponent,
  },
  {
    path: 'business/jcsz/jssz',
    // canActivate: [AuthGuardService],
    component: JsszComponent,
  },
  {
    path: 'business/jcsz/xswh',
    // canActivate: [AuthGuardService],
    component: XswhComponent,
  },
  {
    path: 'business/jcsz/kmgfh',
    // canActivate: [AuthGuardService],
    component: KmgfhComponent,
  },
  {
    path: 'business/jcsz/ryjndj',
    // canActivate: [AuthGuardService],
    component: RyjndjComponent,
  },
  {
    path: 'business/jcsz/jngzwh',
    // canActivate: [AuthGuardService],
    component: JngzwhComponent,
  },
  {
    path: 'business/gzlgl/spgzl',
    // canActivate: [AuthGuardService],
    component: SpgzlComponent,
  },
  {
    path: 'business/gzlgl/cygzl',
    // canActivate: [AuthGuardService],
    component: CygzlComponent,
  },
  {
    path: 'business/sjtj/khgzgl',
    // canActivate: [AuthGuardService],
    component: KhgzglComponent,
  },
  {
    path: 'business/sjtj/zzbgzl',
    // canActivate: [AuthGuardService],
    component: ZzbgzlComponent,
  },
  {
    path: 'business/sjtj/fwrygz',
    // canActivate: [AuthGuardService],
    component: FwrygzComponent,
  },
  {
    path: 'business/gzlgl/fwgzl',
    // canActivate: [AuthGuardService],
    component: FwgzlComponent,
  },
  {
    path: 'business/jcsz/zzbryfz',
    // canActivate: [AuthGuardService],
    component: ZzbryfzComponent,
  }
  
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BusinessRoutingModule { }
