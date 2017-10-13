import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { GetList } from '../../services/getlist';
import { PostService } from '../../services/post.service';

import 'rxjs/add/operator/toPromise';
// 导入表格组件
import { Header, Footer, TreeNode, Message, MenuItem, ConfirmationService } from 'primeng/primeng';
// 获取页面高度
import { Auxiliary } from '../../../common/constants/auxiliary';

@Component({
    selector: 'app-cygzl',
    templateUrl: './cygzl.component.html',
    styleUrls: ['./cygzl.component.css']
})
export class CygzlComponent implements OnInit {
    private GetList: GetList;
    private PostService: PostService;
    zh: any;

    // 获取表格数据
    dataList: any[];
    dataListCode: any[];
    msgs: Message[] = [];
    // 分页
    rows: number;
    pageLinks: number;
    emptyList = {
        documentId: '',
        nodeId: '',
        uId: '',
        statu: null,
        stime: '',
        etime: '',
        pageNum: 1,
        pageSize: 10
    };
    // findNodeOfZzb 流程节点
    findNodeOfZzbId: string = '';
    findNodeOfZzbList: any[];
    // findUserList 人员
    findUserListId: string = '';
    findUserList: any[];
    // statu 计算状态
    statu: string = '-1';
    // findProductDoc	产品稿件树
    treeTest: TreeNode[]; // 复制一份数据
    filesTree: TreeNode[];
    selectedFile: TreeNode;
    filesTreeId: string;
    // 下拉树显示隐藏
    hide: number = 0;

    // aaa: string;
    constructor(
        @Inject(GetList) getList: GetList,
        @Inject('title') private titleService,
        @Inject(PostService) postService: PostService
    ) {
        this.GetList = getList;
        this.PostService = postService;
        this.titleService.setTitle("查看工作量");
    }
    bindpage(name: number): void {
        this.GetList.workloadFindList(this.emptyList).then(res => {
            this.dataListCode = [];
            if (res.checkList != undefined) {
                res.checkList.map(res => {
                    if(res.check_statu == 0){
                        res.check_calc_workload = '--';
                    }
                    res['stime'] = this.formatDate(res['stime']);
                    res['etime'] = this.formatDate(res['etime']);
                })
                this.dataList = res.checkList;
                this.rows = res.pageSize;
                this.pageLinks = res.totalCount;
            } else {
                this.dataList = [];
            }
        })
    }

    ngOnInit() {
        this.zh = {
            firstDayOfWeek: 0,
            dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: 'Today',
            clear: 'Clear'
        };
        this.emptyList.statu = +this.statu;
        this.bindpage(0);
        this.GetList.findNodeOfZzb().then(res => {
            this.findNodeOfZzbList = [];
            if (res != null){
                this.findNodeOfZzbList = Auxiliary.prototype.publicList(res, 'nodeName');
            }
        })
        this.GetList.findUserList().then(res => {
            this.findUserList = [];
            this.findUserList = Auxiliary.prototype.publicList(res, 'name');
        })
        this.GetList.findProductDoc().then(res => {
            this.filesTree = res;
            this.treeTest = res;
        });
        Auxiliary.prototype.ControlHeight();
    }
    formatDate(date) {
        date = new Date(date);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    }
    paginate(event) {
        this.emptyList.pageSize = event.rows;
        this.emptyList.pageNum = event.page + 1;
        this.bindpage(0);
    }

    onNodeExpand(event: any): void {
        event.originalEvent.stopPropagation();
    }

    // 查询
    query() {
        this.dataListCode = [];
        this.emptyList.nodeId = this.findNodeOfZzbId == '' ? '' : this.findNodeOfZzbId['nodeId'];
        this.emptyList.uId = this.findUserListId == '' ? '' : this.findUserListId['emp_no'];
        this.emptyList.statu = +this.statu;
        this.emptyList.stime = this.emptyList.stime == '' ? '' : this.formatDate(this.emptyList.stime);
        this.emptyList.etime = this.emptyList.etime == '' ? '' : this.formatDate(this.emptyList.etime);

        this.bindpage(0);
    }

    onFocus(event) {
        var This = this;
        var cpLock = false;
        var tree = This.filesTree;
        var treeArr;
        event.target.addEventListener('compositionstart', function(){
            cpLock = true;
        })
        event.target.addEventListener('compositionend', function(){
            cpLock = false;
            if (!cpLock) {
                if (event.target.value != '') {
                    treeArr = [];
                    for(var i = 0; i < tree.length; i++){
                        if(tree[i].data.indexOf(event.target.value) > -1){
                            treeArr.push(tree[i]);
                        }
                    }
                    This.filesTree = treeArr;
                } else {
                    This.filesTree = This.treeTest;
                }
            }
        })
        event.target.addEventListener('input', function(){
            if (!cpLock) {
                if (event.target.value != '') {
                    treeArr = [];
                    for(var i = 0; i < tree.length; i++){
                        if(tree[i].data.indexOf(event.target.value) > -1){
                            treeArr.push(tree[i]);
                            console.log(tree[i])
                        }
                    }
                    This.filesTree = treeArr;
                } else {
                    This.filesTree = This.treeTest;
                }
            }
        });
        event.target.addEventListener('propertychange', () => {
            console.log(this.filesTree)
            console.log(event.target.value)
        })

        this.hide = 1;
    }
    onHide() {
        this.hide = 0;
    }
    nodeSelect(event): void {
        this.filesTreeId = event.node.label;
        this.emptyList.documentId = event.node.id;
        this.hide = 0;
    }

    // 重置
    resetting() {
        this.findNodeOfZzbId = '';
        this.findUserListId = '';
        this.filesTreeId = null;
        this.emptyList.stime = '';
        this.emptyList.etime = '';
        this.statu = '-1';
        this.query();
    }

}
