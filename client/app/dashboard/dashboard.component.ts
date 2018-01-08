import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TaskService } from '../services/task.service';
import { LoginService } from '../services/login.service';
import { TaskModel } from '../models/task-model';
import { Router } from '@angular/router';

import { AddNewTaskComponent } from './add-new-task/add-new-task.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    /*
     * Local variable declaration
     */
    isAdd: boolean;

    logInUser: string;

    isValidUser: boolean;

    taskStatusFlag = {
        completed: 'completed',
        inCompleted: 'notCompleted',
    };

    completedTaskLs: Array < TaskModel > ;

    inCompletedTaskLs: Array < TaskModel > ;

    constructor(private _taskSrv: TaskService,
        private _loginSrv: LoginService,
        private _router: Router,
        private _meta: Meta,
        private _title: Title) {}

    /*
     * @func ngOnInit()
     * @return void
     * Subscribe router param to show active user on the page
     * @method getLoginUser() from _LoginSrv API and display loged-in User on page
     * @method getTask() from _taskSrv API to fetch all the existing tasks from MongoDB
     * If Http call successful call retrieveTaskByFlag to create complete/incomplete task list and task on respective columns on the page
     * If Http fail show error message on Page
     * set html meta tags e.g. meta tags, title etc. for SEO.
     */
    ngOnInit(): void {

        this._meta.addTags([
            {name: 'author', content: 'Dashboard'},
            {name: 'description', content: 'Todo dashboard, todo task list'}
        ]);

        this._title.setTitle('Todo Deshboard');

        this.isAdd = false;
        this.completedTaskLs = [];
        this.inCompletedTaskLs = [];

        this.logInUser = this._loginSrv.getLoginUser()['username'];

        this._taskSrv.getTask().subscribe(
            res => {

                // Error Handling Need here
                this.retrieveTaskByFlag(res);
            },
            err => {
                // console.log('Http call fail! ', err);
            }, () => {
                // console.log('Http call completed');
            });
    }

    /*
     * @func retrieveTaskByFlag()
     * @return void
     * @param result: Response data from getTask service
     * Filter out tasks list by sending status to @method getTaskByFlag()
     */
    retrieveTaskByFlag(result: any): void {
        this.completedTaskLs = this._taskSrv.getTaskByFlag(result, this.taskStatusFlag.completed);
        this.inCompletedTaskLs = this._taskSrv.getTaskByFlag(result, this.taskStatusFlag.inCompleted);
    }

    /*
     * @func onTaskComplete()
     * @return void
     * @param idx: completed task id
     * Update task list by sending completed task id to @method changeTaskStatus()
     */
    onTaskComplete(compTask: TaskModel, idx: number): void {

        this._taskSrv.changeTaskStatus(compTask, idx);
    }

    /*
     * @func onTaskClose()
     * @return void
     * @param idx: close task id
     * Remove task from list by sending close task id to @method taskClose()
     */
    onTaskClose(idx: number): void {

        this._taskSrv.taskClose(idx);
    }

    /*
     * @func onAddEnable()
     * @return void
     * Display add new task form to user
     */
    onAddEnable(): void {
        this.isAdd = true;
    }

    /*
     * @func isCancelFunc()
     * @return void
     * @param isCancel: If user has cancel to new task window
     * Hide add new task window without adding new task to the task list
     */
    isCancelFunc(isCancel: boolean): void {
        this.isAdd = isCancel;
    }

    /*
     * @func isCancelFunc()
     * @return void
     * @param isCancel: If user has cancel to new task window
     * Hide add new task window without adding new task to the task list
     */
    onAddNewTask(): void {
        this.isAdd = false;
    }

    /*
     * @func onTaskDelete()
     * @return void
     * @param task: If user has cancel to new task window
     * Hide add new task window without adding new task to the task list
     */
    onTaskDelete(task: TaskModel): void {

        this._taskSrv.taskDelete(task);
    }

    /*
     * @func onLogoff()
     * @return void
     * @method userLogOut() from _loginSrv
     * If logout successful clear out tasklist Array and
     * @method If logout successful send null to setLoginUser() to _loginSrv
     * If logout fail throw error on page
     */
    onLogoff(): void {

        this._loginSrv.userLogOut().subscribe(
            res => {
                // console.log(res.status);
                if (res.status === 'success') {

                    // this._taskSrv.clearTaskList();
                    this._loginSrv.clearLoginUser();
                    this._router.navigate(['/login']);
                } else {
                    // console.log('LogOff error! ', res);
                }
            },
            err => {
                // console.log('LogOff not possible! ', err);
            });
    }
}
