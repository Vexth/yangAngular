import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import ConstantsList from '../../common/constants/config';
import { QmAngular, BackCode } from '../../module/business/formdata';
import { BaseService } from '../../common/services/base.service';

@Injectable()
export class PostService extends BaseService {

  constructor(private http: Http) {
    super();
    this.servicename = 'PostService-表单提交服务';
  }

  publicPostServe(postvalue: any, url: string, fn: string): Promise<any | BackCode> {
    let body = postvalue; // let body = JSON.stringify(postvalue);
    //let headers = ConstantsList.headers;
    // let headers = new Headers({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' });
    // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, body, options).toPromise().
      then((res) => {
        if (res.json().code != 10003) {
          return res.json() as BackCode;
        } else {
          sessionStorage.removeItem('key');
          sessionStorage.removeItem('vexth');
          history.go(0);
        }
      })
      .catch((error: any) => { this.handleError(fn, error); });
  }

  /**put方法**/
  publicPutServe(putvalue: any, url: string, fn: string): Promise<any | BackCode> {
    let body = putvalue;
    // let body = JSON.stringify(postvalue);
    // let headers = ConstantsList.headers;
    // let headers = new Headers({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' });
    // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(url, body, options).toPromise().
      then((res) => { return res.json() as BackCode; })
      .catch((error: any) => { this.handleError(fn, error); });
  }

  // 添加/修改 /api/nodetemplate/addUpdateNode
  addUpdateNode(postvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/nodetemplate/addUpdateNode`;
    return this.publicPostServe(postvalue, url, 'addUpdateNode');
  }
  // 删除或批量删除 /api/nodetemplate/ batch_delete
  batchDelete(postvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/nodetemplate/batch_delete`;
    return this.publicPostServe(postvalue, url, 'batchDelete');
  }

  // 新增或修改系统方法路径：/api/ratio/addUpdateRatio
  addUpdateRatio(postvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/ratio/addUpdateRatio`;
    return this.publicPostServe(postvalue, url, 'addUpdateRatio');
  }

  // 审核、退回、删除方法方法路径： /api/workload/checkBackDel
  checkBackDel(postvalue: any) {
    const url = `${ConstantsList.HOSTUser1}api/workload/checkBackDel`;
    return this.publicPostServe(postvalue, url, 'checkBackDel');
  }

  // /api/cr/updateCourse
  crUpdateCourse(postvalue: any) {
    const url = `${ConstantsList.HOSTUser1}api/cr/updateCourse`;
    return this.publicPostServe(postvalue, url, 'crUpdateCourse');
  }

  //	追加方法方法路径： /api/workload/

  // 人员等级修改方法/api/job/updateJob
  updateJob(postvalue: any) {
    const url = `${ConstantsList.HOSTUser1}api/job/updateJob`;
    return this.publicPostServe(postvalue, url, 'updateJob');
  }

  // 新增或修改方法路径： /api/joblv/addUpdateJoblv
  addUpdateJoblv(postvalue: any) {
    const url = `${ConstantsList.HOSTUser1}api/joblv/addUpdateJoblv`;
    // postvalue = JSON.stringify(postvalue);
    return this.publicPostServe(postvalue, url, 'addUpdateJoblv');
  }

  // 启用方法路径： /api/joblv/batch_open
  joblvBatchOpen(postvalue: any) {
    const url = `${ConstantsList.HOSTUser1}api/joblv/batch_open`;
    return this.publicPostServe(postvalue, url, 'joblvBatchOpen');
  }
  // 禁用方法路径：/api/joblv/batch_close
  joblvBatchClose(postvalue: any) {
    const url = `${ConstantsList.HOSTUser1}api/joblv/batch_close`;
    return this.publicPostServe(postvalue, url, 'joblvBatchClose');
  }
  // 自动计算工作量方法路径： /api/workload/calc
  workloadCalc(postvalue: any) {
    const url = `${ConstantsList.HOSTUser1}api/workload/calc`;
    return this.publicPostServe(postvalue, url, 'workloadCalc');
  }
  // 追加方法路径： /api/workload/addOfCheck
  addOfCheck(postvalue: any) {
    const url = `${ConstantsList.HOSTUser1}api/workload/addOfCheck`;
    return this.publicPostServe(postvalue, url, 'addOfCheck');
  }
  // 调整方法路径： /api/workload/updateOfCheck
  updateOfCheck(postvalue: any) {
    postvalue = JSON.stringify(postvalue);
    const url = `${ConstantsList.HOSTUser1}api/workload/updateOfCheck`;
    return this.publicPostServe(postvalue, url, 'updateOfCheck');
  }

  //产品维护新增
  cpwhAdd(postvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/product/create`;
    return this.publicPostServe(postvalue, url, 'cpwhAdd');
  }

  // 给内部人员增加发外工资 方法路径：/api/tongji/updateUserInnerMoney
  updateUserInnerMoney(postvalue: any) {
    const url = `${ConstantsList.HOSTUser1}api/tongji/updateUserInnerMoney`;
    return this.publicPostServe(postvalue, url, 'updateUserInnerMoney');
  }

  //页码输入
  ymsrSet(postvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/product/setpagelist`;
    return this.publicPostServe(postvalue, url, 'ymsrSet');
  }
  //角色分配，新增角色
  jsfpAdd(postvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/role`;
    return this.publicPostServe(postvalue, url, 'jsfpAdd');
  }
  //角色分配，修改角色
  jsfpEdit(putvalue: any, urlvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/role/${urlvalue}`;
    return this.publicPutServe(putvalue, url, 'jsfpEdit');
  }
  //角色分配,删除
  jsfpDelete(postvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/role/batch_delete`;
    return this.publicPostServe(postvalue, url, 'jsfpDelete');
  }
  //角色分配授权保存
  jsfpWar(postvalue: any, menuId, roleId): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/roleauth/view/${menuId}/setauth?roleId=${roleId}`;
    return this.publicPostServe(postvalue, url, 'jsfpWar');
  }
  //用户管理角色分配保存
  yhglJS(putvalue: any, urlvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/user/${urlvalue}/role`;
    return this.publicPutServe(putvalue, url, 'yhglJS');
  }
  //用户管理部门授权保存
  yhglDept(putvalue: any, urlvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/user/${urlvalue}/department`;
    return this.publicPutServe(putvalue, url, 'yhglDept');
  }
  //流程节点授权保存
  jdsqSet(postvalue: any, departmentId, roleId): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/node_authorization/node?department=${departmentId}&role=${roleId}`;
    return this.publicPostServe(postvalue, url, 'jdsqSet');
  }
  //工作量模板维护新增保存
  mbwhAdd(postvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/worktemplate`;
    return this.publicPostServe(postvalue, url, 'mbwhAdd');
  }
  //工作量模板维护修改保存
  mbwhEdit(putvalue: any, urlvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/worktemplate/${urlvalue}`;
    return this.publicPutServe(putvalue, url, 'mbwhEdit');
  }
  //产品维护新增稿件
  cpwhGJAdd(postvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/product/createdoc`;
    return this.publicPostServe(postvalue, url, 'cpwhGJAdd');
  }
  //产品维护删除
  cpwhDelete(postvalue: any) {
    let url = `${ConstantsList.HOSTUser1}api/product/deletedoclist`;
    // return this.publicPostServe(postvalue, url, 'cpwhDelete');
    let body = postvalue; //let body = JSON.stringify(postvalue);
    // let headers = ConstantsList.headers;
    // let headers = new Headers({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' });
    // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, body, options).toPromise().
      then((res) => { return res.json(); })
    // .catch((error: any) => {this.handleError(fn, error);});
  }
  //工作量统计
  tjgzl(postvalue: any, pageStr: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/count/productworkload?${pageStr}`;
    return this.publicPostServe(postvalue, url, 'tjgzl');
  }
  //设置产品工作量--保存设置
  szgzlPlSetSave(postvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/product/settemplate`;
    return this.publicPostServe(postvalue, url, 'szgzlPlSetSave');
  }
  //工作量模板维护--删除
  mbwhDelete(postvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/worktemplate/batch_delete`;
    return this.publicPostServe(postvalue, url, 'mbwhDelete');
  }

  //流程节点维护新增
  jdwhAdd(postvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/node`;
    // return this.publicPostServe(postvalue, url, 'jdwhAdd');
    let body = postvalue;
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, body, options).toPromise().
      then((res) => { return res.json();})
  }
  //流程节点修改
  jdwhBj(putvalue: any,nodeId): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/node/${nodeId}`;
    // return this.publicPutServe(putvalue, url, 'jdwhBj');
    let body = putvalue;
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(url, body, options).toPromise().
      then((res) => { return res.json();})
  }

  //设置产品工作量--设置
  szgzlSet(postvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/product/setworkload`;
    // return this.publicPostServe(postvalue, url, 'szgzlSet');
    let body = postvalue;
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, body, options).toPromise().
      then((res) => { return res.json();})
  }
  //产品维护保存修改
  cpwhSaveEdit(postvalue: any,documentId,docName): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/product/document/${documentId}/setname?docName=${docName}`;
    return this.publicPostServe(postvalue, url, 'cpwhSaveEdit');
  }

  //流转查询删除
  lzcxDelete(postvalue: any): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser1}api/document/log/batch_delete`;
    let body = postvalue;
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, body, options).toPromise().
      then((res) => { return res.json();})
  }

  // 四分配部门组修改方法 /api/userpost/updateUserPost  post请求--userId就是列表的id值，postId就是下拉框id值，leader 0排版员 1组长或领导{"userId":130,"postId":2,"leader":0}
  updateUserPost(postvalue: any) {
    const url = `${ConstantsList.HOSTUser1}api/userpost/updateUserPost`;
    return this.publicPostServe(postvalue, url, 'updateUserPost');
  }

}
