import React from "react";
import UserButton from "@/components//App/Buttons/user-button";
const header = ({ children }) => {
  return (
    <div className="w-full  bg-white h-10 z-50 flex items-center justify-between redd pr-1">
      <div>{children}</div>
      <div className="h-full flex items-center justify-center  redd">
        <UserButton />
      </div>
    </div>
  );
};

export default header;
