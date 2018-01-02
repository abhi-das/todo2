/*
 * @authod abhishek das
 * @email abhishekdass08@gmail.com
 * @publish 01-01-2018
 * @purpose Test Case for the Application Router
*/
import {Location} from "@angular/common";
import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from './services/task.service';
import { AddNewTaskComponent } from './dashboard/add-new-task/add-new-task.component';
import { LocalRoutes } from './app.routing';

describe('Router: App', () => {

	let location: Location;
	let router: Router;
	let fixture;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule.withRoutes(LocalRoutes),
				FormsModule,
				ReactiveFormsModule
			], 
			declarations: [
				AppComponent,
				LoginComponent,
				DashboardComponent,
				AddNewTaskComponent
			],
			providers: [ LoginService, TaskService ]
		});

		router = TestBed.get(Router); 
		location = TestBed.get(Location); 

		fixture = TestBed.createComponent(AppComponent); 
		router.initialNavigation(); 
	});

	// it('navigate to "" redirects you to /login', fakeAsync(() => { 
	//   router.navigate(['']); 
	//   tick(); 
	//   expect(location.path()).toBe('login'); 
	// }));

	// it('navigate to "" redirects you to /login', fakeAsync(() => { 
	//   router.navigate(['login']); 
	//   tick(); 
	//   expect(location.path()).toBe('login'); 
	// }));

});

