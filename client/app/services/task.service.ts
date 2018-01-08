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

        if (flag === 'completed') {
            this.compSource.next(tmpList);
        } else {
            this.inCompSource.next(tmpList);

        }

        return tmpList;
    }

    /*
     * @func changeTaskStatus()
     * @param {compTask} - task which is now completed
     * @param {idx} - index of incomplete task
     * @return void
     * @purpose update complete and incomplete task list
     */
    changeTaskStatus(compTask: TaskModel, idx: number): void {

        this.compSource.getValue().push(compTask);
        this.inCompSource.getValue().splice(idx, 1);
    }

    /*
     * @func taskClose()
     * @param id: completed task id
     * @return void
     * @purpose update completed task list on task close
     */
    taskClose(id: number): void {

        // Make delete Http Call
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
    taskDelete(task: TaskModel): Observable < any > {

        const sessionId = this.sessionId;

        const taskDelete: any = {
            'id': task['_id'],
            'author': task['author']
        };

        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
        });

        this.options = new RequestOptions({
            headers: this.headers,
            body: taskDelete
        });

        const deleteTsk = this._http.delete('/todo?sessionId=' + sessionId, this.options)
            .map((response: Response) => {
                return response.json();
            });


        deleteTsk.subscribe(

            res => {

                 if (res.status === 'success') {

                    const localIncompTask = this.inCompSource.getValue();

                   localIncompTask.filter((ele, idx) => {
                        if (ele['_id'] === res.data['_id']) {
                            this.inCompSource.getValue().splice(idx, 1);
                            return;
                        }
                    });
                } else {

                }
            },
            err => {

            }
        );

        return deleteTsk;
    }

    /*
     * @func updateTaskList()
     * @param task: get the new task from user
     * @return incompleteTaskLs[]
     * @purpose update incompleted task list Observerables
     */
    addTask(formData: any): Observable < any > {

        const addTskStatus = {
            author: {
                _id: this._logInSrv.getLoginUser()['sessionId'],
                username: this._logInSrv.getLoginUser()['username']
            },
            status: 'notCompleted'
        };

        const newFormData = Object.assign(formData, addTskStatus);

        const taskMod = new TaskModel().deserialize(newFormData);

        // Make pdate Http call
        const addTsk = this._http.put(`/todo?sessionId=${this.sessionId}`, taskMod)
                            .map((response: Response) => {
                                return response.json();
                            });

        addTsk.subscribe(
            res => {
                // Error Handling Need it
                const taskRes = new TaskModel().deserialize(res.data);
                this.inCompSource.getValue().push(taskRes);

            },
            err => {
                console.log('Add Task Error > ', err);
            }
        );
        return addTsk;
    }

    /*
     * @func clearTaskList()
     * @purpose Clear the task list
     */
    clearTaskList(): void {

        this.compSource.getValue().splice(0, this.compSource.getValue().length);
        this.inCompSource.getValue().splice(0, this.inCompSource.getValue().length);
    }
}
