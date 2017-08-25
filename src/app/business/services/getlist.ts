import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'promise';
import { findCourse, findTab, PageBackList, Wijmo_PageBackList, findType_M1V1, PageBackContent_M1V1, PageBackContentSSM, PageBackContent_M2V2,PageBackContent_M2V3,BackNews} from '../../module/business/getlist';
import ConstantsList from '../../common/constants/config';
import * as wjcCore from 'wijmo/wijmo';
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
  publicGetServe (url: string, fn: string){
    return this.http.get(url, {withCredentials: true}).toPromise().then(res => {
      let status:number = res.status;
      if(status === 200){
        let PB = res.json().data;
        return PB;
      } else{
        console.error('服务端返回的 http status 错误 : ', status);
        return null;
      }
    }).catch((error: any) => {this.handleError(fn, error);});
  }

  // 菜单按键权限方法
  public GetAuthlist() {
    const url = `${ConstantsList.HOSTUser1}api/userauth/findauthlist`;
    return this.publicGetServe(url, 'GetAuthlist');
  }

  // 产品类别方法
  public GetListFindType(): Promise<any | findType_M1V1>{
    const url = `${ConstantsList.HOSTUser1}api/nodetemplate/findType/`;
    return this.http.get(url).toPromise().then(res => {
      let status:number = res.status;
      if(status === 200){
        let PB:findType_M1V1 = res.json().data.list as findType_M1V1;
        return PB;
      } else{
        console.error('服务端返回的 http status 错误 : ', status);
        return null;
      }
    }).catch((error: any) => {this.handleError('GetListFindType', error);});
  }

  // 通过产品类别获取列表数据
  public GetListPageBy_M1V1(type:number): Promise<any | PageBackContent_M1V1>{
    const url = `${ConstantsList.HOSTUser1}api/nodetemplate/list?type=${type}`;
    return this.http.get(url,{withCredentials: true}).toPromise().then(res => {
      let status:number = res.status;
      if(status === 200){
        let PB:PageBackContent_M1V1 = res.json().data.nodeList as PageBackContent_M1V1;
        return PB;
      } else{
        console.error('服务端返回的 http status 错误 : ', status);
        return null;
      }
    }).catch((error: any) => {this.handleError('GetListPageBy_M1V1', error);});
  }

  // 流程节点方法
  public findNodeOfZzb() {
    const url = `${ConstantsList.HOSTUser1}api/nodetemplate/findNodeOfZzb`;
    return this.http.get(url,{withCredentials: true}).toPromise().then(res => {
      let status:number = res.status;
      if(status === 200){
        let PB = res.json().data.list;
        return PB;
      } else{
        console.error('服务端返回的 http status 错误 : ', status);
        return null;
      }
    }).catch((error: any) => {this.handleError('findNodeOfZzb', error);});

  }

  // 方法类别：/api/ratio/findTab
  public findTab(): Promise<any | findTab>{
    const url = `${ConstantsList.HOSTUser1}api/ratio/findTab`;
    return this.http.get(url).toPromise().then(res => {
      let status:number = res.status;
      if(status === 200){
        let PB:findTab = res.json().data.list as findTab;
        return PB;
      } else{
        console.error('服务端返回的 http status 错误 : ', status);
        return null;
      }
    }).catch((error: any) => {this.handleError('findTab',error);})
  }

  // 学科方法路径：/api/ratio/findCourse
  public findCourse(): Promise<any | findCourse>{
    const url = `${ConstantsList.HOSTUser1}api/ratio/findCourse`;
    return this.http.get(url).toPromise().then(res => {
      let status:number = res.status;
      if(status === 200){
        let PB:findCourse = res.json().data.list as findCourse;
        return PB;
      } else{
        console.error('服务端返回的 http status 错误 : ', status);
        return null;
      }
    }).catch((error: any) => {this.handleError('findCourse',error);})
  }

  // 系数列表方法路径：/api/ratio/list 参数（必传参数：tabid(tab类别方法的id) 可传参数: typeid(产品类别方法id)）
  public ratioList (tabid:number, typeid: number) {
    const url = `${ConstantsList.HOSTUser1}api/ratio/list?tabid=${tabid}&typeid=${typeid}`;
    return this.http.get(url, {withCredentials: true}).toPromise().then(res => {
      let status:number = res.status;
      if(status === 200){
        let PB = res.json().data.ratioList;
        return PB;
      } else{
        console.error('服务端返回的 http status 错误 : ', status);
        return null;
      }
    }).catch((error: any) => {this.handleError('ratioList',error);})
  }

  // 下拉年级方法路径：/api/ratio/findClass
  public findClass() {
    const url = `${ConstantsList.HOSTUser1}api/ratio/findClass`;
    return this.http.get(url, {withCredentials: true}).toPromise().then(res => {
      let status:number = res.status;
      if(status === 200){
        let PB = res.json().data.list;
        return PB;
      } else{
        console.error('服务端返回的 http status 错误 : ', status);
        return null;
      }
    }).catch((error: any) => {this.handleError('findClass',error);})
  }

  // 科目列表（分页）方法路径：/api/cr/list?name
  public crList(name: string) {
    const url = `${ConstantsList.HOSTUser1}api/cr/list?name=${name}`;
    return this.publicGetServe(url, 'crList');
  }


  public GetListPageBySSM(PageIndex:number,PageSize:number): Promise<any | Wijmo_PageBackList>{
    const url = `${ConstantsList.HOSTUser}yang-test/angular/pagelist/${PageIndex}/${PageSize}/`;
    return this.http.get(url)
              .toPromise()
              .then(res => {
                let status:number = res.status;
                if(status === 200){
                  let PB:PageBackList = res.json() as PageBackList;
                  let PBC:PageBackContentSSM[]  = PB.pageBackContent as PageBackContentSSM[];
                  let Wijmo:Wijmo_PageBackList = new Wijmo_PageBackList();
                  Wijmo.List = new wjcCore.ObservableArray();
                  for (let i = 0; i < PBC.length; i++) {
                      Wijmo.List.push({
                          check :false,
                          ID: PBC[i].id,
                          P:  PBC[i].province,
                          C:  PBC[i].city,
                          A:  PBC[i].area,
                          check1:false,
                          check2:false,
                          check3:false,
                          check4:false,
                          check5:false,
                          id: PBC[i].id
                      });
                  }
                  Wijmo.pageNews = PB.pageNews;
                  return Wijmo;
                }
                else{
                  console.error('服务端返回的 http status 错误 : ', status);
                  return null;
                }
              })
              .catch((error: any) => {this.handleError('GetListPageBySSM',error);});
  }

  public GetListPageBy_M2V2(PageIndex:number): Promise<any | Wijmo_PageBackList>{
    const url = `${ConstantsList.HOSTUser}/yang-test/angular/getbnindex/${PageIndex}/${ConstantsList.pageSize}/`;
    return this.http.get(url)
              .toPromise()
              .then(res => {
                let status:number = res.status;
                if(status === 200){
                  let PB:PageBackList = res.json() as PageBackList;
                  let PBC:PageBackContent_M2V2[]  = PB.pageBackContent as PageBackContent_M2V2[];
                  let Wijmo:Wijmo_PageBackList = new Wijmo_PageBackList();

                  Wijmo.List = new wjcCore.ObservableArray();
                  for (let i = 0; i < PBC.length; i++) {
                      Wijmo.List.push({
                          check:false,
                          id: PBC[i].id,
                          indexcode: PBC[i].indexcode,
                          indexname: PBC[i].indexname,
                          indexremark: PBC[i].indexremark,
                          //isdel: PBC[i].isdel === 0 ? '启用':'禁用',
                          //isdelandedit: PBC[i].isdelandedit === 0 ? '可编辑':'已锁定',
                          isdel: PBC[i].isdel,
                          isdelandedit:PBC[i].isdelandedit,
                          button:PBC[i].id,
                      });
                  }
                  Wijmo.pageNews = PB.pageNews;
                  return Wijmo;
                }
                else{
                  console.error('服务端返回的 http status 错误 : ', status);
                  return null;
                }
              })
              .catch((error: any) => {this.handleError('GetListPageBy_M2V2',error);});
  }

  public GetListPageBy_M2V3_List(): Promise<any | PageBackContent_M2V2[]>{
    const url = `${ConstantsList.HOSTUser}/yang-test/angular/getbnindexlist/`;
    return this.http.get(url)
              .toPromise()
              .then(res => {  return res.json() as PageBackContent_M2V2[]; })
              .catch((error: any) => {this.handleError('GetListPageBy_M2V3_List',error);});
  }

  public GetListPageBy_M2V3(PageIndex:number,Type:string): Promise<any | Wijmo_PageBackList>{
    const url = `${ConstantsList.HOSTUser}/yang-test/angular/getbasenews/${PageIndex}/${ConstantsList.pageSize}/${Type}/`;
    return this.http.get(url)
              .toPromise()
              .then(res => {
                let status:number = res.status;
                if(status === 200){
                  let PB:PageBackList = res.json() as PageBackList;
                  let PBC:PageBackContent_M2V3[] = PB.pageBackContent as PageBackContent_M2V3[]
                  let Wijmo:Wijmo_PageBackList = new Wijmo_PageBackList();

                  Wijmo.List = new wjcCore.ObservableArray();
                  for (let i = 0; i < PBC.length; i++) {
                      Wijmo.List.push({
                          check:false,
                          id: PBC[i].id,
                          indexcode: PBC[i].indexcode,
                          code: PBC[i].code,
                          name: PBC[i].name,
                          //workid: PBC[i].workid,
                          //worktime: PBC[i].worktime,
                          remark: PBC[i].remark,
                          //lastworkid: PBC[i].lastworkid,
                          //updatetime: PBC[i].updatetime,
                          orderid: PBC[i].orderid,
                          isdel: PBC[i].isdel,
                          isdelandedit: PBC[i].isdelandedit,
                          //isdel: PBC[i].isdel === 0 ? '启用':'禁用',
                          //isdelandedit: PBC[i].isdelandedit === 0 ? '可编辑':'已锁定',
                          button:PBC[i].id,
                      });
                  }
                  Wijmo.pageNews = PB.pageNews;
                  return Wijmo;
                }
                else{
                  console.error('服务端返回的 http status 错误 : ', status);
                  return null;
                }
              })
              .catch((error: any) => {this.handleError('GetListPageBy_M2V3',error);});
  }

  //======================================================

  public GetSequenceCode(Type:number,IsAdd:number):Promise<any | string> {
    const url = `${ConstantsList.HOSTUser}/yang-test/angular/getsequencecode/${Type}/${IsAdd}/`;
    return this.http.get(url)
              .toPromise()
              .then(res => {
                let status:number = res.status;
                if(status === 200){
                  let Back = res.json() as BackNews;
                  return Back.backNews;
                }
                else{
                  console.error('服务端返回的 http status 错误 : ', status);
                  return null;
                }
              })
              .catch((error: any) => {this.handleError('GetSequenceCode',error);});
  }

  //======================================================

  public Form_M2V2(postvalue:PageBackContent_M2V2,IsAdd:boolean): Promise<any | BackCode> {
    const url = `${ConstantsList.HOSTUser}/yang-test/angular/form_m2v2/`;
    let headers = ConstantsList.headers;
    let options = new RequestOptions({ headers: headers });
    if(IsAdd) {
      return this.http.post(url, postvalue, options).toPromise()
      .then((res) => { return res.json() as BackCode; })
      .catch((error: any) => {this.handleError('Form_M2V2',error);});
    }
    else {
      return this.http.put(url, postvalue, options).toPromise()
      .then((res) => { return res.json() as BackCode; })
      .catch((error: any) => {this.handleError('Form_M2V2',error);});
    }
  }

  public Form_M2V3(postvalue:PageBackContent_M2V3,IsAdd:boolean): Promise<any | BackCode> {
    const url = `${ConstantsList.HOSTUser}/yang-test/angular/form_m2v3/`;
    let headers = ConstantsList.headers;
    let options = new RequestOptions({ headers: headers });
    if(IsAdd) {
      return this.http.post(url, postvalue, options).toPromise()
      .then((res) => { return res.json() as BackCode; })
      .catch((error: any) => {this.handleError('Form_M2V3',error);});
    }
    else {
      return this.http.put(url, postvalue, options).toPromise()
      .then((res) => { return res.json() as BackCode; })
      .catch((error: any) => {this.handleError('Form_M2V3',error);});
    }
  }

}
