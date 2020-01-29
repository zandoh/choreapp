import { ChoreState } from "../../types/board";

export const data = [
	{
		id: "chore-1",
		content: "Take out the garbage",
		state: ChoreState.TO_DO,
		index: 0
	},
	{
		id: "chore-2",
		content: "Wash dishes",
		state: ChoreState.IN_PROGRESS,
		index: 0
	},
	{ id: "chore-3", content: "Sweep floors", state: ChoreState.TO_DO, index: 1 },
	{ id: "chore-4", content: "Cook dinner", state: ChoreState.DONE, index: 0 }
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
