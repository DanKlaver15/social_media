import { UPDATE_AVATAR_FAILURE, UPDATE_AVATAR_SUCCESS } from "../User/actions";
import { GET_FEED_FAILURE, GET_FEED_SUCCESS } from "../Feed/actions";

export const error = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_AVATAR_FAILURE: {
      const { error } = payload;
      state.updateAvatar = { error: true, message: error };
      return state;
    }
    case UPDATE_AVATAR_SUCCESS: {
      state.updateAvatar = { error: false, message: "" };
      return state;
    }
    case GET_FEED_FAILURE: {
      const { error } = payload;
      state.getFeed = { error: true, message: error };
      return state;
    }
    case GET_FEED_SUCCESS: {
      state.getFeed = { error: false, message: "" };
      return state;
    }
    default:
      return state;
  }
};
