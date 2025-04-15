"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getCustomers } from "@/data/getDatas";
import { Sevillana } from "next/font/google";
import { cn } from "@/lib/utils";
const DefaultInvoiceTemplate = ({ children }) => {
  const [invoiceNumber, setInvoiceNumber] = useState("INV-0001");
  const [issueDate, setIssueDate] = useState("10/05/2023");
  const [dueDate, setDueDate] = useState("10/05/2023");
  const [items, setItems] = useState([]);
  const [taxRate, setTexRate] = useState(25);
  const [file, setFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [customers, setCustomers] = useState([]);
  const FileRef = useRef(null);

  useEffect(() => {
    const FetchData = async () => {
      const data = await getCustomers();
      setCustomers(data);
    };
    FetchData();
  }, []);
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      description: "",
      quantity: 0,
      price: 0,
      total: 0,
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id, field, value) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          // Recalculate total if quantity or price changes
          if (field === "quantity" || field === "price") {
            updatedItem.total = updatedItem.quantity * updatedItem.price;
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(0)}`;
  };
  return (
    <div className="size-full bg-neutral-100 overflow-y-scroll hideScrollbar">
      <form
        action=""
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
                      <span className="font-semibold">{invoiceNumber}</span>
                    </p>
                    <p>
                      Issue Date:{" "}
                      <span className="font-semibold">{issueDate}</span>
                    </p>
                    <p>
                      Due Date: <span className="font-semibold">{dueDate}</span>
                    </p>
                  </div>
                </div>
                <div
                  id="invoice-logo"
                  className="size-32  bg-neutral-300"
                ></div>
              </div>

              {/* From/To Section */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="mb-2">From</p>
                  <div className="bg-neutral-300  h-28 ">
                    <Textarea
                      className="bg-transparent text-sm rounded-none border-none h-full resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder=""
                      rows={4}
                    />
                  </div>
                </div>
                <div>
                  <p className="mb-2">To</p>
                  <div className="bg  h-28 ">
                    {/* <Textarea
                      className="bg-transparent rounded-none  text-sm border-none h-full resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Select customer"
                      rows={4}
                    /> */}
                    <span className="text-sm text-muted-foreground">
                      <SelectCustomer
                        setOpen={setOpen}
                        open={open}
                        customers={customers}
                        value={value}
                        setValue={setValue}
                      />
                    </span>
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

                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 mb-2">
                    <div className="col-span-6">
                      <Input
                        className="bg-neutral-300 rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={item.description}
                        onChange={(e) =>
                          updateItem(item.id, "description", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        className="bg-neutral-300 border-none rounded-none text-center focus-visible:ring-0 focus-visible:ring-offset-0"
                        type="number"
                        value={item.quantity || ""}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "quantity",
                            Number.parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        className="bg-neutral-300 rounded-none border-none text-center focus-visible:ring-0 focus-visible:ring-offset-0"
                        type="number"
                        value={item.price || ""}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "price",
                            Number.parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                    <div className="col-span-2 flex items-center justify-end">
                      {formatCurrency(item.total)}
                    </div>
                  </div>
                ))}

                {/* Add Item Button */}
                <Button
                  variant="ghost"
                  type="button"
                  className="mt-2 text-zinc-500 hover:text-white hover:bg-neutral-800 gap-0"
                  onClick={addItem}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Item
                </Button>
              </div>

              {/* Summary */}
              <div className="flex flex-col items-end space-y-2 mt-6">
                <div className="grid grid-cols-2 gap-4 w-1/3 text-zinc-500">
                  <div className="text-sm">Subtotal</div>
                  <div className="text-right text-black">
                    {formatCurrency(calculateSubtotal())}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-1/3 text-zinc-500">
                  <div className="text-sm">Tax {`(${taxRate}%)`}</div>
                  <div className="text-right text-black">
                    {formatCurrency(calculateTax())}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-1/3 font-bold mt-2">
                  <div className="">Total</div>
                  <div className="text-right text-black text-xl">
                    {formatCurrency(calculateTotal())}
                  </div>
                </div>
              </div>

              {/* Payment Details and Note */}
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <Label className="mb-2 block">Payment Details</Label>
                  <Textarea className="bg-neutral-300 rounded-none border-none h-24 resize-none focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>
                <div>
                  <Label className="mb-2 block">Note</Label>
                  <Textarea className="bg-neutral-300 rounded-none border-none h-24 resize-none focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="button"
          className="fixed bottom-1 right-1 p-2 w-full flex items-center justify-end gap-2"
        >
          {children}
        </div>
      </form>
    </div>
  );
};

export default DefaultInvoiceTemplate;

function SelectCustomer({ open, setOpen, customers, value, setValue }) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? customers.find((customer) => customer.name === value)?.name
            : "Select customer..."}
          {/* <ChevronsUpDown className="opacity-50" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search customer..." />
          <CommandList>
            <CommandEmpty>No customer found.</CommandEmpty>
            <CommandGroup>
              {customers.map((customer) => (
                <CommandItem
                  key={customer.name}
                  value={customer.name}
                  onSelect={(customerName) => {
                    setValue(customerName === value ? "" : customerName);
                    setOpen(false);
                  }}
                >
                  {customer.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === customer.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
