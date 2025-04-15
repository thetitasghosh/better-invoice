import React from "react";
import { Button } from "../../ui/button";
import Icon from "../../App/Global/Icon";
import TableActionButtonPopover from "@/components/App/Popover/table-action-button-popover";
const TableActionButton = () => {
  return (
    <TableActionButtonPopover>
      <Button variant={"link"} size={"icon"}>
        <Icon.Ellipsis />
      </Button>
    </TableActionButtonPopover>
  );
};

export default TableActionButton;
