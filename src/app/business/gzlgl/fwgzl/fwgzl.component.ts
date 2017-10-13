import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { GetList } from '../../services/getlist';
import { PostService } from '../../services/post.service';

import 'rxjs/add/operator/toPromise';
// 导入表格组件
import { Header, Footer, TreeNode, Message, MenuItem, ConfirmationService } from 'primeng/primeng';
// 获取页面高度
import { Auxiliary } from '../../../common/constants/auxiliary';

@Component({
    selector: 'app-fwgzl',
    templateUrl: './fwgzl.component.html',
    styleUrls: ['./fwgzl.component.css']
})
export class FwgzlComponent implements OnInit {
    private GetList: GetList;
    private PostService: PostService;
    msgs: Message[] = [];
    zh: any;
    selected: any = {};
    formDataList: any = [];
    total: string = "1";
    depList: any = [];
    optsList: any = {
        statu: "-1", stime: "", etime: "", depType: "-1", pageNum: 1, pageSize: 10
    }
    ngOnInit() {
        Auxiliary.prototype.ControlHeight();
        this.getDepList();
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
        this.getFromData();
    }
    constructor( @Inject(GetList) getList: GetList, @Inject(PostService) postService: PostService, private confirmationService: ConfirmationService) {
        this.GetList = getList; this.PostService = postService;
    }
    //获取事业群
    getDepList() {
        this.GetList.fwgzlGetdeptList().catch(res => {
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: '错误提示', detail: res.msg }];
            return;
        }).then(res => {
            this.depList = res.list;
            console.log(res);
        });
    }
    getFromData() {
        if (this.optsList.stime) { this.optsList.stime = this.getFormetDate(this.optsList.stime) };
        if (this.optsList.etime) { this.optsList.etime = this.getFormetDate(this.optsList.etime) };
        this.GetList.wfgzlDataList(this.optsList).catch(res => {
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: '错误提示', detail: res.msg }];
            return;
        }).then(res => {
            this.formDataList = [];
            if(res.waiDetailList != undefined){
                for (let i = 0; i < res.waiDetailList.length; i++) {
                    // console.log(res.waiDetailList[i]['gmt_create'].getFullYear())
                    res.waiDetailList[i]['gmt_create'] = this.formatDate(res.waiDetailList[i]['gmt_create']);
                }
                this.formDataList = res.waiDetailList;
            }
        });
    }

    formatDate(date) {
        date = new Date(date);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    }
    query() {
        this.getFromData();
    }
    paginate(event) {
        this.optsList.pageSize = event.rows;
        this.optsList.pageNum = event.page + 1;
        this.getFromData();
    }
    //格式化日期
    getFormetDate(time: any) {
        const Dates = new Date(time);
        const year: number = Dates.getFullYear();
        const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day;
    }
}
