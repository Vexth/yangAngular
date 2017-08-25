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
    let body = postvalue; //let body = JSON.stringify(postvalue);
    // let headers = ConstantsList.headers;
    // let headers = new Headers({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' });
    // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, body, options).toPromise().
      then((res) => { return res.json() as BackCode; })
      .catch((error: any) => { this.handleError(fn, error); });
  }

  // 添加/修改 /api/nodetemplate/addUpdateNode
  addUpdateNode(postvalue: any) {
    let url = `${ConstantsList.HOSTUser1}api/nodetemplate/addUpdateNode`;
    return this.publicPostServe(postvalue, url, 'addUpdateNode');
  }
  // 删除或批量删除 /api/nodetemplate/ batch_delete
  batchDelete(postvalue: any) {
    let url = `${ConstantsList.HOSTUser1}api/nodetemplate/batch_delete`;
    return this.publicPostServe(postvalue, url, 'batchDelete');
  }

  // 新增或修改系统方法路径：/api/ratio/addUpdateRatio
  addUpdateRatio(postvalue: any) {
    let url = `${ConstantsList.HOSTUser1}api/ratio/addUpdateRatio`;
    return this.publicPostServe(postvalue, url, 'addUpdateRatio');
  }

  // 修改方法方法路径：/api/cr/updateCourse
  crUpdateCourse(postvalue: any) {
    const url = `${ConstantsList.HOSTUser1}api/cr/updateCourse`;
    return this.publicPostServe(postvalue, url, 'crUpdateCourse');
  }

  AddForm(postvalue: string): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser}AddForm.ashx`;
    let body = postvalue; //let body = JSON.stringify(postvalue);
    //let headers = ConstantsList.headers;
    //let headers = new Headers({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' });
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, body, options).toPromise().
      then((res) => { return res.json() as BackCode; })
      .catch((error: any) => { this.handleError('AddForm', error); });
  }

  AddFormSSM(postvalue: QmAngular): Promise<any | BackCode> {
    let url = `${ConstantsList.HOSTUser}yang-test/angular/addfrom/`;
    //let body = JSON.stringify(postvalue);//这个也可以
    let body = postvalue;//这个可以
    let headers = ConstantsList.headers;//spring的restful接口用这个
    // ashx后台页面用这个
    //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options)
      .toPromise()
      .then((res) => { return res.json() as BackCode; })
      .catch((error: any) => { this.handleError('AddFormSSM', error); });
  }
}
