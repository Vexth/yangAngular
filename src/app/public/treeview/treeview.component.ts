import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Message } from 'primeng/primeng';
import { GetList } from '../../business/services/getlist';

import { EventNameService } from '../../business/services/communication.service';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: [
    './treeview.component.css',
    '../login/login.component.css',
    '../login/login.css',
    '../../../assets/plugins/iCheck/square/blue.css'
  ]
})
export class TreeviewComponent implements OnInit {
  public GetList: GetList;
  @Input() treemodule: string = 'M1';
  @Input() treeitem: string = 'V1';
  check: string;
  names: any[];
  styleName1: string = 'vexth';
  styleName2: string = '';

  username: string;
  password: string;
  msgs: Message[] = [];

  xmName: string;
  constructor(
    @Inject(GetList) getList: GetList,
    private router: Router,
    @Inject('auth') private service,
    public EventNameService:EventNameService
  ) {
    this.GetList = getList;
  }

  ngOnInit() {
    var key = sessionStorage.getItem("key");
    var vexth = sessionStorage.getItem("vexth");
    var keyName = sessionStorage.getItem("keyName");
    if (key !== null) {
      this.styleName1 = '';
      this.styleName2 = 'vexth';
      this.xmName = keyName;
      this.names = JSON.parse(vexth).authList;
      this.check = this.treemodule + this.treeitem;
    }
  }

  onSubmit(formValue: any): void {
    console.log(formValue)
    if(formValue.username == undefined){
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请填写用户名' });
      return ;
    }
    if(formValue.password == undefined){
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请填写密码' });
      return ;
    }
    this.router.navigate(['/']);
    sessionStorage.removeItem('/');
    this.service.signin(formValue.username, formValue.password).then(auth => {
      if (auth.status == 200) {
        auth = auth.json();
        this.EventNameService.eventName.next(auth.data.name);//存放姓名
        sessionStorage.setItem("name", auth.data.name);
        this.msgs = [];
        this.msgs = [{ severity: 'info', summary: '成功', detail: '成功' }];
        this.router.navigate(['/business/A1']).then(() => {
          this.service.GetAuthlist().then(res => {
            this.styleName1 = '';
            this.styleName2 = 'vexth';
            this.names = res.authList;
            this.check = this.treemodule + this.treeitem;
            sessionStorage.setItem("key", this.styleName2);
            sessionStorage.setItem("vexth", JSON.stringify(res));
          })
        })
      } else {
        this.msgs = [];
        auth = auth.json();
        this.msgs.push({ severity: 'error', summary: '错误提示', detail: auth.msg });
      }
    });
  }
}
