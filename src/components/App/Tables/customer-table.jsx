'use client'
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
import CreateCustomerSheet from "../Sheet/create-customer-sheet";
import TableActionButton from "@/components/App/Buttons/table-action-button";
import { useEffect, useState } from "react";

export default function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await getCustomers();
      setCustomers(data);
    };
    fetch();
  }, []);
  if (customers.length <= 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="size-80 flex-col flex items-center justify-center gap-2">
          <h1 className="font-semibold text-lg">No customers</h1>
          <p className="text-sm">
            You haven&apos;t created any customers yet. <br />
            Go ahead and create your first one.
          </p>
          <CreateCustomerSheet>
            <Button variant={"outline"}>Create customer</Button>
          </CreateCustomerSheet>
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
                  <TableActionButton table={"customers"} id={customer.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
