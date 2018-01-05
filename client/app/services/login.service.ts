/*
 * @type Service
 * @authod abhishek das
 * @email abhishekdass08@gmail.com
 * @publish 01-01-2018
*/
import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserLoginModel } from '../models/user.login.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Md5} from 'ts-md5/dist/md5';

@Injectable()

export class LoginService {

    user: any;

    constructor(private _http: Http) {}

    /*
     * @func userLogin()
     * @return login userData
     * @param userFormData to make POST call
     */
    userLogin(userFormData: UserLoginModel): Observable < any > {

        userFormData['password'] = Md5.hashStr(userFormData['password']);

        return this._http.post('/user/auth', userFormData)
            .map((res: Response) => {
                return res.json();
            });
    }

    /*
     * @func userLogOut()
     * @return logout Response Observable
     * @method call getSessionId() to get sessionId
     */
    userLogOut(): Observable < any > {

        const sessionId = this.getSessionId();
        return this._http.get(`/user/logout?sessionId=${sessionId}`)
            .map((res: Response) => {
                return res.json();
            });
    }

    /*
     * @func getLoginUser()
     * @return username
     */
    getLoginUser(): any {
        const user = JSON.parse(localStorage.getItem('logUser'));
        return user;
    }

    /*
     * @func getSessionId()
     * @return sessionId
     */
    getSessionId(): any {
        const user = this.getLoginUser();
        return user['sessionId'];
    }

    /*
     * @func setLoginUser()
     * @return void
     * @param user: set login user
     */
    setLoginUser(user: any): void {
        localStorage.setItem('logUser', JSON.stringify(user));
    }

    /*
     * @func clearLoginUser()
     * @return void
     */
    clearLoginUser(): void {
        localStorage.clear();
    }
}
