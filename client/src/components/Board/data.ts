import { ChoreState } from "../../types/board";

export const data = [
	{ id: "chore-1", content: "Take out the garbage", status: ChoreState.TO_DO },
	{
		id: "chore-2",
		content: "Watch my favorite show",
		status: ChoreState.TO_DO
	},
	{ id: "chore-3", content: "Charge my phone", status: ChoreState.TO_DO },
	{ id: "chore-4", content: "Cook dinner", status: ChoreState.TO_DO }
];

export const columns = [
	{
		id: "column-1",
		title: "To do",
		status: ChoreState.TO_DO
	},
	{
		id: "column-2",
		title: "In progress",
		status: ChoreState.IN_PROGRESS
	},
	{
		id: "column-3",
		title: "Done",
		status: ChoreState.DONE
	}
];

export const columnOrder = ["column-1", "column-2", "column-3"];
