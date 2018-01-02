/*
 * @type Service
 * @authod abhishek das
 * @email abhishekdass08@gmail.com
 * @publish 01-01-2018
*/
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserLoginModel } from '../models/user.login.model';

@Injectable()

export class LoginService {

	user: any;

	constructor(private _httpClient: HttpClient) {}

	userLogin(userData: UserLoginModel): Observable<string> {

		return this._httpClient.post<any>("/user/auth", userData);
	}

	/*
	 * @func getLoginUser()
	 * @return username
	*/
	getLoginUser():string {
		return this.user['username'];
	}

	/*
	 * @func getSessionId()
	 * @return sessionId
	*/
	getSessionId():any {
		return this.user['sessionId'];
	}

	/*
	 * @func setLoginUser()
	 * @return void
	 * @param userId: set login user id
	*/
	setLoginUser(user): void {
		this.user = user;
	}
}