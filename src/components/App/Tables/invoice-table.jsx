import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateInvoiceSheet from "../Sheet/create-invoice-sheet";
import { getInvoices } from "@/data/getDatas";
import TableActionButton from "@/components/App/Buttons/table-action-button";
import { Button } from "@/components/ui/button";

export default async function InvoiceTable() {
  const invoices = await getInvoices();
  if (invoices.length <= 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="size-80 flex-col flex items-center justify-center gap-2">
          <h1 className="font-semibold text-lg">No invoices</h1>
          <p className="text-sm">
            You haven&apos;t created any invoices yet. <br />
            Go ahead and create your first one.
          </p>
          <CreateInvoiceSheet>
            <Button variant={"outline"}>Create invoice</Button>
          </CreateInvoiceSheet>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 *:border-border [&>:not(:last-child)]:border-r">
              <TableHead className="h-9 py-2">Due date</TableHead>
              <TableHead className="h-9 py-2 text-center">Status</TableHead>
              <TableHead className="h-9 py-2">Customer</TableHead>
              <TableHead className="h-9 py-2">Amount</TableHead>
              <TableHead className="h-9 py-2">Invoice date</TableHead>
              <TableHead className="h-9 py-2">Invoice no</TableHead>
              <TableHead className="h-9 py-2">Recurring</TableHead>
              <TableHead className="h-9 py-2 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((customer) => (
              <TableRow
                key={customer.id}
                className="*:border-border [&>:not(:last-child)]:border-r"
              >
                <TableCell className="py-2 font-medium">
                  {customer.due_date}
                </TableCell>
                <TableCell className="py-2 text-center">
                  <Badge variant={customer.status} className="capitalize">
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-2">{customer.customer}</TableCell>
                <TableCell className="py-2">{customer.amount}</TableCell>
                <TableCell className="py-2">{customer.issue_date}</TableCell>
                <TableCell className="py-2">{customer.invoice_no}</TableCell>
                <TableCell className="py-2 capitalize">
                  {customer.recurring}
                </TableCell>
                <TableCell className="py-2 text-center">
                  <TableActionButton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
