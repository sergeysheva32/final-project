import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
	addCardThunk,
	addColumnThunk,
	addDashboardThunk,
	allDashboardsThunk,
	deleteCardThunk,
	deleteColumnThunk,
	deleteDashboardThunk,
	getDashboardByIDThunk,
	updateCardThunk,
	updateColumnThunk,
	sendNeedHelpThunk,
	updateDashboardThunk,
	updateCardStatus,
	updateCardStatusLocalThunk,
} from "./dashboardOperation";

const INITIAL_STATE = {
	dashboards: [],
	currentDashboard: {},
	isLoading: false,
	error: null,
};

const dashboardSlice = createSlice({
	name: "dashboards",
	initialState: INITIAL_STATE,
	extraReducers: builder =>
		builder
			.addCase(allDashboardsThunk.fulfilled, (state, action) => {
				state.error = null;
				state.dashboards = action.payload;
				state.isLoading = false;
			})
			.addCase(addDashboardThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.dashboards = [...state.dashboards, action.payload];
			})
			.addCase(getDashboardByIDThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.currentDashboard = action.payload;
			})
			.addCase(updateDashboardThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				const { _id, title, icon, backgroundURL } = action.payload;
				const dashboardIdx = state.dashboards.findIndex(
					item => item._id === _id,
				);
				state.dashboards[dashboardIdx] = {
					...state.dashboards[dashboardIdx],
					title,
					icon,
					backgroundURL,
				};
			})
			.addCase(deleteDashboardThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.dashboards = state.dashboards.filter(
					item => item._id !== action.payload._id,
				);
				// if (!state.dashboards.length) {
				// 	state.currentDashboard = {}
				// 	console.log(state.currentDashboard)
				// } else {
				// 	state.currentDashboard = { ...state.dashboards[0] }
				// 	console.log(state.currentDashboard)
				// }
			})
			.addCase(sendNeedHelpThunk.fulfilled, state => {
				state.isLoading = false;
				state.error = null;
			})
			.addCase(addColumnThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.currentDashboard.column = [
					...state.currentDashboard.column,
					action.payload,
				];
			})
			.addCase(deleteColumnThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.currentDashboard.column = state.currentDashboard.column.filter(
					item => item._id !== action.payload._id,
				);
			})
			.addCase(updateColumnThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				const { _id, title } = action.payload;
				const columnIdx = state.currentDashboard.column.findIndex(
					item => item._id === _id,
				);
				state.currentDashboard.column[columnIdx].title = title;
			})
			.addCase(addCardThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				const idx = state.currentDashboard.column.findIndex(
					item => item._id === action.payload.owner,
				);
				if (!state.currentDashboard.column[idx].card) {
					state.currentDashboard.column[idx].card = [];
				}

				state.currentDashboard.column[idx].card = [
					...state.currentDashboard.column[idx].card,
					action.payload,
				];
			})
			.addCase(deleteCardThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				const { owner, _id } = action.payload;
				const columnIdx = state.currentDashboard.column.findIndex(
					item => item._id === owner,
				);
				if (columnIdx !== -1) {
					state.currentDashboard.column[columnIdx].card =
						state.currentDashboard.column[columnIdx].card.filter(
							item => item._id !== _id,
						);
				}
			})
			.addCase(updateCardThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				const { _id, title, description, color, deadline, owner } =
					action.payload;
				const idxCol = state.currentDashboard.column.findIndex(
					item => item._id === owner,
				);
				const idxCard = state.currentDashboard.column[idxCol].card.findIndex(
					item => item._id === _id,
				);
				state.currentDashboard.column[idxCol].card[idxCard] = {
					...state.currentDashboard.column[idxCol].card[idxCard],
					title,
					description,
					color,
					deadline,
				};
			})
			.addCase(updateCardStatus.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				const { oldOwner } = action.payload;

				const currentColumnIdx = state.currentDashboard.column.findIndex(
					item => item._id === oldOwner,
				);

				state.currentDashboard.column[currentColumnIdx].card =
					state.currentDashboard.column[currentColumnIdx].card.filter(
						({ _id: obj }) => obj !== action.payload.result._id,
					);

				const newColumnIdx = state.currentDashboard.column.findIndex(
					item => item._id === action.payload.result.owner,
				);

				if (!state.currentDashboard.column[newColumnIdx].card) {
					state.currentDashboard.column[newColumnIdx].card = [];
				}

				const isCardInNewColumn = state.currentDashboard.column[
					newColumnIdx
				].card.some(({ _id }) => _id === action.payload.result._id);

				if (!isCardInNewColumn) {
					state.currentDashboard.column[newColumnIdx].card = [
						...state.currentDashboard.column[newColumnIdx].card,
						action.payload.result,
					];
				}
			})

			.addCase(updateCardStatusLocalThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;

				const { card, newCardIdx, currentColumnId, newColumnId } =
					action.payload;

				const currentColumnIdx = state.currentDashboard.column.findIndex(
					item => item._id === currentColumnId,
				);

				state.currentDashboard.column[currentColumnIdx].card =
					state.currentDashboard.column[currentColumnIdx].card.filter(
						({ _id: obj }) => obj !== card._id,
					);

				const newColumnIdx = state.currentDashboard.column.findIndex(
					item => item._id === newColumnId,
				);

				if (!state.currentDashboard.column[newColumnIdx].card) {
					state.currentDashboard.column[newColumnIdx].card = [];
				}

				if (typeof newCardIdx === "number") {
					state.currentDashboard.column[newColumnIdx].card.splice(
						newCardIdx,
						0,
						card,
					);
				} else {
					state.currentDashboard.column[newColumnIdx].card = [
						...state.currentDashboard.column[newColumnIdx].card,
						card,
					];
				}
			})

			.addMatcher(
				isAnyOf(
					allDashboardsThunk.pending,
					addDashboardThunk.pending,
					getDashboardByIDThunk.pending,
					updateDashboardThunk.pending,
					deleteDashboardThunk.pending,
					addColumnThunk.pending,
					deleteColumnThunk.pending,
					updateCardThunk.pending,
					addCardThunk.pending,
					deleteCardThunk.pending,
					sendNeedHelpThunk.pending,
				),
				state => {
					state.isLoading = true;
					state.error = null;
				},
			)
			.addMatcher(
				isAnyOf(
					allDashboardsThunk.rejected,
					addDashboardThunk.rejected,
					getDashboardByIDThunk.rejected,
					updateDashboardThunk.rejected,
					deleteDashboardThunk.rejected,
					addColumnThunk.rejected,
					deleteColumnThunk.rejected,
					updateDashboardThunk.rejected,
					addCardThunk.rejected,
					deleteCardThunk.rejected,
					updateCardThunk.rejected,
					sendNeedHelpThunk.rejected,
					updateCardStatus.rejected,
					updateCardStatusLocalThunk.rejected,
				),
				(state, action) => {
					state.isLoading = false;
					state.error = action.payload;
				},
			),
});

export const dashboardsReducer = dashboardSlice.reducer;