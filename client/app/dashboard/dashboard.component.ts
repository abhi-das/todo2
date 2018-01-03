import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../services/task.service';
import { LoginService } from '../services/login.service';
import { TaskModel } from '../models/task-model';
import { Router } from '@angular/router';

import { AddNewTaskComponent } from './add-new-task/add-new-task.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	/*
	 * Local variable declaration
	*/
	isAdd: boolean;

	logInUser: string;

	taskStatusFlag = {
		completed: 'completed',
		inCompleted: 'notCompleted',
	};

	completedTaskLs: Array<TaskModel>;

	inCompletedTaskLs: Array<TaskModel>;

	constructor(private _taskSrv:TaskService,  private _loginSrv: LoginService,
		private _router:Router) { }

	/*
	 * @func ngOnInit()
	 * @return void
	 * Subscribe router param to show active user on the page
	 * @method getLoginUser() from _LoginSrv API and display loged-in User on page
	 * @method getTask() from _taskSrv API to fetch all the existing tasks from MongoDB
	 * If Http call successful call retrieveTaskByFlag to create complete/incomplete task list and task on respective columns on the page
	 * If Http fail show error message on Page
	*/
	ngOnInit():void {

		this.isAdd = false;
		this.completedTaskLs = [];
		this.inCompletedTaskLs = [];

		this.logInUser = this._loginSrv.getLoginUser()['username'];

		this._taskSrv.getTask().subscribe(
			res => {
				this.retrieveTaskByFlag(res)
			},
			err => {
				console.log('Http call fail! ', err);
			},
			() => {
				console.log('Http call completed');
			});
	}

	/*
	 * @func retrieveTaskByFlag()
	 * @return void
	 * @param result: Response data from getTask service
	 * Filter out tasks list by sending status to @method getTaskByFlag()
	*/
	retrieveTaskByFlag(result: any):void {
		this.completedTaskLs = this._taskSrv.getTaskByFlag(result, this.taskStatusFlag.completed);
		this.inCompletedTaskLs = this._taskSrv.getTaskByFlag(result, this.taskStatusFlag.inCompleted);
	}

	/*
	 * @func onTaskComplete()
	 * @return void
	 * @param idx: completed task id
	 * Update task list by sending completed task id to @method changeTaskStatus()
	*/
	onTaskComplete(idx:number):void {

		this._taskSrv.changeTaskStatus(idx);
		
	}

	/*
	 * @func onTaskClose()
	 * @return void
	 * @param idx: close task id
	 * Remove task from list by sending close task id to @method taskClose()
	*/
	onTaskClose(idx:number): void {

		this._taskSrv.taskClose(idx);
	}

	/*
	 * @func onAddEnable()
	 * @return void
	 * Display add new task form to user
	*/
	onAddEnable(): void {
		this.isAdd = true;
		// let subIncomp = this.inComp.subscribe(taskItm => {
		// 	taskItm.push(task);
		// });

		// subIncomp.unsubscribe();
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
	 * @param isCancel: If user has cancel to new task window
	 * Hide add new task window without adding new task to the task listnumber
	*/
	onTaskDelete(task:TaskModel): void {

		let taskId = task.author['_id'];

		this._taskSrv.taskDelete(taskId).subscribe(

			res => {
				if(res.status === 'success') {
					console.log('Delete SuccessFul!', res);
					// update local variable
					// let deleteIncomp = this._taskSrv.inComp.subscribe(taskItm => {
					// 	taskItm.splice(idx, 1);
					// });
					// deleteIncomp.unsubscribe();
				} else {
					console.log('Delete Fail!', res);
				}
			},
			err => {
				console.log("Delete not possible! ", err);
			},
			() => {
				console.log('Delete SucccessFul!');
		});
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
				if(res.status === 'success') {

					this.completedTaskLs = [];
					this.inCompletedTaskLs = [];
					this._router.navigate(['/login']);
					this._loginSrv.clearLoginUser();
					// console.log('logoff successful! ', res);
				} else {
					// console.log('LogOff error! ', res);
				}
			}, 
			err => {
				// console.log('LogOff not possible! ', err);
			});		
	}
}
