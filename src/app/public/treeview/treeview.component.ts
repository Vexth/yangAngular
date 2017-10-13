import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Message } from 'primeng/primeng';
import { GetList } from '../../business/services/getlist';

import { EventNameService } from '../../business/services/communication.service';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: [
    // '../login/login.component.css',
    // '../login/login.css',
    // '../../../assets/plugins/iCheck/square/blue.css',
    './treeview.component.css'
  ]
})
export class TreeviewComponent implements OnInit {
  public GetList: GetList;
  @Input() treemodule: string = 'M1';
  @Input() treeitem: string = 'V1';
  check: string;
  names: any[];

  username: string;
  password: string;
  msgs: Message[] = [];
  ICON: any[];
  constructor(
    @Inject(GetList) getList: GetList,
    private router: Router,
    @Inject('auth') private service,
    public EventNameService: EventNameService
  ) {
    this.GetList = getList;
    this.ICON = ['fa-cogs', 'fa-users', 'fa-pie-chart', 'fa-calculator'];
  }

  ngOnInit() {
    var key = sessionStorage.getItem("key");
    var vexth = sessionStorage.getItem("vexth");
    if (key !== null) {
      this.names = JSON.parse(vexth);
      this.check = this.treemodule + this.treeitem;
    } else {
      this.router.navigate(['/']);
      this.onSub()
    }

    var addressUrl = location.search.slice(1); //取参数
    var searchParams = new URLSearchParams(addressUrl);
    let token = searchParams.get('token'); //取参数token
    if (token !== null) {
      console.log(token)
      this.onDingSignin(token);
    }
  }

  onSub () {
    this.EventNameService.eventName.subscribe((value) => {
      if (value !== undefined) {
        this.service.GetAuthlist().then(res => {
          for (let i = 0; i < res.authList.length; i++) {
            switch (res.authList[i].id) {
              case 1:
                res.authList[i].icon = this.ICON[0];
                break;
              case 13:
                res.authList[i].icon = this.ICON[1];
                break;
              case 14:
                res.authList[i].icon = this.ICON[2];
                break;
              case 15:
                res.authList[i].icon = this.ICON[3];
                break;
            }

          }
          this.names = res.authList;
          this.check = this.treemodule + this.treeitem;
          sessionStorage.setItem("key", 'vexth');
          sessionStorage.setItem("vexth", JSON.stringify(this.names));
        })
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: '错误提示', detail: '请重新登入' }]
      }
    });
  }

  onDingSignin(token: string) {
    this.GetList.dingSignin(token).then(res => {
      this.EventNameService.eventName.next(res.data.name); // 存放姓名
      sessionStorage.setItem("name", res.data.name);
      return res;
    }).then(res => {
      console.log(res)
      if (res.code == 0) {
        this.router.navigate(['/business/A1']);
        this.onSub();
      } else {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: '错误提示', detail: res.msg });
      }
    })
  }

  /*
  onDingSignin(token: string) {
    this.GetList.dingSignin(token).then(res => {
      if (res.code == 0) {
        this.EventNameService.eventName.next(res.data.name);//存放姓名
        sessionStorage.setItem("name", res.data.name);
        
        this.router.navigate(['/']).then(() => {
          this.service.GetAuthlist().then(res => {
            this.styleName1 = '';
            this.styleName2 = 'vexth';
            for(let i = 0; i < res.authList.length; i++){
              switch (res.authList[i].id) {
              case 1:
                res.authList[i].icon = this.ICON[0];
                break;
              case 13:
                res.authList[i].icon = this.ICON[1];
                break;
              case 14:
                res.authList[i].icon = this.ICON[2];
                break;
              case 15:
                res.authList[i].icon = this.ICON[3];
                break;
              
              }
              
            }
            this.names = res.authList;
            this.check = this.treemodule + this.treeitem;
            sessionStorage.setItem("key", this.styleName2);
            sessionStorage.setItem("vexth", JSON.stringify(this.names));

            this.msgs = [];
            this.msgs = [{ severity: 'info', summary: '成功', detail: '成功' }];

          })
        })
      } else {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: '错误提示', detail: res.msg });
      }
    })
  }
  */

  /*
  onSubmit(formValue: any): void {
    if (formValue.username == undefined) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请填写用户名' });
      return ;
    }
    if (formValue.password == undefined) {
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
        this.router.navigate(['/']).then(() => {
          this.service.GetAuthlist().then(res => {
            this.styleName1 = '';
            this.styleName2 = 'vexth';
            for(let i = 0; i < res.authList.length; i++){
              switch (res.authList[i].id) {
              case 1:
                res.authList[i].icon = this.ICON[0];
                break;
              case 13:
                res.authList[i].icon = this.ICON[1];
                break;
              case 14:
                res.authList[i].icon = this.ICON[2];
                break;
              case 15:
                res.authList[i].icon = this.ICON[3];
                break;
              
              }

            }
            this.names = res.authList;
            this.check = this.treemodule + this.treeitem;
            sessionStorage.setItem("key", this.styleName2);
            sessionStorage.setItem("vexth", JSON.stringify(this.names));
          })
        })
      } else {
        this.msgs = [];
        auth = auth.json();
        this.msgs.push({ severity: 'error', summary: '错误提示', detail: auth.msg });
      }
    });
  }
  */
}
