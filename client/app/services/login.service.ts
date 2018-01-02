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
import { Http, Response } from '@angular/http';

@Injectable()

export class LoginService {

	user: any;

	constructor(private _httpClient: HttpClient) {}

	/*
	 * @func userLogin()
	 * @return login userData
	 * @param userFormData to make POST call
	*/
	userLogin(userFormData: UserLoginModel): Observable<any> {

		return this._httpClient.post<any>("/user/auth", userFormData);
	}

	/*
	 * @func userLogOut()
	 * @return logout Response Observable
	 * @method call getSessionId() to get sessionId  
	*/
	userLogOut(): Observable<any> {

		let sessionId = this.getSessionId();
		return this._httpClient.get(`/user/logout?sessionId=${sessionId}`);
	}

	/*
	 * @func getLoginUser()
	 * @return username
	*/
	getLoginUser():string {

		let userNm = localStorage.getItem('logUser');
		return userNm['username'];
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
	setLoginUser(user: any): void {

		localStorage.setItem('logUser', logUser);

		return this.user = user;
	}
}