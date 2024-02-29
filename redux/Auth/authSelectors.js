import { createSelector } from "@reduxjs/toolkit";

const selectAuth = (state) => state.auth;

export const selectAuthIsLoading = createSelector(
  selectAuth,
  (auth) => auth.isLoading
);
export const selectAuthError = createSelector(selectAuth, (auth) => auth.error);
export const selectAuthToken = createSelector(selectAuth, (auth) => auth.token);
export const selectAuthUserData = createSelector(
  selectAuth,
  (auth) => auth.user
);
export const selectAuthAuthenticated = createSelector(
  selectAuth,
  (auth) => auth.authenticated
);
export const selectAuthTheme = createSelector(selectAuth, (auth) => auth.theme);
export const selectAuthRegister = createSelector(selectAuth, (auth) => auth.register);