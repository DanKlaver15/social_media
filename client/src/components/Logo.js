import React from "react";

const Logo = ({ size = 8 }) => (
  <svg
    className={`h-auto w-${size}`}
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 140.6 143.1"
  >
    <path
      fill="#EF3E2D"
      d="M89.9,47.8C68,54.1,48.9,41.7,41.2,22l1.9-0.5c6,8.5,19.9-5.7,39.1-11.2c19.4-5.6,32.8,0.7,33.4-9.7l1.9-0.5
	C121.4,20.8,111.9,41.5,89.9,47.8z"
    />
    <path
      fill="#D0DD28"
      d="M53.6,92C24.8,86.3,10.3,60.8,13,33.6l2.5,0.5c1.9,13.3,19.3,14.8,44.6,19.8c25.5,5,44.1,10.6,50.9-0.9l2.5,0.5
	C105.7,79.7,82.6,97.7,53.6,92z"
    />
    <path
      fill="#92C83E"
      d="M70.1,143.1c-40.3,0-66.7-30.4-70.1-67.8h3.5c6.1,17.4,31.3,24.3,66.7,24.3c35.7,0,60.9-7,66.9-24.3h3.5
	C137.1,112.7,110.7,143.1,70.1,143.1z"
    />
  </svg>
);

export default Logo;
