import React from "react";
import UserButton from "@/components//App/Buttons/user-button";
import { UserButtonDropDown } from "@/components/App/Global/user-button-dropdown";
const header = ({ children }) => {
  return (
    <div className="w-full  bg-white h-10 z-50 flex items-center justify-between redd pr-1">
      <div>{children}</div>
      <div className="h-full flex items-center justify-center  redd">
        <UserButtonDropDown>
          <UserButton />
        </UserButtonDropDown>
      </div>
    </div>
  );
};

export default header;
