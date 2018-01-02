import { Deserializable } from './deserializable.model';

export class UserLoginModel implements Deserializable<UserLoginModel> {

	username: string;
	password: any;

	/*
	 * @func deserialize()
	 * @param inputData: as TaskModel
	 * @return UserLoginModel
	 * @purpose combine all values and return as defined UserLoginModel object
	*/
	deserialize(inputData: any): UserLoginModel {
		Object.assign(this, inputData);
		return this;
	}
}