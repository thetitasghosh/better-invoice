import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { getCustomers, getInvoices } from "@/data/getDatas";
import { getTeamData } from "@/app/actions";

const ViewInvoiceSheet = async ({ children, id }) => {
  const invoice = await getInvoices();
  const customer = await getCustomers();
  const team = await getTeamData();

  const INVOICE = invoice.find((inv) => inv.id === id);
  const CUSTOMER = customer.find((cus) => cus.id === INVOICE.customer_id);
  const calculateSubtotal = () => {
    return INVOICE.items.reduce((sum, item) => sum + item.total, 0);
  };
  const calculateTax = () => {
    return calculateSubtotal() * (INVOICE.tax_rate / 100);
  };

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="min-w-[40rem] p-1  ">
        <SheetHeader>
          <SheetTitle hidden>Are you absolutely sure?</SheetTitle>
          <SheetDescription hidden>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <div id="invoice-view" className="size-full redd ">
          <div className="size-full bg-neutral-100 overflow-y-scroll hideScrollbar">
            <div
              // action=""
              className="flex flex-col items-center justify-center gap-2"
            >
              <div className="w-full max-w-4xl  text-black border-none">
                <div className="p-6">
                  <div className="space-y-6 redd">
                    {/* Header */}
                    <div
                      id="header"
                      className="redd h-32 flex items-center justify-between"
                    >
                      <div id="invoice-no">
                        <h1 className="font-bold text-3xl">Invoice</h1>
                        <div className="text-sm pt-5">
                          <p>
                            Invoice No:{" "}
                            <span className="font-semibold">
                              {INVOICE.invoice_no}
                            </span>
                          </p>
                          <p>
                            Issue Date:{" "}
                            <span className="font-semibold">
                              {INVOICE.issue_date}
                            </span>
                          </p>
                          <p>
                            Due Date:{" "}
                            <span className="font-semibold">
                              {INVOICE.due_date}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div
                        id="invoice-logo"
                        className="size-32  "
                        // onClick={() => FileRef.current.click()}
                      >
                        {/* {logoUrl && (
                          <Image
                            src={logoUrl}
                            alt=""
                            width={500}
                            height={500}
                            className="size-full object-cover"
                          />
                        )} */}
                      </div>
                    </div>

                    {/* From/To Section */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="mb-2">From</p>
                        {team.team_company.map((company, i) => {
                          return (
                            <div
                              key={i}
                              className=" flex text-sm text-black redd flex-col items-start justify-start   h-32 "
                            >
                              <span className="font-bold capitalize">
                                {company.name}
                              </span>
                              <span>{company.contact_person}</span>
                              <span>{company.email}</span>
                              <span>{company.phone}</span>
                              <span>{company.address}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <p className="mb-2">To</p>
                        <div className=" flex text-sm text-black redd flex-col items-start justify-start   h-32 ">
                          <span className="font-bold capitalize">
                            {CUSTOMER.name}
                          </span>
                          <span>{CUSTOMER.contact_person}</span>
                          <span>{CUSTOMER.email}</span>
                          <span>{CUSTOMER.phone}</span>
                          <span>{CUSTOMER.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Items Table */}
                    <div>
                      <div className="grid grid-cols-12 gap-4 mb-2 text-zinc-500">
                        <div className="col-span-6">Description</div>
                        <div className="col-span-2 text-center">Quantity</div>
                        <div className="col-span-2 text-center">Price</div>
                        <div className="col-span-2 text-right">Total</div>
                      </div>

                      {INVOICE.items.map((item) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-12 gap-4 mb-2"
                        >
                          <div className="col-span-6">
                            <Input
                              type="text"
                              readOnly
                              className=" capitalize shadow-none   focus:bg-neutral-100  rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 "
                              defaultValue={item.description}
                              // placeholder="type"
                              //   onChange={(e) =>
                              //     updateItem(
                              //       item.id,
                              //       "description",
                              //       e.target.value
                              //     )
                              //   }
                            />
                          </div>
                          <div className="col-span-2">
                            <Input
                              className=" capitalize shadow-none focus:bg-neutral-100 border-none rounded-none text-center focus-visible:ring-0 focus-visible:ring-offset-0"
                              type="number"
                              readOnly
                              defaultValue={item.quantity || ""}
                              //   onChange={(e) =>
                              //     updateItem(
                              //       item.id,
                              //       "quantity",
                              //       Number.parseFloat(e.target.value) || 0
                              //     )
                              //   }
                            />
                          </div>
                          <div className="col-span-2">
                            <Input
                              className=" capitalize shadow-none focus:bg-neutral-100 rounded-none border-none text-center focus-visible:ring-0 focus-visible:ring-offset-0"
                              type="number"
                              readOnly
                              defaultValue={item.price || ""}
                              //   onChange={(e) =>
                              //     updateItem(
                              //       item.id,
                              //       "price",
                              //       Number.parseFloat(e.target.value) || 0
                              //     )
                              //   }
                            />
                          </div>
                          <div className="col-span-2 flex items-center justify-end">
                            {item.total}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Summary */}
                    <div className="flex flex-col items-end space-y-2 mt-6">
                      <div className="grid grid-cols-2 gap-4 w-1/3 text-zinc-500">
                        <div className="text-sm">Subtotal</div>
                        <div className="text-right text-black">
                          {calculateSubtotal()}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 w-1/3 text-zinc-500">
                        <div className="text-sm">
                          Tax {`(${INVOICE.tax_rate}%)`}
                        </div>
                        <div className="text-right text-black">
                          {calculateTax()}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 w-1/3 font-bold mt-2">
                        <div className="">Total</div>
                        <div className="text-right text-black text-xl">
                          {INVOICE.amount}
                        </div>
                      </div>
                    </div>

                    {/* Payment Details and Note */}
                    <div className="grid grid-cols-2 gap-6 mt-6">
                      <div>
                        <Label className="mb-2 block">Payment Details</Label>
                        <Textarea
                          readOnly
                          defaultValue={INVOICE.payment_details}
                          className="focus:bg-neutral-100  shadow-none rounded-none border-none h-24 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">Note</Label>
                        <Textarea
                          readOnly
                          defaultValue={INVOICE.note}
                          className="focus:bg-neutral-100  shadow-none rounded-none border-none h-24 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ViewInvoiceSheet;
