import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule, AccordionModule, ButtonsModule, TypeaheadModule } from 'ngx-bootstrap';

import { BusinessModule } from './business/business.module';
import { PublicModule } from './public/public.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing.module';
import { HashLocationStrategy,LocationStrategy} from '@angular/common';
import { CommonFunctionModule } from './common/common.function.module';

import { AutoCompleteModule } from 'primeng/primeng';

@NgModule({ 
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgbModule.forRoot(),
    PublicModule,
    BusinessModule,
    AppRoutingModule,
    CoreModule,
    CommonFunctionModule,
    AutoCompleteModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
