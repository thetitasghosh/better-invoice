"use client";
import React, { useRef } from "react";
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
import SubmitButton from "@/components/App/Buttons/submit-button";
const CreateCustomerSheet = ({ children, customer_id, view, update }) => {
  const closeRef = useRef(null);
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="min-w-[30rem]  pb-10 ">
        <SheetHeader>
          <SheetTitle className="capitalize">create customer</SheetTitle>
        </SheetHeader>
        <div id="customer-view" className="size-full redd ">
          <CreateCustomerForm
            closeRef={closeRef}
            customer_id={customer_id}
            update={update}
            view={view}
          >
            <SheetClose>
              <CancelButton />
            </SheetClose>
            <SheetClose hidden>
              <button ref={closeRef} type="button" />
            </SheetClose>
            {update === true ? (
              <SubmitButton
                label={update ? "Update" : "Create"}
                disabled={view}
              />
            ) : null}
          </CreateCustomerForm>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCustomerSheet;
