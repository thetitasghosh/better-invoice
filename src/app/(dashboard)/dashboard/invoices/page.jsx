import React from "react";
import AppHeader from "@/components/App/Global/app-header";
import CreateInvoice from "@/components/App/Buttons/create-invoice";
const page = () => {
  return (
    <div className="size-full flex  flex-col items-center justify-center gap-2">
      <div id="widgets"></div>
      <div id="actions" className="w-full">
        <AppHeader>
          <CreateInvoice label={"Create invoice"} />
        </AppHeader>
      </div>
      <div id="table" className="size-full"></div>
    </div>
  );
};

export default page;
