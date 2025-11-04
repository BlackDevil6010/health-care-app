
import React from 'react';

const WalkingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
    <path d="M15.5 8.5l-3 3-1.5-1.5" />
    <path d="M12 22V10" />
    <path d="m16 10-4-4-4 4" />
    <circle cx="12" cy="4" r="2" />
  </svg>
);

export default WalkingIcon;
