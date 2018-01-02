export interface Deserializable<T> {
	deserialize(inputeData: any): T;
}