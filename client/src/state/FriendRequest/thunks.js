import axios from "axios";
import { authHeader, userId, getError } from "../../helpers/authHeader";

import {
  sendFriendRequestInProgress,
  sendFriendRequestSuccess,
  sendFriendRequestFailure,
  updateAllFriendRequests,
  friendRequestsInProgress,
  friendRequestsSuccess,
  friendRequestsFailure,
  acceptFriendRequestInProgress,
  acceptFriendRequestSuccess,
  acceptFriendRequestFailure,
  declineFriendRequestInProgress,
  declineFriendRequestSuccess,
  declineFriendRequestFailure,
  updateFriendRequest,
  declineFriend,
} from "./actions";

import { addFriend } from "../Friend/actions";

export const sendFriendRequest = (receiverId) => async (dispatch, getState) => {
  dispatch(sendFriendRequestInProgress());

  try {
    const response = await axios.post(
      `http://localhost:5000/api/friends`,
      {
        senderId: userId(),
        receiverId: receiverId,
      },
      { headers: authHeader() }
    );

    const request = await response.data;

    dispatch(sendFriendRequestSuccess(request));
  } catch (err) {
    console.log(err);
    dispatch(sendFriendRequestFailure(getError(err)));
  }
};

export const getFriendRequests = () => async (dispatch, getState) => {
  dispatch(friendRequestsInProgress());

  try {
    const response = await axios.get(
      `http://localhost:5000/api/users/${userId()}/friendRequests`,
      { headers: authHeader() }
    );

    const requests = await response.data;

    dispatch(friendRequestsSuccess());
    dispatch(updateAllFriendRequests(requests));
  } catch (err) {
    console.log(err);
    dispatch(friendRequestsFailure(getError(err)));
  }
};

export const acceptFriendRequest = (friendRequest) => async (
  dispatch,
  getState
) => {
  dispatch(acceptFriendRequestInProgress());

  try {
    const response = await axios.put(
      `http://localhost:5000/api/friends/${friendRequest._id}`,
      friendRequest,
      {
        headers: authHeader(),
      }
    );

    const updatedRequest = response.data;

    dispatch(acceptFriendRequestSuccess());
    dispatch(updateFriendRequest(updatedRequest));
    dispatch(addFriend(updatedRequest.senderId));
  } catch (err) {
    dispatch(acceptFriendRequestFailure(getError(err)));
  }
};

export const declineFriendRequest = (requestId) => async (
  dispatch,
  getState
) => {
  dispatch(declineFriendRequestInProgress());

  try {
    const response = await axios.delete(
      `http://localhost:5000/api/friendRequest/${requestId}`,
      { headers: authHeader() }
    );

    const data = await response.data;

    dispatch(declineFriendRequestSuccess());
    dispatch(declineFriend(data._id));
  } catch (err) {
    dispatch(declineFriendRequestFailure(getError(err)));
  }
};
