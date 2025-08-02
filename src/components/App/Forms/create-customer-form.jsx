"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreateCustomerAction, UpdateCustomerAction } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { ChevronsRight } from "lucide-react";
import { getCustomerById } from "@/data/getDatas";
import { cn } from "@/lib/utils";
const CreateCustomerForm = ({
  children,
  closeRef,
  customer_id,
  view,
  update,
}) => {
  const [state, action] = useFormState(
    customer_id ? UpdateCustomerAction : CreateCustomerAction,
    null
  );
  const [customer, setCustomer] = useState([]);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (state === null) return;

    if (state?.error) {
      toast.error("Something went wrong");
    } else {
      toast.success(
        customer_id
          ? "Customer updated successfully"
          : "Customer created successfully"
      );
      closeRef.current?.click(); // Close Sheet
    }
  }, [state, closeRef, customer_id]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCustomerById(customer_id);
      setCustomer(data);
      setFormValues(data);
    };
    fetchData();
  }, [customer_id]);
  console.log(customer);
  const handleChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div className="w-full redd  overflow-y-scroll hideScrollbar h-full">
      <form
        action={action}
        className="w-full h-[55rem] flex items-center flex-col justify-start gap-5 pt-5 px-0.5"
      >
        <div id="general-details-form" className="w-full space-y-2">
          <h1 className="w-full font-medium border-b">Basic Information</h1>
          <div id="form-slot" className="w-full">
            <Label htmlFor="name" className="pl-1">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Acme Inc."
              required
              value={customer.name || ""}
              // value={formValues.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              readOnly={view}
              className={cn("", {
                "border-none shadow-none font-bold": customer_id,
              })}
            />
            <input type="text" name="customer_id" value={customer_id} hidden />
          </div>
          <div
            id="form-slot"
            className="w-full flex items-center justify-center gap-2"
          >
            <div>
              <Label htmlFor="email" className="pl-1">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="example@email.com"
                value={customer.email}
                onChange={(e) => handleChange("email", e.target.value)}
                readOnly={view}
                className={cn("", {
                  "border-none shadow-none font-bold": customer_id,
                })}
              />
            </div>
            <div>
              <Label htmlFor="phone" className="pl-1">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+91 XXXXXXXXXX"
                value={customer.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                readOnly={view}
                className={cn("", {
                  "border-none shadow-none font-bold": customer_id,
                })}
              />
            </div>
          </div>
          <div id="form-slot" className="w-full">
            <Label htmlFor="website" className="pl-1">
              Website
            </Label>
            <Input
              id="website"
              name="website"
              placeholder="www.website.com"
              value={customer.website}
              onChange={(e) => handleChange("website", e.target.value)}
              readOnly={view}
              className={cn("", {
                "border-none shadow-none font-bold": customer_id,
              })}
            />
          </div>
          <div id="form-slot" className="w-full">
            <Label htmlFor="owner" className="pl-1">
              Contact Persona / Owner
            </Label>
            <Input
              id="owner"
              name="contact_person"
              placeholder="john Doe."
              value={customer.contact_person}
              onChange={(e) => handleChange("contact_persone", e.target.value)}
              readOnly={view}
              className={cn("", {
                "border-none shadow-none font-bold": customer_id,
              })}
            />
          </div>
        </div>
        <div id="general-address-form" className="w-full space-y-2">
          <h1 className="w-full font-medium border-b">Details</h1>
          <div id="form-slot" className="w-full">
            <Label htmlFor="address" className="pl-1">
              Address
            </Label>
            <Input
              id="address"
              name="address"
              placeholder="Address"
              value={customer.address}
              onChange={(e) => handleChange("address", e.target.value)}
              readOnly={view}
              className={cn("", {
                "border-none shadow-none font-bold": customer_id,
              })}
            />
          </div>
          {/* <div
            id="form-slot"
            className="w-full flex items-center justify-center gap-2"
          >
            <div>
              <Label htmlFor="name" className="pl-1">
                Email
              </Label>
              <Input id="name" placeholder="example@email.com" />
            </div>
            <div>
              <Label htmlFor="name" className="pl-1">
                Phone
              </Label>
              <Input id="name" placeholder="+91 XXXXXXXXXX" />
            </div>
          </div>
          <div id="form-slot" className="w-full">
            <Label htmlFor="name" className="pl-1">
              Website
            </Label>
            <Input id="name" placeholder="www.website.com" />
          </div> */}
          <div id="form-slot" className="w-full">
            <Label htmlFor="tax_id" className="pl-1">
              Tax ID / VAT Number
            </Label>
            <Input
              id="tax_id"
              name="tax_id"
              placeholder="Enter VAT number"
              value={customer.tax_id}
              onChange={(e) => handleChange("tax_id", e.target.value)}
              readOnly={view}
              className={cn("", {
                "border-none shadow-none font-bold": customer_id,
              })}
            />
          </div>
          <div id="form-slot" className="w-full">
            <Label htmlFor="note" className="pl-1">
              Note
            </Label>
            <Textarea
              id="note"
              name="note"
              rows={3}
              placeholder="Additional information.."
              value={customer.note}
              onChange={(e) => handleChange("note", e.target.value)}
              readOnly={view}
              className={cn("", {
                "border-none shadow-none font-bold": customer_id,
              })}
            />
          </div>
        </div>
        <div className="fixed bottom-1 right-1 p-2 w-full flex items-center justify-end gap-2">
          {children}
        </div>
      </form>
    </div>
  );
};

export default CreateCustomerForm;
