import React from "react";
import { Button } from "../../ui/button";
import Icon from "../Global/Icon";
import CreateCustomerSheet from "@/components/App/Sheet/create-customer-sheet";
const CreateCustomer = ({ label }) => {
  return (
    <CreateCustomerSheet>
      <Button size={label ? "default" : "icon"}>
        <Icon.Plus /> {label}
      </Button>
    </CreateCustomerSheet>
  );
};

export default CreateCustomer;
