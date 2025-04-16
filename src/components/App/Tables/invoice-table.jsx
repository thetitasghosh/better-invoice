import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCustomers } from "@/data/getDatas";
import TableActionButton from "@/components/App/Buttons/table-action-button";

export default async function InvoiceTable() {
  const customers = await getCustomers();
  // console.log("customers", customers);
  const invoices = [
    {
      id: "1",
      customer: "Your Maker",
      status: "draft",
      due_date: "April,30",
      invoice_date: "April,15",
      invoice_no: "INV_10001",
      amount: "7500",
      recurring: "one time",
    },
    {
      id: "2",
      customer: "Anubit Technologies",
      status: "paid",
      due_date: "April,21",
      invoice_date: "April,15",
      invoice_no: "INV_10002",
      amount: "1500",
      recurring: "monthly",
    },
    {
      id: "3",
      customer: "Exelth B2B",
      status: "overdue",
      due_date: "April,21",
      invoice_date: "April,15",
      invoice_no: "INV_10003",
      amount: "5000",
      recurring: "annually",
    },
    {
      id: "4",
      customer: "Egostix ",
      status: "send",
      due_date: "April,21",
      invoice_date: "April,15",
      invoice_no: "INV_10004",
      amount: "1500",
      recurring: "annually",
    },
  ];
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
                <TableCell className="py-2">{customer.invoice_date}</TableCell>
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
