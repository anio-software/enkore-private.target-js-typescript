import {MyTreeClass} from "./MyTreeClass.mts"

export class MyTSSourceFileDependencyTreeClass extends MyTreeClass<string> {
	constructor(filePath: string) {
		super(filePath)
	}
}
