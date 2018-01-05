/*
 * @authod abhishek das
 * @email abhishekdass08@gmail.com
 * @publish 01-01-2018
 * @purpose Test Case for the Login Service
*/
import { TestBed, inject, async, tick, fakeAsync } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { UserLoginModel } from '../models/user.login.model';
import {Md5} from 'ts-md5/dist/md5';

describe('LoginService service', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [
                LoginService, {
                    provide: XHRBackend,
                    useClass: MockBackend
                }
            ]
        });
        TestBed.compileComponents();
    }));

    it('Should create LoginService!', inject([LoginService], () => {

        expect(LoginService).toBeDefined();

    }));

    it('should log in the user and cache login details',
        inject([LoginService, XHRBackend], (service: LoginService, mockBacked: MockBackend) => {
            // subscribe to connections to mock backend
            mockBacked.connections.subscribe((connection: MockConnection) => {
                // call mock respond of the connection
                // send in a Response Object
                connection.mockRespond(new Response(
                    // pass in new isntance of Response Options
                    new ResponseOptions({
                        body: {
                            status: 'success',
                            sessionId: 'a8t9Rr9bjWD2InfeFLbNS3FNg5mnFqiV',
                            username: 'ali'
                        }
                    })
                ));
            });

            // test userLogin @method from LoginService
            const formData = {
                username: 'ali',
                password: 'password'
            };
            const userLoginData = new UserLoginModel().deserialize(formData);

            service.userLogin(userLoginData)
                .subscribe(res => {
                    expect(res.username).toBe('ali');
                    expect(res.status).toBe('success');
                });
        }));
});
