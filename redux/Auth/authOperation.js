import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestAvatar, requestCurrentUser, requestSignin, requestSigninByGoogle, requestSignout, requestSignup, requestTheme, requestUserUpdate, setToken } from "../../services/api/auth";


export const registerThunk = createAsyncThunk(
    'auth/signup',
    async (values, thunkAPI) => {
        try {
            const authData = await requestSignup(values);
            if (authData.status === 201) {
                const { email, password } = values;
                const data =  await requestSignin({ email, password });
                return data;
                
            }
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

export const loginThunk = createAsyncThunk(
    'auth/signin',
    async (values, thunkAPI) => {
        try {
          const response = await requestSignin(values);
          return response;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

export const googleLoginThunk = createAsyncThunk(
    'auth/signinbygoogle',
    async (values, thunkAPI) => {
        try {
          const response = await requestSigninByGoogle(values);
          return response;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);


export const currentThunk = createAsyncThunk(
  'auth/current',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
      setToken(token);
      const authData = await requestCurrentUser();
      return authData;
    }
    catch
    (error) {
      return
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) return false;
      return true
    },
  }
);

export const logoutThunk = createAsyncThunk(
    'auth/signout',
    async (_, thunkAPI) => {
        try {
            const result = await requestSignout();
            return result;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }

);

export const changeAvatarThunk = createAsyncThunk(
    'auth/users/changeAvatar',
    async (values, thunkAPI) => {
        try {
            const data = await requestAvatar(values)
            return data.avatarURL;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

export const changeThemeThunk = createAsyncThunk(
    'auth/users/changeTheme',
    async (values, thunkAPI) => {
        try {
            const data = await requestTheme(values)
            return data.theme;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);
export const userUpdateThunk = createAsyncThunk(
    'auth/users/userUpdate',
    async (values, thunkAPI) => {
        try {
            const data = await requestUserUpdate(values);
            return data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);