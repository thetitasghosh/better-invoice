import React from "react";
import { Button } from "../../ui/button";
import Icon from "../../App/Global/Icon";
import TableActionButtonPopover from "@/components/App/Popover/table-action-button-popover";
const TableActionButton = ({ table, id }) => {
  return (
    <TableActionButtonPopover table={table} id={id}>
      <Button variant={"link"} size={"icon"} type="button">
        <Icon.Ellipsis />
      </Button>
    </TableActionButtonPopover>
  );
};

export default TableActionButton;
