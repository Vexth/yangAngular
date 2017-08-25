import { Http, Headers } from '@angular/http';

const ConstantsList = Object.freeze({
  HOSTUser : 'http://114.215.44.2:8080/',
  HOSTUser1 : 'http://192.168.230.82:8000/',
  headers : new Headers({'Content-Type': 'application/json'}),
  pageSize : 10,
  pageHeight:142,
});
export default ConstantsList;
