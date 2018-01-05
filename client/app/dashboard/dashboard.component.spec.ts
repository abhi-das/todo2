/*
 * @authod abhishek das
 * @email abhishekdass08@gmail.com
 * @publish 01-01-2018
 * @purpose Test Case for the Dashboard Component
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { LoginService } from '../services/login.service';
import { TaskModel } from '../models/task-model';
import { RouterTestingModule } from '@angular/router/testing';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { Http, Response, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// describe('DashboardComponent', () => {
//   let component: DashboardComponent;
//   let fixture: ComponentFixture<DashboardComponent>;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         FormsModule,
//         ReactiveFormsModule,
//         HttpModule,
//         HttpClientModule
//       ],
//       declarations: [
//         DashboardComponent,
//         AddNewTaskComponent
//       ],
//       providers: [ TaskService, LoginService ]
//     })
//     fixture = TestBed.createComponent(DashboardComponent);
//     component = fixture.componentInstance;
//     component.ngOnInit();
//     fixture.detectChanges();
//   });
//   it('should create DashboardComponent', () => {
//     expect(component).toBeTruthy();
//   });
// });
