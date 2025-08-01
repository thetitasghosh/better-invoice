"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Check, ChevronDown, Loader, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SetTeamCompanyPopover from "@/components/App/Popover/set-team-company-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getCustomers } from "@/data/getDatas";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import Image from "next/image";
import { getInvoiceFromByTeamId, getTeamData } from "@/app/actions";
const DefaultInvoiceTemplate = ({ children, closeRef }) => {
  const [invoiceNumber, setInvoiceNumber] = useState("INV-0001");
  const [issueDate, setIssueDate] = useState(Date.now());
  const [dueDate, setDueDate] = useState(Date.now());
  const [items, setItems] = useState([]);
  const [note, setNote] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [taxRate, setTexRate] = useState(25);
  const [file, setFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openP, setOpenP] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [customers, setCustomers] = useState([]);
  const [from, setFrom] = useState("");
  const [invoice_From, setInvoice_From] = useState("");
  const [teamId, setTeamID] = useState("");
  const [teamCompany, setTeamCompany] = useState([]);
  const [customerID, setCustomerID] = useState("");
  const FileRef = useRef(null);
  // Add this at the top of your component
  const [showAddCompany, setShowAddCompany] = useState(false);

  useEffect(() => {
    if (teamCompany?.length === 0) {
      setTimeout(() => {
        setShowAddCompany(true);
      }, 1000); // 1 second delay
    }
  }, [teamCompany?.length]);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: invoiceNumber,
    invoiceLogo: logoUrl,
    issueDate: format(issueDate, "PP"),
    dueDate: format(dueDate, "PP"),
    customer: null, // or { name, contact_person, email, phone, address }
    from: from,
    paymentDetails: paymentDetails,
    note: note,
    items: items,
    taxRate: taxRate,
    total: 0,
  });
  // console.log("invoice Data", invoiceData);

  useEffect(() => {
    const FetchData = async () => {
      const data = await getCustomers();
      const team = await getTeamData();
      const invoice_from = await getInvoiceFromByTeamId(team.id);
      setCustomers(data);
      setTeamID(team.id);
      setTeamCompany(team.team_company);
      setInvoice_From(invoice_from);
    };
    FetchData();
  }, []);
  const handleInvoiceLogo = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // ✅ SET FILE HERE
      const preview = URL.createObjectURL(selectedFile);
      setLogoUrl(preview);
    }
  };
  useEffect(() => {
    setInvoiceData({
      invoiceNumber,
      invoiceLogo: logoUrl,
      issueDate: format(issueDate, "PP"),
      dueDate: format(dueDate, "PP"),
      customer: value,
      from, // you can hook this up from the "From" textarea later
      paymentDetails,
      note,
      items,
      taxRate,
      total: "",
    });
  }, [
    logoUrl,
    invoiceNumber,
    issueDate,
    dueDate,
    value,
    paymentDetails,
    note,
    items,
    taxRate,
    from,
  ]);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      description: "",
      quantity: 0,
      price: 0,
      total: 0,
    };
    setItems([...items, newItem]);
    // setInvoiceData((prev) => ({
    //   ...prev.items,
    //   items: newItem,
    // }));
  };

  const updateItem = (id, field, value) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === "quantity" || field === "price") {
          updatedItem.total = updatedItem.quantity * updatedItem.price;
        }
        return updatedItem;
      }
      return item;
    });

    setItems(updatedItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (taxRate / 100);
  };

  const calculateTotal = () => {
    const totals = calculateSubtotal() + calculateTax();
    // setInvoiceData((prev) => ({ ...prev.total, total: totals }));
    return totals;
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toFixed(0)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sp = createClient();
    // Basic validation (optional but recommended)
    if (!invoiceData.customer || invoiceData.items.length === 0) {
      toast.error(
        "Please select a customer and add at least one invoice item."
      );
      return;
    }

    try {
      const { error } = await sp.from("invoices").insert([
        {
          team_id: teamId,
          customer_id: customerID,
          issue_date: format(issueDate, "PP"),
          due_date: format(dueDate, "PP"),
          customer: value, // name or label
          amount: calculateTotal(),
          recurring: "once", // or you can support recurring logic later
          items: items, // already JSON
          tax_rate: taxRate,
          invoice_no: invoiceNumber,
          invoice_logo: logoUrl,
          payment_details: paymentDetails,
          note: note,
          from: teamCompany,
          status: "draft", // default status
        },
      ]);
      // await sendInvoiceToAPI(finalData);
      if (error) {
        toast.error(error.message);
      }
      // Success

      toast.success("Invoice submitted successfully!");
      closeRef.current?.click(); // Close Sheet
    } catch (error) {
      console.error("Error submitting invoice:", error);
      toast.error("Failed to submit invoice. Please try again.");
    }
  };
  console.log(invoice_From);

  return (
    <div className="size-full bg-neutral-100 overflow-y-scroll hideScrollbar">
      <form
        onSubmit={handleSubmit}
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
                      <SelecIssueDate
                        IssueDate={issueDate}
                        setIssueDate={setIssueDate}
                        format={format}
                      >
                        <span className="font-semibold">{issueDate}</span>
                      </SelecIssueDate>
                    </p>
                    <p>
                      Due Date:{" "}
                      <SelecDueDate
                        DueDate={dueDate}
                        setDueDate={setDueDate}
                        format={format}
                      >
                        <span className="font-semibold">{dueDate}</span>
                      </SelecDueDate>
                    </p>
                  </div>
                </div>
                <div
                  id="invoice-logo"
                  className="size-32  bg-neutral-300"
                  onClick={() => FileRef.current.click()}
                >
                  {logoUrl && (
                    <Image
                      src={logoUrl}
                      alt=""
                      width={500}
                      height={500}
                      className="size-full bg-neutral-100 object-cover"
                    />
                  )}
                  <input
                    type="file"
                    ref={FileRef}
                    hidden
                    onChange={handleInvoiceLogo}
                  />
                </div>
              </div>

              {/* From/To Section */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p onClick={() => setOpenP(!openP)} className="mb-2">
                    From
                  </p>
                  {invoice_From || invoice_From.length > 0 ? (
                    invoice_From.map((company, i) => (
                      <div
                        key={i}
                        className="flex text-sm text-black redd flex-col items-start justify-start h-32"
                      >
                        <span className="font-bold capitalize">
                          {company.company_name}
                        </span>
                        <span>{company.contact_person}</span>
                        <span>{company.email}</span>
                        <span>{company.phone}</span>
                        <span>{company.address}</span>
                        <span>
                          TAX ID:{" "}
                          {company.tax_id ? company.tax_id : "Not provided"}
                        </span>
                      </div>
                    ))
                  ) : showAddCompany ? (
                    <SetTeamCompanyPopover
                      teamID={teamId}
                      setOpenP={setOpenP}
                      openP={openP}
                    >
                      <Button
                        type="Button"
                        variant={"ghost"}
                        // className="text-sm px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-700"
                      >
                        Set Company
                      </Button>
                    </SetTeamCompanyPopover>
                  ) : (
                    <div className="text-sm px-4 py-2 rounded flex items-center gap-2 text-zinc-500">
                      <Loader className="size-4 animate-spin" />
                      Loading...
                    </div>
                  )}
                </div>
                <div>
                  <p className="mb-2">To</p>
                  <div className="bg  h-32 ">
                    <span className="text-sm text-muted-foreground">
                      <SelectCustomer
                        setOpen={setOpen}
                        open={open}
                        customers={customers}
                        value={value}
                        setValue={setValue}
                        setCustomerID={setCustomerID}
                      />
                    </span>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <div className="grid grid-cols-12 gap-4 mb-2 mt-5 text-zinc-500">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 mb-2">
                    <div className="col-span-6">
                      <Input
                        type="text"
                        className=" capitalize shadow-none   focus:bg-neutral-100 bg-neutral-300 rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 "
                        value={item.description}
                        // placeholder="type"
                        onChange={(e) =>
                          updateItem(item.id, "description", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        className="bg-neutral-300 capitalize shadow-none focus:bg-neutral-100 border-none rounded-none text-center focus-visible:ring-0 focus-visible:ring-offset-0"
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
                        className="bg-neutral-300 capitalize shadow-none focus:bg-neutral-100 rounded-none border-none text-center focus-visible:ring-0 focus-visible:ring-offset-0"
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
                  className="mt-2 text-zinc-500 hover:text-white hover:bg-neutral-800 gap-0 rounded-none"
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
                  <Textarea
                    onChange={(e) => setPaymentDetails(e.target.value)}
                    className="focus:bg-neutral-100 bg-neutral-300 shadow-none rounded-none border-none h-24 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Note</Label>
                  <Textarea
                    onChange={(e) => setNote(e.target.value)}
                    className="focus:bg-neutral-100 bg-neutral-300 shadow-none rounded-none border-none h-24 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
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

function SelectCustomer({
  open,
  setOpen,
  customers,
  value,
  setValue,
  setCustomerID,
}) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] text-sm justify-between"
        >
          {value
            ? (() => {
                const customer = customers.find(
                  (customer) => customer.name === value
                );
                return customer ? (
                  <div
                    className="flex flex-col items-start justify-center text-black"
                    key={customer.id || customer.name}
                  >
                    {" "}
                    {/* Use a unique key */}
                    <span className="font-bold capitalize">
                      {customer.name}
                    </span>
                    <span>{customer.contact_person}</span>
                    <span>{customer.email}</span>
                    <span>{customer.phone}</span>
                    <span>{customer.address}</span>
                    <span>TAX ID: {customer.tax_id}</span>
                  </div>
                ) : (
                  "Customer not found"
                );
              })()
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
                    setCustomerID(customer.id);
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
function SelecIssueDate({ children, IssueDate, setIssueDate, format }) {
  return (
    <Popover>
      <PopoverTrigger name="issue_date">
        {IssueDate ? format(IssueDate, "PP") : children}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={IssueDate}
          onSelect={setIssueDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
function SelecDueDate({ children, DueDate, setDueDate, format }) {
  return (
    <Popover>
      <PopoverTrigger name="due_date">
        {DueDate ? format(DueDate, "PP") : children}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={DueDate}
          onSelect={setDueDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
