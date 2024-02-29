import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	requestAddCard,
	requestAddColumn,
	requestAddDashboard,
	requestAllDashboards,
	requestDashboardById,
	requestDeleteCard,
	requestUpdateCardStatus,
	requestDeleteColumn,
	requestDeleteDashboard,
	requestEditDashboard,
	requestUpdateCard,
	requestUpdateColumn,
	requestUserNeedHelp,
} from "../../services/api/dashboard";

export const allDashboardsThunk = createAsyncThunk(
	"dashboard/allDashboards",
	async (_, thunkAPI) => {
		try {
			const dashboards = await requestAllDashboards();
			return dashboards;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const addDashboardThunk = createAsyncThunk(
	"dashboard/addDashboard",
	async (values, thunkAPI) => {
		try {
			const data = await requestAddDashboard(values);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const getDashboardByIDThunk = createAsyncThunk(
	"dashboard/getById",
	async (dashboardId, thunkAPI) => {
		try {
			const data = await requestDashboardById(dashboardId);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const updateDashboardThunk = createAsyncThunk(
	"dashboard/updateDashboard",
	async ({ dashboardId, title, icon, backgroundURL }, thunkAPI) => {
		try {
			const data = await requestEditDashboard(
				dashboardId,
				title,
				icon,
				backgroundURL
			);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const deleteDashboardThunk = createAsyncThunk(
	"dashboard/deleteDashboard",
	async (dashboardId, thunkAPI) => {
		try {
			const data = await requestDeleteDashboard(dashboardId);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const addColumnThunk = createAsyncThunk(
	"dashboard/addColumn",
	async ({ dashboardId, title, owner }, thunkAPI) => {
		try {
			const data = await requestAddColumn(dashboardId, title, owner);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const deleteColumnThunk = createAsyncThunk(
	"dashboard/deleteColumn",
	async (columnId, thunkAPI) => {
		try {
			const data = await requestDeleteColumn(columnId);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const updateColumnThunk = createAsyncThunk(
	"dashboard/updateColumn",
	async ({ columnId, title }, thunkAPI) => {
		try {
			const data = await requestUpdateColumn(columnId, title);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const addCardThunk = createAsyncThunk(
	"dashboard/addCard",
	async ({ columnId, title, description, color, deadline }, thunkAPI) => {
		try {
			const data = await requestAddCard(
				columnId,
				title,
				description,
				color,
				deadline
			);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const deleteCardThunk = createAsyncThunk(
	"dashboard/deleteCard",
	async (cardId, thunkAPI) => {
		try {
			const data = await requestDeleteCard(cardId);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const updateCardThunk = createAsyncThunk(
	"dashboard/updateCard",
	async ({ cardId, title, description, color, deadline }, thunkAPI) => {
		try {
			const data = await requestUpdateCard(
				cardId,
				title,
				description,
				color,
				deadline
			);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const updateCardStatus = createAsyncThunk(
	"dashboard/updateCardStatus",
	async ({ cardId, columnId, owner }, thunkAPI) => {
		try {
			const data = await requestUpdateCardStatus(cardId, columnId, owner);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const updateCardStatusLocalThunk = createAsyncThunk(
	"dashboard/updateCardStatusLocal",
	(data, thunkAPI) => {
		try {
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const sendNeedHelpThunk = createAsyncThunk(
	"dashboard/help",
	async (info, thunkAPI) => {
		try {
			const data = await requestUserNeedHelp(info);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);