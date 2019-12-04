const data = {
	chores: [
		{ id: "chore-1", content: "Take out the garbage" },
		{ id: "chore-2", content: "Watch my favorite show" },
		{ id: "chore-3", content: "Charge my phone" },
		{ id: "chore-4", content: "Cook dinner" }
	],
	columns: {
		"column-1": {
			id: "column-1",
			title: "To do",
			choreIds: ["chore-1", "chore-2", "chore-3", "chore-4"]
		},
		"column-2": {
			id: "column-2",
			title: "In progress",
			choreIds: []
		},
		"column-3": {
			id: "column-3",
			title: "Done",
			choreIds: []
		}
	},
	// Facilitate reordering of the columns
	columnOrder: ["column-1", "column-2", "column-3"]
};

export default data;
