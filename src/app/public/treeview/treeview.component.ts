import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Message } from 'primeng/primeng';
import { GetList } from '../../business/services/getlist';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: [
    './treeview.component.css',
    '../login/login.component.css',
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

  // names = [
  //   {
  //     name: '基础设置',
  //     check: 'M1',
  //     iocn: 'fa-dashboard',
  //     child: [
  //       {
  //         name:"计算设置",
  //         routerLink: "/business/m1/m1v1",
  //         check: "M1V1",
  //         iocn: 'fa-circle-o'
  //       },
  //       {
  //         name:"系数维护",
  //         routerLink: "/business/m1/m1v2",
  //         check: "M1V2",
  //         iocn: 'fa-circle-o'
  //       },
  //       {
  //         name:"人员技能等级维护",
  //         routerLink: "/business/m1/m1v2",
  //         check: "M1V2",
  //         iocn: 'fa-circle-o'
  //       },
  //       {
  //         name:"技能工资维护",
  //         routerLink: "/business/m1/m1v2",
  //         check: "M1V2",
  //         iocn: 'fa-circle-o'
  //       },
  //       {
  //         name:"科目规范化维护",
  //         routerLink: "/business/m1/m1v2",
  //         check: "M1V2",
  //         iocn: 'fa-circle-o'
  //       }
  //     ]
  //   },
  //   {
  //     name: '权限管理',
  //     check: 'M2',
  //     iocn: 'fa-files-o',
  //     child: [
  //       {
  //         name:"角色分配",
  //         routerLink: "/business/m2/m2v1",
  //         check: "M2V1",
  //         iocn: 'fa-circle-o'
  //       },
  //       {
  //         name:"用户管理",
  //         routerLink: "/business/m2/m2v2",
  //         check: "M2V2",
  //         iocn: 'fa-circle-o'
  //       },
  //       {
  //         name:"流程节点授权",
  //         routerLink: "/business/m2/m2v3",
  //         check: "M2V3",
  //         iocn: 'fa-circle-o'
  //       },
  //       {
  //         name:"选项 V4",
  //         routerLink: "/business/m2/m2v4",
  //         check: "M2V4",
  //         iocn: 'fa-circle-o'
  //       }
  //     ]
  //   },
  //   {
  //     name: '数据统计',
  //     check: 'M3',
  //     iocn: 'fa-pie-chart',
  //     child: [
  //       {
  //         name:"考核工资管理",
  //         routerLink: "/business/m3/m3v1",
  //         check: "M3V1",
  //         iocn: 'fa-circle-o'
  //       },
  //       {
  //         name:"制作部工作量统计",
  //         routerLink: "/business/m3/m3v2",
  //         check: "M3V2",
  //         iocn: 'fa-circle-o'
  //       },
  //       {
  //         name:"选项 V3",
  //         routerLink: "/business/m3/m3v3",
  //         check: "M3V3",
  //         iocn: 'fa-circle-o'
  //       },
  //       {
  //         name:"画中国地图",
  //         routerLink: "/business/m3/m3v4",
  //         check: "M3V4",
  //         iocn: 'fa-circle-o'
  //       },
  //       {
  //         name:"选项 V5",
  //         routerLink: "/business/m3/m3v5",
  //         check: "M3V5",
  //         iocn: 'fa-circle-o'
  //       },
  //       {
  //         name:"选项 V6",
  //         routerLink: "/business/m3/m3v6",
  //         check: "M3V6",
  //         iocn: 'fa-circle-o'
  //       },
  //       {
  //         name:"选项 V7",
  //         routerLink: "/business/m3/m3v7",
  //         check: "M3V7",
  //         iocn: 'fa-circle-o'
  //       }
  //     ]
  //   },
  //   {
  //     name: '工作量管理',
  //     check: 'M4',
  //     iocn: 'fa-flag',
  //     child: [
  //       {
  //         name:" 审批工作量",
  //         routerLink: "/business/m4/m4v1",
  //         check: "M4V1",
  //         iocn: 'fa-circle-o'
  //       },
  //       {
  //         name:" 査看工作量",
  //         routerLink: "/business/m4/m4v2",
  //         check: "M4V2",
  //         iocn: 'fa-circle-o'
  //       }
  //     ]
  //   },
  // ];

  xmName: string;
  constructor(
    @Inject(GetList) getList: GetList,
    private router: Router,
    @Inject('auth') private service,
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
        this.xmName = auth.data.name;
        sessionStorage.setItem("keyName", auth.data.name);
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
