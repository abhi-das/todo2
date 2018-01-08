import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../models/task-model';

@Component({
    selector: 'app-add-new-task',
    templateUrl: './add-new-task.component.html',
    styleUrls: ['./add-new-task.component.scss']
})
export class AddNewTaskComponent implements OnInit {

    /*
     * Local variable declaration
     */
    @Output() cancelEvent = new EventEmitter < boolean > ();
    @Output() addTaskEvent = new EventEmitter();

    addNewTaskForm: FormGroup;

    constructor(private _LoginSrv: LoginService, private _taskSrv: TaskService) {}

    /*
     * @func ngOnInit()
     * @return void
     * Subscribe router param to show active user on the page
     */
    ngOnInit() {

        this.addNewTaskForm = new FormGroup({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required)
        });
    }

    /*
     * @func onCancel()
     * @return void
     * Emit cancel event to parent component to notify the user has cancel the action
     */
    onCancel(): void {
        this.cancelEvent.emit(false);
    }

    /*
     * @func onAddTask()
     * @return void
     * Add new task to the task list
     * @variable obj: static task format
     * @variable newData: Merge static obj and user form data
     * @variable taskMod: deserialize the newData object
     * Emit addTaskEvent to the parent component to update incomplete task list Observerables
     *
     */
    onAddTask(): void {

        this._taskSrv.addTask(this.addNewTaskForm.value);
        this.addTaskEvent.emit();
    }
}
