import { Button } from "@/components/ui/button";
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

export default async function CustomerTable() {
  const customers = await getCustomers();
  // console.log("customers", customers);

  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 *:border-border [&>:not(:last-child)]:border-r">
              <TableHead className="h-9 py-2">Name</TableHead>
              <TableHead className="h-9 py-2">Contact person</TableHead>
              <TableHead className="h-9 py-2">Email</TableHead>
              <TableHead className="h-9 py-2">Phone</TableHead>
              <TableHead className="h-9 py-2">Website</TableHead>
              <TableHead className="h-9 py-2">Address</TableHead>
              <TableHead className="h-9 py-2">TAX ID</TableHead>
              <TableHead className="h-9 py-2 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow
                key={customer.id}
                className="*:border-border [&>:not(:last-child)]:border-r"
              >
                <TableCell className="py-2 font-medium">
                  {customer.name}
                </TableCell>
                <TableCell className="py-2">
                  {customer.contact_person}
                </TableCell>
                <TableCell className="py-2">{customer.email}</TableCell>
                <TableCell className="py-2">{customer.phone}</TableCell>
                <TableCell className="py-2">{customer.website}</TableCell>
                <TableCell className="py-2">{customer.address}</TableCell>
                <TableCell className="py-2">{customer.tax_id}</TableCell>
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
