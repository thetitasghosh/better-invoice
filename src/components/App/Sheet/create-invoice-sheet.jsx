import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { Button } from "@/components/ui/button";
import Icon from "../Global/Icon";
import DefaultInvoiceDoc from "@/components/App/Invoices/default-invoice";
const CreateInvoiceSheet = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="min-w-[35rem] p-1 pb-10 ">
        <SheetHeader>
          {/* <SheetTitle hidden>Are you absolutely sure?</SheetTitle>
          <SheetDescription hidden>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription> */}
          <div className="w-full rded flex items-center justify-end">
            <Button size={"icon"} variant={"ghost"} className="[&_svg]:size-5">
              <Icon.GripVertical />
            </Button>
          </div>
        </SheetHeader>
        <div id="invoice-view" className="size-full redd ">
          <DefaultInvoiceDoc />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateInvoiceSheet;
