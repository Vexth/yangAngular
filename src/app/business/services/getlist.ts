import { Injectable } from '@angular/core';
import { Http, Headers, Response ,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'promise';
import { CpwhList, findCourse, findTab, PageBackList, findType_M1V1, PageBackContent_M1V1, PageBackContentSSM, PageBackContent_M2V2, PageBackContent_M2V3, BackNews } from '../../module/business/getlist';

import ConstantsList from '../../common/constants/config';
import { BackCode } from '../../module/business/formdata';
import { BaseService } from '../../common/services/base.service';
'use strict';

@Injectable()
export class GetList extends BaseService {

  constructor(private http: Http) {
    super();
    this.servicename = 'GetList-列表服务';
  }

  // get获取后台数据的公共方法
  publicGetServe(url: string, fn: string) {
    return this.http.get(url, { withCredentials: true }).toPromise().then(res => {
      let status: number = res.status;
      if (status === 200) {
        let PB;
        if(res.json().code != 10003){
          if(res.json().code == 0){
            PB = res.json().data;
          }else{
            PB = res.json();
          }
        } else {
          sessionStorage.removeItem('key');
          sessionStorage.removeItem('vexth');
          history.go(0);
        }
        return PB;
      } else {
        console.error('服务端返回的 http status 错误 : ', status);
        return null;
      }
    }).catch((error: any) => { this.handleError(fn, error); });
  }
  // 格式化参数 --- 处理参数
  formatParams(data) {
    let arr = [];
    for (let name in data) {
      arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
  }

  // 菜单按键权限方法
  public GetAuthlist() {
    const url = `${ConstantsList.HOSTUser1}api/userauth/findauthlist`;
    return this.publicGetServe(url, 'GetAuthlist');
  }

  // 产品类别方法
  public GetListFindType(): Promise<any | findType_M1V1> {
    const url = `${ConstantsList.HOSTUser1}api/nodetemplate/findType/`;
    return this.publicGetServe(url, 'GetListFindType').then(res => {
      let PB: findType_M1V1 = res.list as findType_M1V1;
      return PB;
    });
  }

  // 通过产品类别获取列表数据
  public GetListPageBy_M1V1(type: number): Promise<any | PageBackContent_M1V1> {
    const url = `${ConstantsList.HOSTUser1}api/nodetemplate/list?type=${type}`;
    return this.publicGetServe(url, 'GetListPageBy_M1V1').then(res => {
      let PB: PageBackContent_M1V1 = res.nodeList as PageBackContent_M1V1;
      return PB;
    })
  }

  // 流程节点方法
  public findNodeOfZzb() {
    const url = `${ConstantsList.HOSTUser1}api/nodetemplate/findNodeOfZzb`;
    return this.publicGetServe(url, 'findNodeOfZzb').then(res => res.list);
  }

  // 方法类别：/api/ratio/findTab
  public findTab(): Promise<any | findTab> {
    const url = `${ConstantsList.HOSTUser1}api/ratio/findTab`;
    return this.publicGetServe(url, 'findTab').then(res => {
      let PB: findTab = res.list as findTab;
      return PB;
    });
  }

  // 学科方法路径：/api/ratio/findCourse
  public findCourse(): Promise<any | findCourse> {
    const url = `${ConstantsList.HOSTUser1}api/ratio/findCourse`;
    return this.publicGetServe(url, 'findCourse').then(res => {
      let PB: findCourse = res.list as findCourse;
      return PB;
    });
  }

  // 系数列表方法路径：/api/ratio/list 参数（必传参数：tabid(tab类别方法的id) 可传参数: typeid(产品类别方法id)）
  public ratioList(tabid: number, typeid: number) {
    const url = `${ConstantsList.HOSTUser1}api/ratio/list?tabid=${tabid}&typeid=${typeid}`;
    return this.publicGetServe(url, 'ratioList').then(res => res.ratioList)
  }

  // 下拉年级方法路径：/api/ratio/findClass
  public findClass() {
    const url = `${ConstantsList.HOSTUser1}api/ratio/findClass`;
    return this.publicGetServe(url, 'findClass').then(res => res.list);
  }

  //产品维护页面表格数据
  public cpwhList(data): Promise<any | CpwhList> {
    const list = this.formatParams(data);
    const url = `${ConstantsList.HOSTUser1}api/product/list?${list}`;
    return this.publicGetServe(url, 'cpwhList').then(res => res as CpwhList)
  }
  //产品维护页面新增产品查询条件list
  public cpwhadd() {
    const url = `${ConstantsList.HOSTUser1}api/product/optionlist`;
    return this.publicGetServe(url, 'cpwhadd');
  }
  //流转查询获取查询条件
  public lzcxOpts() {
    const url = `${ConstantsList.HOSTUser1}api/count/productworkload`;
    return this.publicGetServe(url, 'lzcxOpts');
  }
  //流转查询获取页面表格数据
  public lzcxDataList(data) {
    const list = this.formatParams(data);
    const url = `${ConstantsList.HOSTUser1}api/document/log?${list}`;
    return this.publicGetServe(url, 'lzcxOpts');
  }

  // 审核工作量模块 方法路径： /api/workload/checkList?documentId=&nodeId=&uId=&statu=-1&stime=2017-08-01&etime=2018-10-12&pageNum=1&pageSize=10
  public workloadChecklist(name: any) {
    const nameNode = this.formatParams(name);
    const url = `${ConstantsList.HOSTUser1}api/workload/checkList?${nameNode}`;
    return this.publicGetServe(url, 'workloadChecklist');
  }

  // 查看工作量列表方法路径：api/workload/findList?documentId=&nodeId=&uId=&statu=-1&stime=&etime=&pageNum=1&pageSize=10
  public workloadFindList(name: any) {
    const nameNode = this.formatParams(name);
    const url = `${ConstantsList.HOSTUser1}api/workload/findList?${nameNode}`;
    return this.publicGetServe(url, 'workloadFindList');
  }

  // 产品稿件树方法路径：/api/workload/findProductDoc
  public findProductDoc() {
    const url = `${ConstantsList.HOSTUser1}api/workload/findProductDoc`;
    return this.publicGetServe(url, 'findProductDoc').then(res => res.productDocList);
  }
  // 产品稿件树方法路径：/api/workload/getProductDoc 增加了科目，年级，类别
  public getProductDoc() {
    const url = `${ConstantsList.HOSTUser1}api/workload/getProductDoc`;
    return this.publicGetServe(url, 'getProductDoc').then(res => res.productDocList);
  }

  // 获取制作部人员方法方法路径： /api/workload/findUserList
  public findUserList() {
    const url = `${ConstantsList.HOSTUser1}api/workload/findUserList`;
    return this.publicGetServe(url, 'findUserList').then(res => res.userList);
  }

  // 技能等级方法路径：/ api/joblv/list?type=-1
  public joblvList(name: any) {
    const url = `${ConstantsList.HOSTUser1}api/joblv/list?type=${name}`;
    return this.publicGetServe(url, 'joblvList');
  }
  // '/zzdocument/'+ documentId + '/' + NodeId
  public zzdocument(documentId: number, NodeId: number) {
    const url = `${ConstantsList.HOSTUser1}/zzdocument/${documentId}/${NodeId}`;
    return this.publicGetServe(url, 'zzdocument').then(res => {
      if(res == undefined){
        console.error('服务端返回的数据错误 : ', res);
        return null;
      } else {
        return res.nodeTemplate[0];
      }
    });
  }

  // 人员等级模块 列表方法路径：/api/job/list?flag=0&level=-1
  public jobList(name: any) {
    const nameNode = this.formatParams(name);
    const url = `${ConstantsList.HOSTUser1}api/job/list?${nameNode}`;
    return this.publicGetServe(url, 'jobList');
  }
  // 方法路径：/api/cr/list?name
  public crList(name: any) {
    const nameNode = this.formatParams(name);
    const url = `${ConstantsList.HOSTUser1}api/cr/list?${nameNode}`;
    return this.publicGetServe(url, 'crList');
  }
  // 考核工资管理 列表方法（必带年月日期—按月份）路径：/api/tongji/tongjiList?name=&level=-1&bearDate=2017-08
  public tongjiList(name: any) {
    const nameNode = this.formatParams(name);
    const url = `${ConstantsList.HOSTUser1}api/tongji/tongjiList?${nameNode}`;
    return this.publicGetServe(url, 'tongjiList');
  }
  // 统计计算（界面上的计算）方法路径: api/tongji/tongjiWages?bearDate=2017-08
  public tongjiWages(name: any) {
    const url = `${ConstantsList.HOSTUser1}api/tongji/tongjiWages?bearDate=${name}`;
    // 在get请求中使用fetch方法 --- 对于由后台返回结果与提示结果的方法可以使用
    return fetch(url).then(res => res.json())
  }
  // 完结（锁定）方法路径： /api/tongji/lockWages?bearDate=2017-08
  public lockWages(name: any) {
    const url = `${ConstantsList.HOSTUser1}api/tongji/lockWages?bearDate=${name}`;
    return fetch(url).then(res => res.json())
  }
  // 工作量统计 统计列表方法路径：/api/tongji/wagesList?name=&level=-1&bearDate=2017-08
  public wagesList(name: any) {
    const nameNode = this.formatParams(name);
    const url = `${ConstantsList.HOSTUser1}api/tongji/wagesList?${nameNode}`;
    return this.publicGetServe(url, 'wagesList');
  }
  // 发外人员工资列表方法（必带年月日期—按月份）方法路径：/api/wai/ tongjiWaiList?name=& bearDate=2017-08
  public tongjiWaiList(name: any) {
    const nameNode = this.formatParams(name);
    const url = `${ConstantsList.HOSTUser1}api/wai/tongjiWaiList?${nameNode}`;
    return this.publicGetServe(url, 'tongjiWaiList');
  }
  // 统计方法路径：/api/wai/tongjiWaiWages?bearDate=2017-08
  public tongjiWaiWages(name: any) {
    const url = `${ConstantsList.HOSTUser1}api/wai/tongjiWaiWages?bearDate=${name}`;
    return fetch(url).then(res => res.json());
  }
  // 完结方法路径：/api/wai/lockWaiWages?bearDate=2017-08
  public lockWaiWages(name: any) {
    const url = `${ConstantsList.HOSTUser1}api/wai/lockWaiWages?bearDate=${name}`;
    return fetch(url).then(res => res.json());
  }


  //流转查询删除
  public lzcxDelete(id) {
    const url = `${ConstantsList.HOSTUser1}api/document/log/batch_delete?${id}`;
    return this.publicGetServe(url, 'lzcxDelete');
  }
  //流程节点维护页面表格数据
  public jdwhDataList(data) {
    const list = this.formatParams(data);
    const url = `${ConstantsList.HOSTUser1}api/node?${list}`;
    return this.publicGetServe(url, 'jdwhDataList');
  }
  //工作量统计查询条件
  public tjgzlOptsList() {
    const url = `${ConstantsList.HOSTUser1}api/count/productworkload`;
    return this.publicGetServe(url, 'tjgzlOptsList');
  }
  //公共获取部门
  public getDeptList() {
    const url = `${ConstantsList.HOSTUser1}api/department`;
    return this.publicGetServe(url, 'getDeptList');
  }
  //公共获取角色
  public getRoleList() {
    const url = `${ConstantsList.HOSTUser1}api/role`;
    return this.publicGetServe(url, 'getRoleList');
  }
  //公共获取节点
  public getNodeList() {
    const url = `${ConstantsList.HOSTUser1}api/node?pageSize=10000&pageNum=1`;
    return this.publicGetServe(url, 'getNodeList');
  }
  //流程节点授权
  public jdsqDataList(data) {
    const list = this.formatParams(data);
    const url = `${ConstantsList.HOSTUser1}api/node_authorization?${list}`;
    return this.publicGetServe(url, 'jdsqDataList');
  }
  //流程节点授权获取选中数据
  public jdsqGetCheck(data) {
    const list = this.formatParams(data);
    const url = `${ConstantsList.HOSTUser1}api/node_authorization/node?${list}`;
    return this.publicGetServe(url, 'jdsqGetCheck');
  }
  //页码输入表格数据
  public ymsrDataList(data) {
    const list = this.formatParams(data);
    const url = `${ConstantsList.HOSTUser1}api/product/pagelist?${list}`;
    return this.publicGetServe(url, 'ymsrDataList');
  }
  //角色分配表格数据
  public jsfpDataList() {
    const url = `${ConstantsList.HOSTUser1}api/role`;
    return this.publicGetServe(url, 'jsfpDataList');
  }
  //角色分配.授权的模块
  public jsfpWarLeft() {
    const url = `${ConstantsList.HOSTUser1}api/roleauth/viewlist`;
    return this.publicGetServe(url, 'jsfpWarLeft');
  }
  //角色分配授权获取右侧list
  public jsfpWarRight(menuId,roleId) {
    const url = `${ConstantsList.HOSTUser1}api/roleauth/view/${menuId}/authlist?roleId=${roleId}`;
    return this.publicGetServe(url, 'jsfpWarLeft');
  }
  //用户管理获取部门
  public yhglGetDept() {
    const url = `${ConstantsList.HOSTUser1}api/department/all`;
    return this.publicGetServe(url, 'yhglGetDept');
  }
  //用户管理表格数据
  public yhglGetFromData(data) {
    const list = this.formatParams(data);
    const url = `${ConstantsList.HOSTUser1}api/user?${list}`;
    return this.publicGetServe(url, 'yhglGetDept');
  }
  //设置产品工作量
  public szgzlDataList(data) {
    const list = this.formatParams(data);
    const url = `${ConstantsList.HOSTUser1}api/product/workloadlist?${list}`;
    return this.publicGetServe(url, 'szgzlDataList');
  }
  //设置产品工作量批量设置获取data
  public szgzlSetPL(data) {
    const url = `${ConstantsList.HOSTUser1}api/product/templatelist/${data}`;
    return this.publicGetServe(url, 'szgzlSetPL');
  }
  //模板维护页面数据
  public mbwhDataList(data) {
    const list = this.formatParams(data);
    const url = `${ConstantsList.HOSTUser1}api/worktemplate?${list}`;
    return this.publicGetServe(url, 'mbwhDataList');
  }
  //模板维护新增的下拉数据
  public mbwhAddDataList() {
    const url = `${ConstantsList.HOSTUser1}api/worktemplate/createoption`;
    return this.publicGetServe(url, 'mbwhAddDataList');
  }
  //模板维护新增部门改变时获取节点
  public mbwhAddNodeList(data) {
    const url = `${ConstantsList.HOSTUser1}api/department/authnodelist/${data}`;
    return this.publicGetServe(url, 'mbwhAddNodeList');
  }
  public mbwhEditModel(data) {
    const url = `${ConstantsList.HOSTUser1}api/worktemplate/${data}`;
    return this.publicGetServe(url, 'mbwhEditModel');
  }

  //设置工作量批量设置选择模板时获取模板数据
  public szgzlSetModel(data) {
    const url = `${ConstantsList.HOSTUser1}api/worktemplate/${data}/workload`;
    return this.publicGetServe(url, 'szgzlSetModel');
  }
  
  public jdwhBjV1(data) {
    const list = this.formatParams(data);
    const url = `${ConstantsList.HOSTUser1}api/node/242?${list}`;
    return this.publicGetServe(url, 'jdwhDataList');
  }
}
