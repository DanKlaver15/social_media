import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Avatar from "./Avatar";
import { sendFriendRequest } from "../state/FriendRequest/thunks";

const getFriendStatus = (user, friend) => {
  const friends = user.friends.reduce((acc, friend) => {
    return [...acc, friend._id];
  }, []);

  if (friends.includes(friend._id)) return "Already Friends";

  const requests = user.friendRequests.reduce((acc, request) => {
    return [...acc, request.receiverId, request.senderId];
  }, []);

  if (requests.includes(friend._id)) {
    return "Pending";
  }

  return "Add Friend";
};

const PeopleListItem = ({
  user,
  person,
  friendRequests,
  sendFriendRequest,
  friends,
}) => {
  const friendStatus = getFriendStatus(
    { ...user, friendRequests, friends },
    person
  );
  return (
    <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-gray-900 text-sm font-medium truncate">{`${person.firstName} ${person.lastName}`}</h3>
          </div>
          <p className="mt-1 text-gray-500 text-sm truncate">{person.email}</p>
        </div>
        <Avatar size={10} source={person.avatar} />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="w-0 flex-1 flex">
            <Link
              to={`/person/${person._id}`}
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
            >
              View
            </Link>
          </div>
          <div className="-ml-px w-0 flex-1 flex">
            <button
              disabled={friendStatus !== "Add Friend"}
              onClick={() => {
                sendFriendRequest(person._id);
              }}
              className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
            >
              {friendStatus}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  friendRequests: state.friendRequests,
  friends: state.friends,
});

const mapDispatchToProps = (dispatch) => ({
  sendFriendRequest: (receiverId) => dispatch(sendFriendRequest(receiverId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PeopleListItem);
