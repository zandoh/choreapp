export interface IChore {
	id: string;
	content: string;
	state: ChoreState;
	index: number;
}

export interface IColumn {
	id: string;
	title: string;
	state: ChoreState;
}

export enum ChoreState {
	TO_DO = "To Do",
	IN_PROGRESS = "In Progress",
	DONE = "Done"
}
