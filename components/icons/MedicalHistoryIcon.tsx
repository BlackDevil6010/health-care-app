import React from 'react';

const MedicalHistoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M16 2H8C4.69 2 2 4.69 2 8v13a1 1 0 0 0 1 1h13c3.31 0 6-2.69 6-6V8c0-3.31-2.69-6-6-6Z" />
    <path d="M12 12h.01" />
    <path d="M16 12h.01" />
    <path d="M8 12h.01" />
    <path d="M12 16h.01" />
    <path d="M16 16h.01" />
    <path d="M8 16h.01" />
  </svg>
);

export default MedicalHistoryIcon;
