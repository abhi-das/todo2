import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TaskService } from './services/task.service';
import { LoginService } from './services/login.service';
import { AppRoutingModule } from './app.routing';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddNewTaskComponent } from './dashboard/add-new-task/add-new-task.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * The about module
 *
 * Just embedding <about> component and it's routing definition in {@link AboutRoutingModule}
 */
@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        AddNewTaskComponent
    ],
    providers: [TaskService, LoginService],
    bootstrap: [AppComponent]
})
export class AppModule {}
