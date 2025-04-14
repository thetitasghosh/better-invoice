import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "../../ui/sheet";
import CreateCustomerForm from "@/components/App/Forms/create-customer-form";
import CancelButton from "@/components/App/Buttons/cancel-button";
import CreateButton from "@/components/App/Buttons/create-submit";
const CreateCustomerSheet = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="min-w-[30rem]  pb-10 ">
        <SheetHeader>
          <SheetTitle className="capitalize">create customer</SheetTitle>
        </SheetHeader>
        <div id="customer-view" className="size-full redd ">
          <CreateCustomerForm>
            <SheetClose>
              <CancelButton />
            </SheetClose>
            <CreateButton />
          </CreateCustomerForm>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCustomerSheet;
