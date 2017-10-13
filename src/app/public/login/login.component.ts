import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { Auth } from '../../module/login/entity';

import { EventNameService } from '../../business/services/communication.service';
//declare var $:any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.css',
        '../../../assets/plugins/iCheck/square/blue.css',
        '../login/login.css'
    ]
})
export class LoginComponent implements OnInit {

    // auth: Auth;
    username: string;
    password: string;
    msgs: any[];

    constructor( @Inject('auth') private service, private router: Router, public EventNameService: EventNameService) {
    }

    ngOnInit() { }

    onSubmit(formValue: any): void {
        this.service.signin(formValue.username, formValue.password).then(auth => {

            if (formValue.username == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请填写用户名' });
                return;
            }
            if (formValue.password == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: '错误提示', detail: '请填写密码' });
                return;
            }
            this.service.signin(formValue.username, formValue.password).then(auth => {
                if (auth.status == 200) {
                    auth = auth.json();
                    this.EventNameService.eventName.next(auth.data.name); //存放姓名
                    sessionStorage.setItem("name", auth.data.name);
                    this.msgs = [];
                    this.msgs = [{ severity: 'info', summary: '成功', detail: '成功' }];
                    this.router.navigate(['/business/A1'])
                } else {
                    this.msgs = [];
                    auth = auth.json();
                    this.msgs.push({ severity: 'error', summary: '错误提示', detail: auth.msg });
                }
            });
        })
    }
}
