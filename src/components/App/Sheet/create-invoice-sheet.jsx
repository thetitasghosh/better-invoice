"use client";
import React, { useRef } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { Button } from "@/components/ui/button";
import Icon from "../Global/Icon";
import DefaultInvoiceTemplate from "@/components/App/Invoices/default-invoice-form";
import CancelButton from "../Buttons/cancel-button";
import SubmitButton from "../Buttons/submit-invoice-button";
import { useTeamContext } from "@/Contexts/UserContext";
const CreateInvoiceSheet = ({ children }) => {
  const closeRef = useRef(null);
  const { loading, teamId, teamMemberId, userId } = useTeamContext();
  // console.log({
  //   teamId,
  //   teamMemberId,
  //   userId,
  // });

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="min-w-[40rem] p-1 pb-24 ">
        <SheetHeader>
          <SheetTitle hidden>Are you absolutely sure?</SheetTitle>
          <SheetDescription hidden>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
          <div className="w-full rded flex items-center justify-end">
            <Button size={"icon"} variant={"ghost"} className="[&_svg]:size-5">
              <Icon.GripVertical />
            </Button>
          </div>
        </SheetHeader>
        <div id="invoice-view" className="size-full redd ">
          <DefaultInvoiceTemplate closeRef={closeRef}>
            <SheetClose>
              <CancelButton />
            </SheetClose>
            <SheetClose hidden>
              <button ref={closeRef} type="button" />
            </SheetClose>
            <SubmitButton label={"Create"} />
          </DefaultInvoiceTemplate>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateInvoiceSheet;
