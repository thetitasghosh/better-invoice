"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "@/components/ui/button";
import AlertDeleteDialog from "@/components/App/Dialogs/delete-alert-dialog";
const TableActionButtonPopover = ({ children, table, id }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side="left"
        className="w-full flex flex-col items-center justify-center gap-2 p-2"
      >
        <Button className="w-full" variant={"outline"} size={"sm"}>
          Edit
        </Button>
        <Button className="w-full" variant={"outline"} size={"sm"}>
          View
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
