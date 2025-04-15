import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "@/components/ui/button";
const TableActionButtonPopover = ({ children }) => {
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
        <Button className="w-full" variant={"destructive"} size={"sm"}>
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default TableActionButtonPopover;
