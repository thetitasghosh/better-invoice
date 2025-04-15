import React from "react";
import AppHeader from "@/components/App/Global/app-header";
import CreateCustomer from "@/components/App/Buttons/create-customer";
import CustomerTable from "@/components/App/Tables/customer-table";
const page = () => {
  return (
    <div className="size-full flex  flex-col items-center justify-center gap-2">
      <div id="actions" className="w-full">
        <AppHeader>
          <CreateCustomer label={"Create customer"} />
        </AppHeader>
      </div>
      <div id="table" className="size-full p-2">
        <CustomerTable />
      </div>
    </div>
  );
};

export default page;
