export interface IChore {
	id: string;
	content: string;
	status: ChoreState;
}

export interface IColumn {
	id: string;
	title: string;
	status: ChoreState;
}

export enum ChoreState {
	TO_DO = "To Do",
	IN_PROGRESS = "In Progress",
	DONE = "Done"
}
