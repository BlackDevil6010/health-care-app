import React from 'react';

const HealthcareIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
    <text x="100" y="20" textAnchor="middle" fontFamily="'Times New Roman', Times, serif" fontSize="24" fontWeight="bold" fill="white" className="animate-subtle-pulse" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.4)' }}>
      ETHICAL ELITES
    </text>
    <g fill="white" fillOpacity="0.9" transform="translate(0, 20)">
      {/* Stethoscope */}
      <path d="M80 120 Q 70 140, 50 140 T 30 120" stroke="white" strokeWidth="4" fill="none" />
      <path d="M120 120 Q 130 140, 150 140 T 170 120" stroke="white" strokeWidth="4" fill="none" />
      <path d="M80 120 V 60 Q 80 40, 100 40 Q 120 40, 120 60 V 120" stroke="white" strokeWidth="4" fill="none" />
      <circle cx="100" cy="140" r="15" stroke="white" strokeWidth="4" fill="#2dd4bf" />
      <circle cx="30" cy="120" r="8" />
      <circle cx="170" cy="120" r="8" />

      {/* Heart */}
      <path d="M100 80 C 90 70, 70 70, 70 85 C 70 100, 100 120, 100 120 C 100 120, 130 100, 130 85 C 130 70, 110 70, 100 80 Z" fill="#ef4444" />

      {/* Plus icon */}
      <rect x="25" y="35" width="20" height="4" rx="2" />
      <rect x="33" y="27" width="4" height="20" rx="2" />

      {/* Pills */}
      <ellipse cx="165" cy="45" rx="10" ry="5" transform="rotate(-30 165 45)" fill="#34d399" />
      <ellipse cx="175" cy="60" rx="8" ry="4" transform="rotate(-30 175 60)" fill="#fbbf24" />

      {/* Heartbeat line */}
      <path d="M140 100 h 10 l 5 -10 l 10 20 l 10 -20 l 5 10 h 10" stroke="#14b8a6" strokeWidth="2.5" fill="none" />
    </g>
  </svg>
);

export default HealthcareIllustration;