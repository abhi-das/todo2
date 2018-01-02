import { Deserializable } from './deserializable.model';

export class TaskModel implements Deserializable<TaskModel> {

	title: number;
	description: string;
	status: string;
	author: string;

	/*
	 * @func deserialize()
	 * @param inputData: as TaskModel
	 * @return TaskModel[]
	 * @purpose combine all values and return as defined TaskModel object
	*/
	deserialize(inputData: any): TaskModel {
		Object.assign(this, inputData);
		return this;
	}
}