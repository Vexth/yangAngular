import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../core/auth-guard.service';

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

// 基础设置 （JsszComponent为计算设置，XswhComponent系数维护）
import { JsszComponent } from './jcsz/jssz/jssz.component';
import { XswhComponent } from './jcsz/xswh/xswh.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: A1Component, //A1Component  M1v1Component
  },
  {
    path: 'business',
    canActivate: [AuthGuardService],
    component: A1Component,
  },
  {
    path: 'business/A1',
    canActivate: [AuthGuardService],
    component: A1Component,
  },

  {
    path: 'business/m1/m1v1',
    canActivate: [AuthGuardService],
    component: M1v1Component,
  },
  {
    path: 'business/m1/m1v2',
    canActivate: [AuthGuardService],
    component: M1v2Component,
  },

  {
    path: 'business/m2/m2v1',
    canActivate: [AuthGuardService],
    component: M2v1Component,
  },
  {
    path: 'business/m2/m2v2',
    canActivate: [AuthGuardService],
    component: M2v2Component,
  },
  {
    path: 'business/m2/m2v3',
    canActivate: [AuthGuardService],
    component: M2v3Component,
  },
  {
    path: 'business/m2/m2v3/:id',
    canActivate: [AuthGuardService],
    component: M2v3Component,
  },
  {
    path: 'business/m2/m2v4',
    canActivate: [AuthGuardService],
    component: M2v4Component,
  },

  {
    path: 'business/m3/m3v1',
    canActivate: [AuthGuardService],
    component: M3v1Component,
  },
  {
    path: 'business/m3/m3v2',
    canActivate: [AuthGuardService],
    component: M3v2Component,
  },
  {
    path: 'business/m3/m3v3',
    canActivate: [AuthGuardService],
    component: M3v3Component,
  },
  {
    path: 'business/m3/m3v4',
    canActivate: [AuthGuardService],
    component: M3v4Component,
  },
  {
    path: 'business/m3/m3v5',
    canActivate: [AuthGuardService],
    component: M3v5Component,
  },
  {
    path: 'business/m3/m3v6',
    canActivate: [AuthGuardService],
    component: M3v6Component,
  },
  {
    path: 'business/m3/m3v7',
    canActivate: [AuthGuardService],
    component: M3v7Component,
  },
  {
    path: 'business/gzlgl-model/cpwh',
    canActivate: [AuthGuardService],
    component: CpwhComponent,
  },
  {
    path: 'business/gzlgl-model/lzcx',
    canActivate: [AuthGuardService],
    component: LzcxComponent,
  },
  {
    path: 'business/gzlgl-model/mbwh',
    canActivate: [AuthGuardService],
    component: MbwhComponent,
  },
  {
    path: 'business/gzlgl-model/szgzl',
    canActivate: [AuthGuardService],
    component: SzgzlComponent,
  },
  {
    path: 'business/gzlgl-model/tjgzl',
    canActivate: [AuthGuardService],
    component: TjgzlComponent,
  },
  {
    path: 'business/gzlgl-model/jdwh',
    canActivate: [AuthGuardService],
    component: JdwhComponent,
  },
  {
    path: 'business/gzlgl-model/jdsq',
    canActivate: [AuthGuardService],
    component: JdsqComponent,
  },
  {
    path: 'business/gzlgl-model/ymsr',
    canActivate: [AuthGuardService],
    component: YmsrComponent,
  },
  {
    path: 'business/gzlgl-model/jsfp',
    canActivate: [AuthGuardService],
    component: JsfpComponent,
  },
  {
    path: 'business/gzlgl-model/yhgl',
    canActivate: [AuthGuardService],
    component: YhglComponent,
  },
  {
    path: 'business/jcsz/jssz',
    canActivate: [AuthGuardService],
    component: JsszComponent,
  },
  {
    path: 'business/jcsz/xswh',
    canActivate: [AuthGuardService],
    component: XswhComponent,
  },
  
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BusinessRoutingModule { }
