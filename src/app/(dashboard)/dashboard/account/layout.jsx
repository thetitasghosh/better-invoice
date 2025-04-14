import React from "react";
import { AccountNav } from "@/data/navigation";
import CustomTab from "../../../../components/App/Tabs/custom-tabs";
const layout = ({ children }) => {
  return (
    <div>
      <CustomTab Navigation={AccountNav} />
      {children}
    </div>
  );
};

export default layout;
