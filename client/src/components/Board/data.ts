import { ChoreState } from "../../types/board";

export const data = [
	{ id: "chore-1", content: "Take out the garbage", state: ChoreState.TO_DO },
	{
		id: "chore-2",
		content: "Wash dishes",
		state: ChoreState.IN_PROGRESS
	},
	{ id: "chore-3", content: "Sweep floors", state: ChoreState.TO_DO },
	{ id: "chore-4", content: "Cook dinner", state: ChoreState.DONE }
];

export const columns = [
	{
		id: "column-1",
		title: "To do",
		state: ChoreState.TO_DO
	},
	{
		id: "column-2",
		title: "In progress",
		state: ChoreState.IN_PROGRESS
	},
	{
		id: "column-3",
		title: "Done",
		state: ChoreState.DONE
	}
];

export const columnOrder = ["column-1", "column-2", "column-3"];
