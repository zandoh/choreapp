export const isObjectEmpty = (obj: any) => {
	return Object.keys(obj).length === 0 && obj.constructor === Object;
};

// Attempts to get a particular slice of the
// store from localstorage
export const getFromLocalStorage = (key: string) => {
	try {
		const serializedState = localStorage.getItem(key);
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

// Attempts to save a particular slice of the
// store to localstorage
export const saveToLocalStorage = (key: string, value: any) => {
	try {
		const serializedState = JSON.stringify(value);
		localStorage.setItem(key, serializedState);
	} catch {}
};

export enum routes {
	ROOT = "/",
	LOGIN = "/login",
	FORGOT_PASSWORD = "/forgot-password",
	DASHBOARD = "/dashboard",
	REPORTS = "/reports"
}
