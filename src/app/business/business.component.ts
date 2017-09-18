import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Auxiliary } from '../common/constants/auxiliary';

@Component({
    selector: 'app-login',
    template: `<div class="content-wrapper"></div>`
})
export class BusinessComponent implements OnInit {
    constructor(@Inject('auth') private service, private router: Router) {}
    
    ngOnInit(){
        // this.router.navigate(['/']);
        this.router.navigate(['/business/A1']);
        Auxiliary.prototype.ControlHeight();
    }
}
