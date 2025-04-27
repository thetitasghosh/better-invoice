import React from "react";
import { getEmailInitial } from "@/lib/utils";
const UserButton = ({ name }) => {
  return (
    <div className="redd size-9 flex items-center justify-center rounded-md font-semibold bg-neutral-200">
      {name && getEmailInitial(name)}
    </div>
  );
};

export default UserButton;
