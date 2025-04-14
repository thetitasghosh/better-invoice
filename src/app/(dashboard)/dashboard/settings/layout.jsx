import React from "react";
import { SettingNav } from "@/data/navigation";
import CustomTab from "../../../../components/App/Tabs/custom-tabs";
const layout = ({ children }) => {
  return (
    <div>
      <CustomTab Navigation={SettingNav} />
      {children}
    </div>
  );
};

export default layout;
