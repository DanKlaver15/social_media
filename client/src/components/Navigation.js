import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  let loginFormat = "";
  let registerFormat = "";

  if (pathname === "/") {
    loginFormat = "border-indigo-500 text-gray-900";
  } else {
    loginFormat =
      "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";
  }
  if (pathname === "/register") {
    registerFormat = "border-indigo-500 text-gray-900";
  } else {
    registerFormat =
      "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";
  }

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1>Zesty</h1>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {/* <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --> */}
            <Link
              to="/"
              className={`${loginFormat} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`${registerFormat} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Register
            </Link>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            {/* <!-- Mobile menu button --> */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* <!--
								Icon when menu is closed.
		
								Heroicon name: outline/menu
		
								Menu open: "hidden", Menu closed: "block"
							--> */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* <!--
								Icon when menu is open.
		
								Heroicon name: outline/x
		
								Menu open: "block", Menu closed: "hidden"
							--> */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {/* <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" --> */}
          <Link
            to="/"
            className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
