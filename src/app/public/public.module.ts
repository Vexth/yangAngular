import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './services/auth.service';
import { PublicRoutingModule } from './public.routing.module';

// import { LoginComponent } from './login/login.component';
import { TopComponent } from './top/top.component';
import { TreeviewComponent } from './treeview/treeview.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PagingComponent } from './paging/paging.component';

import { BusinessComponent } from '../business/business.component';
import { GrowlModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    GrowlModule,
    NgbModule
  ],
  declarations: [
    // LoginComponent,
    TopComponent,
    TreeviewComponent,
    FooterComponent,
    NavigationComponent,
    PagingComponent,
    BusinessComponent
  ],
  exports: [
    TopComponent,
    TreeviewComponent,
    FooterComponent,
    NavigationComponent,
    PagingComponent
  ],
  providers: [
    { provide: 'auth', useClass: AuthService },
  ]
})
export class PublicModule { }
