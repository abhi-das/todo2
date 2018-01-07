import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserLoginModel } from '../models/user.login.model';
import 'rxjs/add/operator/catch';

import {Md5} from 'ts-md5/dist/md5';

@Component({
    selector: 'app-log-in',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    /*
     * Local variable declaration
     */
    loginForm: FormGroup;
    htttpFailRes: object;

    constructor(private _route: Router,
            private _LoginSrv: LoginService,
            private _meta: Meta, private _title: Title) {}

    /*
     * @func ngOnInit()
     * @return void
     * @variable loginForm: create FormGroup and add FormControls
     * set html meta tags e.g. meta tags, title etc. for SEO.
     */
    ngOnInit(): void {

        this._meta.addTags([
            {name: 'author', content: 'Login'},
            {name: 'description', content: 'Todo login page'}
        ]);

        this._title.setTitle('Todo Login');

        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    /*
     * @func onAuth()
     * @return void
     * @method userLogin() from _LoginSrv API
     * If Auth successful redirect to dashboard page
     * If Auth fail show error message on Page
     * MD5 encrypted password
     */
        onAuth(): void {

        // console.log(">isValid>>",this.loginForm.valid);
        const userLoginData = new UserLoginModel().deserialize(this.loginForm.value);

        this._LoginSrv.userLogin(userLoginData).subscribe(
            res => {

                if (res.status === 'success') {
                    this._LoginSrv.setLoginUser(res);
                    this._route.navigate(['/dashboard']);
                } else {
                    this.htttpFailRes = res.error;
                }
            },
            err => {
                this.htttpFailRes = err.status;
                console.log('http call fail  >>> ', err.status);
            });
    }
}
