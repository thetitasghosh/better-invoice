import React from "react";
import { Button } from "../../ui/button";
import Icon from "../Global/Icon";
import CreateInvoiceSheet from "@/components/App/Sheet/create-invoice-sheet";
const CreateInvoice = ({ label }) => {
  return (
    <CreateInvoiceSheet>
      <Button size={label ? "default" : "icon"}>
        <Icon.Plus /> {label}
      </Button>
    </CreateInvoiceSheet>
  );
};

export default CreateInvoice;
