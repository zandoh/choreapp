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
		id: ChoreState.TO_DO,
		title: "To do"
	},
	{
		id: ChoreState.IN_PROGRESS,
		title: "In progress"
	},
	{
		state: ChoreState.DONE,
		title: "Done"
	}
];
