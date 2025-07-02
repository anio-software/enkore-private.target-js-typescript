import {MyTreeClass} from "./MyTreeClass.ts"
import type {MyTSTopLevelTypeDescriptor} from "#~export/MyTSTopLevelTypeDescriptor.ts"

export class MyTSTopLevelTypeTreeClass extends MyTreeClass<MyTSTopLevelTypeDescriptor> {
	constructor(type: MyTSTopLevelTypeDescriptor) {
		super(type)
	}
}
