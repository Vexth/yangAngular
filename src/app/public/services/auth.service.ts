import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import ConstantsList from '../../common/constants/config';
import { BaseService } from '../../common/services/base.service';

@Injectable()
export class AuthService extends BaseService {
  constructor(private http: Http) {
    super();
    this.servicename = 'AuthService-用户服务';
  }

  publicGetServe(url: string, fn: string) {
    return this.http.get(url, { withCredentials: true }).toPromise().then(res => {
      let status: number = res.status;
      if (status === 200) {
        let PB;
        if(res.json().code != 10003){
          PB = res.json().data;
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

  public signin(username: any, password: any) {
    const url = `${ConstantsList.HOSTUser1}api/ding/signin?emp=${username}&pwd=${password}`;
    return this.http.get(url, { withCredentials: true }).toPromise().then(res => res).catch((error: any) => error);
  }

  // 菜单按键权限方法
  public GetAuthlist() {
    const url = `${ConstantsList.HOSTUser1}api/userauth/findauthlist`;
    return this.publicGetServe(url, 'GetAuthlist');
  }

  public GetAuthlist2(id: any) {
    const url = `${ConstantsList.HOSTUser1}api/userauth/findauthlist2?id=${id}`;
    return fetch(url).then(res => res.json());
  }
}
