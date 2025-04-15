import React from "react";
import AppHeader from "@/components/App/Global/app-header";
import CreateInvoice from "@/components/App/Buttons/create-invoice";
import InvoiceTable from "@/components/App/Tables/invoice-table";
const page = () => {
  return (
    <div className="size-full flex  flex-col items-center justify-center gap-2">
      <div id="widgets"></div>
      <div id="actions" className="w-full">
        <AppHeader>
          <CreateInvoice label={"Create invoice"} />
        </AppHeader>
      </div>
      <div id="table" className="size-full p-2">
        <InvoiceTable />
      </div>
    </div>
  );
};

export default page;
