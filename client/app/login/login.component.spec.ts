/*
 * @authod abhishek das
 * @email abhishekdass08@gmail.com
 * @publish 01-01-2018
 * @purpose Test Case for the Login Component
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { UserLoginModel } from '../models/user.login.model';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture < LoginComponent > ;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                HttpClientModule,
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                LoginComponent
            ],
            providers: [LoginService]
        });

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        component.ngOnInit();

    });

    it('should create LoginComponent', () => {
        expect(component).toBeTruthy();
    });

    it('form invalid when empty', () => {
        expect(component.loginForm.valid).toBeFalsy();
    });

    it('user name should not be empty', () => {
        const usernameEle = component.loginForm.controls['username'];
        expect(usernameEle.valid).toBeFalsy();
    });

    it('password should not be empty', () => {
        const passwordEle = component.loginForm.controls['password'];
        expect(passwordEle.valid).toBeFalsy();
    });

    it('Submit a form data and match the user filled values ', () => {
        expect(component.loginForm.valid).toBeFalsy();
        component.loginForm.controls['username'].setValue('abc');
        component.loginForm.controls['password'].setValue('password');

        const formData = component.loginForm.value;
        component.onAuth();

        expect(formData['username']).toBe('abc');
        expect(formData['password']).toBe('password');

    });

    // Add one more case for redirect after form submit

});
