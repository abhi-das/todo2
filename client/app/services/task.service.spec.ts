/*
 * @authod abhishek das
 * @email abhishekdass08@gmail.com
 * @publish 01-01-2018
 * @purpose Test Case for the Login Service
*/
import { TestBed, inject, async, tick, fakeAsync } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('TaskService service', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [
                TaskService, LoginService, {
                    provide: XHRBackend,
                    useClass: MockBackend
                }
            ]
        });
        TestBed.compileComponents();
    }));

    it('Should create TaskServices !', inject([TaskService], () => {

        expect(TaskService).toBeDefined();

    }));

});
