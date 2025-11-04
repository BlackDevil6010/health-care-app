import React from 'react';

const HealthcareIllustration: React.FC = () => (
  <div className="absolute inset-0 w-full h-full z-0 overflow-hidden" aria-hidden="true">
    <svg
      className="absolute w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 800"
    >
      {/* Background color */}
      <rect width="1200" height="800" fill="#5cacee" />

      {/* Main text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="140"
        fontWeight="bold"
        letterSpacing="10"
        opacity="0.9"
      >
        HEALTHCARE
      </text>

      {/* Icons and shapes */}
      <g stroke="black" strokeWidth="6" fill="none" opacity="0.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Star of Life */}
        <path transform="translate(200, 200) scale(0.8)" d="M50 0 L61.2 25 L85.4 25 L67.1 40.5 L74.3 65.5 L50 50 L25.7 65.5 L32.9 40.5 L14.6 25 L38.8 25 Z" fill="#fff" stroke="none" />
        <path transform="translate(200, 200) scale(0.8)" d="M50 15 L50 85 M15 50 L85 50 M25 25 L75 75 M25 75 L75 25" strokeWidth="8"/>
        
        {/* Heartbeat line */}
        <path d="M750 350 h 50 l 20 -40 l 40 80 l 60 -120 l 40 80 h 50" strokeWidth="8" />

        {/* Microscope */}
        <path transform="translate(900, 550) scale(0.7)" d="M10 100 V 20 H 30 V 10 L 70 10 L 70 30 L 90 50 V 90 H 70" />
        <circle transform="translate(900, 550) scale(0.7)" cx="45" cy="100" r="30" strokeWidth="8" />
        <line transform="translate(900, 550) scale(0.7)" x1="100" y1="60" x2="130" y2="60" />

        {/* Medical Kit */}
        <rect x="950" y="250" width="120" height="80" rx="10" fill="#fff" stroke="none" />
        <rect x="950" y="250" width="120" height="80" rx="10" />
        <path d="M990 250 V 230 a 20 20 0 0 1 40 0 v 20" />
        <line x1="1010" y1="270" x2="1010" y2="310" />
        <line x1="990" y1="290" x2="1030" y2="290" />
        
        {/* Plus icon in speech bubble */}
        <g transform="translate(150, 500)">
            <path d="M0 20 a 20 20 0 0 1 20 -20 h 60 a 20 20 0 0 1 20 20 v 40 a 20 20 0 0 1 -20 20 h -30 l -15 15 v -15 h-15 a 20 20 0 0 1 -20 -20 z" fill="#4dabf7" stroke="none" />
            <line x1="50" y1="20" x2="50" y2="60" stroke="#fff" strokeWidth="8" />
            <line x1="30" y1="40" x2="70" y2="40" stroke="#fff" strokeWidth="8" />
        </g>
        
        {/* Dotted lines */}
        <path d="M300, 250 Q 450,200 600,300" strokeDasharray="5, 15" />
        <path d="M850, 450 Q 700,550 550,550" strokeDasharray="5, 15" />
      </g>
    </svg>
  </div>
);

export default HealthcareIllustration;
