import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
// import { BusinessComponent } from '../business/business.component';

const routes: Routes = [
  {
    path: 'public/login',
    component: LoginComponent,
  },
  // {
  //   path: 'public/login',
  //   component: BusinessComponent,
  // }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PublicRoutingModule { }
