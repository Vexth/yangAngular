import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { ZtreeComponent } from '../../../public/ztree/ztree.component';
// 获取页面高度
import { Auxiliary } from '../../../common/constants/auxiliary';


@Component({
    selector: 'app-cygzl',
    templateUrl: './cygzl.component.html',
    styleUrls: ['./cygzl.component.css']
})
export class CygzlComponent {
    @ViewChild('ztreeInstance') ztreeInstance: ZtreeComponent;

    setting: any = {
        check: {
            enable: true
        },
        view: {
            showLine: true,
            showIcon: false
        },
        callback: {
            onClick: function (event, treeId, treeNode, clickFlag) {
                console.info(treeNode);
            },
            onCheck: function (e, treeId, treeNode) {
                console.info(treeNode);
            }
        }
    }

    setting2: any = {
        check: {
            enable: true
        },
        view: {
            showLine: true,
            showIcon: false
        },
        callback: {
            onClick: function (event, treeId, treeNode, clickFlag) {
                console.info(treeNode);
            },
            onCheck: function (e, treeId, treeNode) {
                console.info(treeNode);
            }
        }
    }


    nodes: any = [
        {
            id: "1",
            name: "父节点1", children: [
                { id: "2", name: "子节点1" },
                { id: "3", name: "子节点2" }
            ]
        }
    ];

    nodes2: any = [
        {
            id: "1",
            checked: true,
            name: "父节点1", children: [
                { id: "2", name: "子节点1", checked: true },
                { id: "3", name: "子节点2", keyWord: '子节点2' },
                { id: "4", name: "子节点3" },
                { id: "5", name: "子节点4" },
                { id: "6", name: "子节点5" },
                { id: "7", name: "子节点6" },
                { id: "8", name: "子节点7" },
                { id: "9", name: "子节点8", keyWord: 'zjd8' },
                { id: "10", name: "子节点9" },
                { id: "11", name: "子节点10", keyWord: 'zjd10' }
            ]
        }
    ];

    setting3: any = {
        check: {
            enable: false
        },
        view: {
            showLine: true,
            showIcon: false
        },
        callback: {
            onClick: function (event, treeId, treeNode, clickFlag) {
                console.info(treeNode);
            },
            onCheck: function (e, treeId, treeNode) {
                console.info(treeNode);
            }
        }
    }

    nodes3: any = [
        {
            id: "1",
            name: "父节点1", children: [
                { id: "2", name: "子节点1" },
                { id: "3", name: "子节点2", selected: true }
            ]
        }
    ];

    setting4: any = {
        check: {
            enable: false
        },
        view: {
            showLine: true,
            showIcon: false
        },
        callback: {
            onClick: function (event, treeId, treeNode, clickFlag) {
                console.info(treeNode);
            },
            onCheck: function (e, treeId, treeNode) {
                console.info(treeNode);
            }
        }
    }

    constructor( @Inject('title') private titleService, ) {
        this.titleService.setTitle("审批工作量");
    }

    getCheckedData() {
        //通过ZtreeComponent抛出来的getZtreeInstance()方法访问ztree函数
        console.info(this.ztreeInstance.getTreeInstance().getCheckedNodes(true));
    }

    onApprove(nodes) {
        console.info(nodes);
    }
}
