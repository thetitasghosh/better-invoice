"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreateCustomerAction } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { ChevronsRight } from "lucide-react";
const CreateCustomerForm = ({ children, closeRef }) => {
  const [state, action] = useFormState(CreateCustomerAction, null);

  useEffect(() => {
    if (state === null) return;

    if (state?.error) {
      toast.error("Something went wrong");
    } else {
      toast.success("Customer created successfully");
      closeRef.current?.click(); // Close Sheet
    }
  }, [state, closeRef]);
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
            <Input id="name" name="name" placeholder="Acme Inc." required />
          </div>
          <div
            id="form-slot"
            className="w-full flex items-center justify-center gap-2"
          >
            <div>
              <Label htmlFor="email" className="pl-1">
                Email
              </Label>
              <Input id="email" name="email" placeholder="example@email.com" />
            </div>
            <div>
              <Label htmlFor="phone" className="pl-1">
                Phone
              </Label>
              <Input id="phone" name="phone" placeholder="+91 XXXXXXXXXX" />
            </div>
          </div>
          <div id="form-slot" className="w-full">
            <Label htmlFor="website" className="pl-1">
              Website
            </Label>
            <Input id="website" name="website" placeholder="www.website.com" />
          </div>
          <div id="form-slot" className="w-full">
            <Label htmlFor="owner" className="pl-1">
              Contact Persona / Owner
            </Label>
            <Input id="owner" name="contact_person" placeholder="john Doe." />
          </div>
        </div>
        <div id="general-address-form" className="w-full space-y-2">
          <h1 className="w-full font-medium border-b">Details</h1>
          <div id="form-slot" className="w-full">
            <Label htmlFor="address" className="pl-1">
              Address
            </Label>
            <Input id="address" name="address" placeholder="Address" />
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
            <Input id="tax_id" name="tax_id" placeholder="Enter VAT number" />
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
