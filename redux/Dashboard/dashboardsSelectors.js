export const selectAllDashboards = (state) => state.dashboards.dashboards;

export const selectCurrentDashboard = (state) =>
	state.dashboards.currentDashboard;

export const selectUpdateDashboardDate = (state) =>
	state.dashboards.dataUpdatedDashboard;

export const selectBackgroundUrl = (state) => state.dashboards.currentDashboard.result ? state.dashboards.currentDashboard.result.backgroundURL : null;