import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { TreeNode } from 'primeng/primeng';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NodeService {
    
    constructor(private http: Http) {}

    getTest() {
      return this.http.get('product/list?page=1&size=10')
        .toPromise()
        .then(res => <TreeNode[]> res.json().data);
    }

    getFilesystem() {
      return this.http.get('mork/filesystem.json')
        .toPromise()
        .then(res => <TreeNode[]> res.json().data);
    }

    getLazyFilesystem() {
      return this.http.get('mork/filesystem.json')
        .toPromise()
        .then(res => <TreeNode[]> res.json().data);
  }
}