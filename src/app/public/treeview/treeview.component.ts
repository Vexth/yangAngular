import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeviewComponent implements OnInit {

  @Input() treemodule: string = 'M1';
  @Input() treeitem: string = 'V1';
  check: string;
  names = [
    {
      name: '基础设置',
      check: 'M1',
      iocn: 'fa-dashboard',
      child: [
        {
          name:"计算设置",
          routerLink: "/business/m1/m1v1",
          check: "M1V1",
          iocn: 'fa-circle-o'
        },
        {
          name:"系数维护",
          routerLink: "/business/m1/m1v2",
          check: "M1V2",
          iocn: 'fa-circle-o'
        },
        {
          name:"人员技能等级维护",
          routerLink: "/business/m1/m1v2",
          check: "M1V2",
          iocn: 'fa-circle-o'
        },
        {
          name:"技能工资维护",
          routerLink: "/business/m1/m1v2",
          check: "M1V2",
          iocn: 'fa-circle-o'
        }
        ,
        {
          name:"科目规范化维护",
          routerLink: "/business/m1/m1v2",
          check: "M1V2",
          iocn: 'fa-circle-o'
        }
      ]
    },
    {
      name: '权限管理',
      check: 'M2',
      iocn: 'fa-files-o',
      child: [
        {
          name:"角色分配",
          routerLink: "/business/m2/m2v1",
          check: "M2V1",
          iocn: 'fa-circle-o'
        },
        {
          name:"用户管理",
          routerLink: "/business/m2/m2v2",
          check: "M2V2",
          iocn: 'fa-circle-o'
        },
        {
          name:"流程节点授权",
          routerLink: "/business/m2/m2v3",
          check: "M2V3",
          iocn: 'fa-circle-o'
        },
        {
          name:"选项 V4",
          routerLink: "/business/m2/m2v4",
          check: "M2V4",
          iocn: 'fa-circle-o'
        }
      ]
    },
    {
      name: '数据统计',
      check: 'M3',
      iocn: 'fa-pie-chart',
      child: [
        {
          name:"考核工资管理",
          routerLink: "/business/m3/m3v1",
          check: "M3V1",
          iocn: 'fa-circle-o'
        },
        {
          name:"制作部工作量统计",
          routerLink: "/business/m3/m3v2",
          check: "M3V2",
          iocn: 'fa-circle-o'
        },
        {
          name:"选项 V3",
          routerLink: "/business/m3/m3v3",
          check: "M3V3",
          iocn: 'fa-circle-o'
        },
        {
          name:"画中国地图",
          routerLink: "/business/m3/m3v4",
          check: "M3V4",
          iocn: 'fa-circle-o'
        },
        {
          name:"选项 V5",
          routerLink: "/business/m3/m3v5",
          check: "M3V5",
          iocn: 'fa-circle-o'
        },
        {
          name:"选项 V6",
          routerLink: "/business/m3/m3v6",
          check: "M3V6",
          iocn: 'fa-circle-o'
        },
        {
          name:"选项 V7",
          routerLink: "/business/m3/m3v7",
          check: "M3V7",
          iocn: 'fa-circle-o'
        }
      ]
    },
    {
      name: '工作量管理',
      check: 'M4',
      iocn: 'fa-flag',
      child: [
        {
          name:" 审批工作量",
          routerLink: "/business/m4/m4v1",
          check: "M4V1",
          iocn: 'fa-circle-o'
        },
        {
          name:" 査看工作量",
          routerLink: "/business/m4/m4v1",
          check: "M4V1",
          iocn: 'fa-circle-o'
        }
      ]
    },
  ];

  constructor() { 
    const names = this.names
  }

  ngOnInit() {
    // this.check = this.treemodule + this.treeitem;
  }

}
