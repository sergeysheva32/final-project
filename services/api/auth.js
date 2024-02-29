import axios from "axios";

const instance = axios.create({
baseURL: "", //enter baseURL RENDER
  });

export const setToken = token => {
	return (instance.defaults.headers.common.Authorization = `Bearer ${token}`);
};

export const requestSignup = async values => {
	const res = await instance.post("auth/signup", values);
	return res;
};

export const requestSignin = async values => {
	const { data } = await instance.post("auth/signin", values);
	setToken(data.accessToken);
	return data;
};

export const requestSigninByGoogle = async values => {
	const { data } = await instance.post("auth/signin-by-google", values);
	setToken(data.accessToken);
	return data;
};

export const requestCurrentUser = async () => {
	const { data } = await instance.get("auth/current");
	return data;
};

export const requestSignout = async () => {
	const { data } = await instance.post("auth/signout");
	setToken();
	return data;
};

export const requestAvatar = async values => {
	const { data } = await instance.patch("auth/users/avatars", values, {
		headers: {
			"Content-Type": "multipart/from-data",
		},
	});
	return data;
};

export const requestTheme = async values => {
	const { data } = await instance.patch("auth/users/theme", values);
	return data;
};

export const requestUserUpdate = async values => {
	const { data } = await instance.put("auth/users/update", values);
	return data;
};

export default instance;