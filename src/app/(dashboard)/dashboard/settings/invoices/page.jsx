// components/Features/Prescription/PreviewPrescriptionSheet.tsx

"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PDFViewer } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { ReactInvoicePdf } from "@/components/App/Invoices/react-pdf-invoice";

const data = {
  invoice_number: "INV-0001",
  issue_date: "Aug 2, 2025",
  due_date: "Aug 2, 2025",
  logo: "/goal.png", // base64 or full path
  from: {
    name: "NGT",
    contact_person: "Titas Ghosh",
    email: "the@titasghosh.com",
    phone: "06296328842",
    address: "badkulla",
    tax_id: "Not provided",
  },
  to: {
    name: "YourMaker",
    contact_person: "Tukai Karmakar",
    email: "helle@titasghosh.com",
    phone: "+916296328842",
    address: "Badkulla",
    tax_id: "55588",
  },
  items: [
    {
      description: "Website",
      quantity: 1,
      price: 5000,
      total: 5000,
    },
  ],
  subtotal: 5000,
  tax_rate: 25,
  tax: 1250,
  total: 6250,
  payment_details: "payment details",
  note: "thank you",
};

export default function PreviewInvoiceSheet() {
  return (
    <div className="w-full flex flex-col items-center justify-normal">
      <Sheet>
        <div className="w-96 m-2 rounded-md border bg-neutral-200 p-5 text-right dark:bg-neutral-950">
          <SheetTrigger asChild>
            <Button variant="secondary">View Current Template</Button>
          </SheetTrigger>
        </div>
        <SheetContent side="right" className="redd h-full md:max-w-[45rem]">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="h-full w-full  ">
            <PDFViewer width="100%" height="100%" showToolbar={false}>
              <ReactInvoicePdf data={data} />
            </PDFViewer>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
