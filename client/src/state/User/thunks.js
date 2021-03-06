import axios from "axios";
import { authHeader, userId, getError } from "../../helpers/authHeader";

import {
  loginInProgress,
  loginFailure,
  loginSuccess,
  updateUser,
  deleteUser,
  logout,
  removeLoginError,
  registerSucceess,
  updateAvatarProgress,
  updateAvatarFailure,
  updateAvatarSuccess,
  updatePerson,
  updateUserFailure,
  updateUserInProgress,
  updateUserSuccess,
} from "./actions";

export const loginRequest = (user) => async (dispatch, getState) => {
  dispatch(loginInProgress());

  try {
    const response = await axios.post(`http://localhost:5000/auth/login`, user);

    const data = await response.data;

    dispatch(removeLoginError());
    dispatch(loginSuccess());
    dispatch(updateUser(data.user));
    saveUser({ _id: data.user._id, token: data.token });
  } catch (err) {
    dispatch(loginFailure(getError(err)));
  }
};

export const logoutRequest = (userId) => async (dispatch, getState) => {
  try {
    await axios.post(`http://localhost:5000/auth/logout`, { userId });

    dispatch(updateUser({}));
    removeFromLocalStorage();
    dispatch(logout());
    dispatch(removeLoginError());
  } catch (err) {
    console.log(err);
  }
};

export const authorizeRequest = (_id, token) => async (dispatch, getState) => {
  dispatch(loginInProgress());

  try {
    const response = await axios.post(
      `http://localhost:5000/auth`,
      { _id },
      { headers: authHeader() }
    );

    const data = await response.data;

    dispatch(loginSuccess());
    dispatch(updateUser(data.user));
  } catch (err) {
    dispatch(loginFailure(getError(err)));
    console.error(err);
  }
};

export const updateAvatarRequest = (file) => async (dispatch, getState) => {
  dispatch(updateAvatarProgress());
  let formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await axios.post(
      `http://localhost:5000/api/users/${userId()}/avatar`,
      formData,
      {
        headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
      }
    );

    const updatedUser = await response.data;
    dispatch(updateAvatarSuccess());
    dispatch(updateUser(updatedUser));
  } catch (err) {
    dispatch(updateAvatarFailure(getError(err)));
    console.log(err);
  }
};

export const removeAvatarRequest = () => async (dispatch, getState) => {
  dispatch(updateAvatarProgress());

  try {
    const response = await axios.delete(
      `http://localhost:5000/api/users/${userId()}/avatar`,
      {
        headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
      }
    );

    const updatedUser = await response.data;
    dispatch(updateAvatarSuccess());
    dispatch(updateUser(updatedUser));
  } catch (err) {
    dispatch(updateAvatarFailure());
    console.log(err);
  }
};

export const updateUserRequest = (user) => async (dispatch, getState) => {
  dispatch(updateUserInProgress());
  try {
    const response = await axios.put(
      `http://localhost:5000/api/users/${user._id}`,
      user,
      { headers: authHeader() }
    );

    const updatedUser = await response.data;

    dispatch(updateUser(updatedUser));
    dispatch(updateUserSuccess());
  } catch (err) {
    console.log(err);
    dispatch(updateUserFailure(getError(err)));
  }
};

export const registerRequest = (user) => async (dispatch, getState) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/users`, user);

    const data = await response.data;

    dispatch(registerSucceess());
    dispatch(loginSuccess());
    dispatch(updateUser(data.user));
    saveUser({ _id: data.user._id, token: data.token });
  } catch (err) {
    console.log(err);
    dispatch(loginFailure(getError(err)));
  }
};

export const getPersonRequest = (personId, userId) => async (
  dispatch,
  getState
) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/users/${userId}/person/${personId}`,
      { headers: authHeader() }
    );

    const user = await response.data;

    dispatch(updatePerson(user));
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserRequest = (userId) => async (dispatch, getState) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/users/${userId}`,
      { headers: authHeader() }
    );

    const deletedUser = await response.data;

    dispatch(logout());
  } catch (err) {
    console.log(err);
  }
};

export function removeFromLocalStorage() {
  localStorage.removeItem("zestyauth");
}

export function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("zestyauth"));
}

function saveUser(user) {
  return window.localStorage.setItem("zestyauth", JSON.stringify(user));
}
