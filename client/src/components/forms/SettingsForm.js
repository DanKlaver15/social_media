import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import {
  updateAvatarRequest,
  removeAvatarRequest,
  updateUserRequest,
  deleteUserRequest,
} from "../../state/User/thunks";
import Avatar from "../Avatar";
import Error from "../alerts/Error";

const SettingsForm = ({
  user,
  updateUser,
  updateAvatar,
  removeAvatar,
  avatarError,
  deleteUser,
  updatingUser,
  updateError,
}) => {
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [darkMode, setMode] = useState(user.darkMode ? user.darkMode : false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const toggleDarkMode = () => {
    setMode(!darkMode);
    updateUser({ ...user, darkMode: !darkMode });
  };

  const toggleClass = darkMode ? "bg-indigo-600" : "bg-gray-200";
  const toggleButtonClass = darkMode ? "translate-x-5" : "translate-x-0";
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateUser({
          ...user,
          username,
          bio,
          darkMode,
          firstName,
          lastName,
          email,
        });
      }}
      className="space-y-8 divide-y divide-gray-200 overscroll-auto dark:divide-gray-600 dark:bg-gray-800"
    >
      <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-600">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400">
              Profile
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-5 gap-y-6 gap-x-4 xs:grid-cols-6">
            <div className="col-span-1 xs:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Username
              </label>
              <div className="mt-1 flex rounded-md shadow-sm h-8">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block min-w-0 rounded-none rounded-md sm:text-sm border-gray-300 dark:bg-gray-500 dark:text-gray-300 pl-1"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                About
              </label>
              <div className="mt-1 w-2/3 h-full">
                <textarea
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                  id="about"
                  name="about"
                  rows="3"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full h-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-500 dark:text-gray-300 pl-1"
                ></textarea>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="sm:col-span-6 mt-12">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Avatar
              </label>
              <div className="my-1 flex items-center">
                <Avatar source={user.avatar} size={12} />
                <FileUpload
                  onFileSelect={(file) => {
                    updateAvatar(file);
                  }}
                />
                {user.avatar && (
                  <button
                    onClick={() => {
                      removeAvatar();
                    }}
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-500 dark:text-gray-300 dark:border-transparent"
                  >
                    Remove
                  </button>
                )}
              </div>
              {avatarError && avatarError.error && (
                <Error message={avatarError.message} />
              )}
            </div>
          </div>
        </div>
        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400">
              Appearance
            </h3>
          </div>
          <div className="sm:col-span-4 mt-6">
            <div className="flex items-center justify-between">
              <span className="flex-grow flex flex-col" id="availability-label">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-400">
                  Dark Mode
                </span>
                <span className="text-sm text-gray-500">
                  Turn dark mode on or off to change the appearance of the app.
                </span>
              </span>

              <button
                onClick={() => toggleDarkMode()}
                type="button"
                className={`bg-gray-300 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-400 ${toggleClass}`}
                aria-pressed="false"
                aria-labelledby="availability-label"
              >
                <span className="sr-only">Use setting</span>

                <span
                  aria-hidden="true"
                  className={`translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${toggleButtonClass}`}
                ></span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-5 gap-y-6 gap-x-7 xs:grid-cols-6">
            <div className="col-span-1 xs:col-span-2">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                First name
              </label>
              <div className="mt-1 flex h-8">
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  type="text"
                  name="first_name"
                  id="first_name"
                  autoComplete="given-name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-500 dark:text-gray-300 pl-1"
                />
              </div>
            </div>

            <div className="col-span-1 h-full xs:col-span-2">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Last name
              </label>
              <div className="mt-1 flex h-8">
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  type="text"
                  name="last_name"
                  id="last_name"
                  autoComplete="family-name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-500 dark:text-gray-300 pl-1"
                />
              </div>
            </div>

            <div className="col-span-2 h-full xs:col-span-2 row-start-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Email address
              </label>
              <div className="mt-1 w-2/3 flex h-8">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-500 dark:text-gray-300 pl-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            disabled={updatingUser}
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
        {updateError?.error && (
          <div className="px-4">
            <Error message={updateError.message} />
          </div>
        )}
      </div>
      <div className="pt-8 pb-12">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400">
            Delete Account
          </h3>
        </div>
        <div className="sm:col-span-4 mt-6">
          <div className="flex items-center justify-between">
            <span className="flex-grow flex flex-col" id="availability-label">
              <span className="text-sm text-gray-500">
                Would you like to delete your account?
              </span>
            </span>

            <Link
              to="/"
              onClick={() => deleteUser(user._id)}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-pressed="false"
              aria-labelledby="availability-label"
            >
              DELETE
              <span className="sr-only">Delete Account</span>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  avatarError: state.error.updateAvatar,
  updatingUser: state.updatingUser,
  updateError: state.error.updateUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => dispatch(updateUserRequest(user)),
  updateAvatar: (file) => dispatch(updateAvatarRequest(file)),
  removeAvatar: () => dispatch(removeAvatarRequest()),
  deleteUser: (userId) => dispatch(deleteUserRequest(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);
