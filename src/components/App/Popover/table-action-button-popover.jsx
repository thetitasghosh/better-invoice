import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "@/components/ui/button";
import AlertDeleteDialog from "@/components/App/Dialogs/delete-alert-dialog";
import ViewInvoiceSheet from "@/components/App/Sheet/view-invoice-sheet";
import CreateCustomerSheet from "@/components/App/Sheet/create-customer-sheet";
const TableActionButtonPopover = ({ children, table, id }) => {
  return (
    <Popover>
      <PopoverTrigger >{children}</PopoverTrigger>
      <PopoverContent
        side="left"
        className="w-full flex flex-col items-center justify-center gap-2 p-2"
      >
        <Button className="w-full" variant={"outline"} size={"sm"}>
          {table === "invoices" ? (
            <ViewInvoiceSheet id={id}> Edit</ViewInvoiceSheet>
          ) : (
            <CreateCustomerSheet customer_id={id} update={true} view={false}>
              Edit
            </CreateCustomerSheet>
          )}
        </Button>
        <Button className="w-full" variant={"outline"} size={"sm"}>
          {table === "invoices" ? (
            <ViewInvoiceSheet id={id}>View</ViewInvoiceSheet>
          ) : (
            <CreateCustomerSheet customer_id={id} view={true} update={false}>
              View
            </CreateCustomerSheet>
          )}
        </Button>
        <AlertDeleteDialog table={table} id={id}>
          <Button
            className="w-full"
            variant={"destructive"}
            size={"sm"}
            type="button"
            // formAction={await DeleteData(table, id)}
          >
            Delete
          </Button>
        </AlertDeleteDialog>
      </PopoverContent>
    </Popover>
  );
};

export default TableActionButtonPopover;
