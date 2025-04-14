import React from "react";

const AppHeader = ({ children }) => {
  return (
    <div className="w-full h-12 flex items-center justify-end">{children}</div>
  );
};

export default AppHeader;
