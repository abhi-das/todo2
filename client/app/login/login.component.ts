import { Component, OnInit } from '@angular/core';
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

    constructor(private _route: Router, private _LoginSrv: LoginService) {}

    /*
     * @func ngOnInit()
     * @return void
     * @variable loginForm: create FormGroup and add FormControls
     */
    ngOnInit(): void {
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
