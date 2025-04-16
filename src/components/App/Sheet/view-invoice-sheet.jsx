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
import { getInvoices } from "@/data/getDatas";

const ViewInvoiceSheet = async ({ children, id }) => {
  const invoice = await getInvoices();
  const INV = invoice.find((inv) => inv.id === id);
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="min-w-[40rem] p-1 pb-24 ">
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
                              {INV.invoice_no}
                            </span>
                          </p>
                          <p>
                            Issue Date: <span className="font-semibold"></span>
                          </p>
                          <p>
                            Due Date: <span className="font-semibold">{}</span>
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
                        <div className="  h-32 ">
                          <Textarea
                            className="bg-transparent focus:bg-neutral-100  shadow-none text-sm rounded-none border-none h-full resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder=""
                            value={""}
                            // onChange={(e) => setFrom(e.target.value)}
                            rows={4}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="mb-2">To</p>
                        <div className="bg  h-32 ">
                          {/* <Textarea
                      className="bg-transparent rounded-none  text-sm border-none h-full resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Select customer"
                      rows={4}
                    /> */}
                          <span className="text-sm text-muted-foreground"></span>
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

                      {INV.items.map((item) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-12 gap-4 mb-2"
                        >
                          <div className="col-span-6">
                            <Input
                              type="text"
                              className=" capitalize shadow-none   focus:bg-neutral-100  rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 "
                              value={item.description}
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
                              value={item.quantity || ""}
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
                              value={item.price || ""}
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
                        <div className="text-right text-black"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 w-1/3 text-zinc-500">
                        <div className="text-sm">Tax {`(${""}%)`}</div>
                        <div className="text-right text-black"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 w-1/3 font-bold mt-2">
                        <div className="">Total</div>
                        <div className="text-right text-black text-xl"></div>
                      </div>
                    </div>

                    {/* Payment Details and Note */}
                    <div className="grid grid-cols-2 gap-6 mt-6">
                      <div>
                        <Label className="mb-2 block">Payment Details</Label>
                        <Textarea
                          value={""}
                          className="focus:bg-neutral-100  shadow-none rounded-none border-none h-24 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">Note</Label>
                        <Textarea
                          value={""}
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
