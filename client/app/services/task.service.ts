/*
 * @type Service
 * @authod abhishek das
 * @email abhishekdass08@gmail.com
 * @publish 01-01-2018
*/
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, HttpModule, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TaskModel } from '../models/task-model';
import { LoginService } from './login.service';

@Injectable()
export class TaskService {

    /*
		@variable inCompSource: BehaviorSubject receive all incomplete task
		@variable compSource: BehaviorSubject receive all complete task
		@variable inComp: asObservable of incomplete task
		@variable comp: asObservable of complete task
	*/
    private inCompSource = new BehaviorSubject < TaskModel[] > ([]);
    private compSource = new BehaviorSubject < TaskModel[] > ([]);

    inComp = this.inCompSource.asObservable();
    comp = this.compSource.asObservable();
    sessionId: any;

    headers: Headers;
    options: RequestOptions;

    constructor(private _http: Http, private _logInSrv: LoginService) {}

    /*
     * @func getTask()
     * @return Observable<TaskModel[]>
     * @variable host: Get host url from server and fetch data from server folder (localhost, www.hostsite.com/ etc.)
     * @variable platformId: angular notify if request coming from server or browser
     */
    getTask(): Observable < TaskModel[] > {

        this.sessionId = this._logInSrv.getSessionId();

        return this._http.get(`/todos?sessionId=${this.sessionId}`)
            .map((taskRes: Response) => taskRes.json()
                .data.map((task: TaskModel) => new TaskModel().deserialize(task)));

        /*
		//local data
		return this._http.get("/data/todo_data.json")
					.map((taskRes: Response) => taskRes.json()
					.tasks.map((task: TaskModel) => new TaskModel().deserialize(task)));
		*/
    }

    /*
     * @func getTaskByStatus()
     * @param resTaskList: as TaskModel[]
     * @param flag: filter by flag type
     * @return TaskModel[]
     * @purpose filter task list by status/flag
     */
    getTaskByFlag(resTaskList: TaskModel[], flag: string): TaskModel[] {

        let tmpList;

        tmpList = resTaskList.filter((taskLs) => {

            if (taskLs['status'] === flag) {
                return taskLs;
            }
        });

        if (flag == 'completed') {
            this.compSource.next(tmpList);
        } else {
            this.inCompSource.next(tmpList);

        }

        return tmpList;
    }

    /*
     * @func changeTaskStatus()
     * @param id: index of incomplete task which is now completed
     * @return void
     * @purpose update complete and incomplete task list observables
     */
    changeTaskStatus(id: number): void {

        const onTaskComp = this.inComp.subscribe(taskItm => {
            this.comp.subscribe(task => task.push(taskItm[id]));
            taskItm.splice(id, 1);
        });

        onTaskComp.unsubscribe();
    }

    /*
     * @func taskClose()
     * @param id: completed task id
     * @return void
     * @purpose update completed task list on task close
     */
    taskClose(id: number): void {

        //Make delete Http Call
        const closeComp = this.comp.subscribe(taskItm => {
            taskItm.splice(id, 1);
        });

        closeComp.unsubscribe();
    }

    /*
     * @func taskDelete()
     * @param id: index of incomplete task which is not completed
     * @return void
     * @purpose update completed task list on task close
     */
    taskDelete(taskInfo: any): Observable < any > {

        const sessionId = this.sessionId;

        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
        });

        this.options = new RequestOptions({
            headers: this.headers,
            body: taskInfo
        });

        return this._http.delete('/todo?sessionId=' + sessionId, this.options)
            .map((response: Response) => {
                return response.json();
            });
    }

    /*
     * @func updateTaskList()
     * @param task: get the new task from user
     * @return incompleteTaskLs[]
     * @purpose update incompleted task list Observerables
     */
    addTask(task: TaskModel): Observable < any > {

        // Make pdate Http call
        return this._http.put(`/todo?sessionId=${this.sessionId}`, task)
            .map((response: Response) => {
                return response.json();
            });
    }
}
