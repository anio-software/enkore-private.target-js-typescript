import {MyTreeClass} from "./MyTreeClass.mts"
import type {MyTSTopLevelTypeDescriptor} from "#~export/MyTSTopLevelTypeDescriptor.mts"

export class MyTSTopLevelTypeTreeClass extends MyTreeClass<MyTSTopLevelTypeDescriptor> {
	constructor(type: MyTSTopLevelTypeDescriptor) {
		super(type)
	}
}
