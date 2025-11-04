import React from 'react';

const LogoIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <img
      src="https://lovely-plum-ejdgfovwzu.edgeone.app"
      alt="Ethical Elites Logo"
      className={className}
    />
  );
};

export default LogoIcon;