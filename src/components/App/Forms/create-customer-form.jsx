import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
const CreateCustomerForm = ({ children }) => {
  return (
    <div className="w-full redd  overflow-y-scroll hideScrollbar h-full">
      <form
        action=""
        className="w-full h-[55rem] flex items-center flex-col justify-start gap-5 pt-5 px-0.5"
      >
        <div id="general-details-form" className="w-full space-y-2">
          <h1 className="w-full font-medium border-b">Basic Information</h1>
          <div id="form-slot" className="w-full">
            <Label htmlFor="name" className="pl-1">
              Name
            </Label>
            <Input id="name" placeholder="Acme Inc." />
          </div>
          <div
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
          </div>
          <div id="form-slot" className="w-full">
            <Label htmlFor="name" className="pl-1">
              Contact Persona / Owner
            </Label>
            <Input id="name" placeholder="john Doe." />
          </div>
        </div>
        <div id="general-address-form" className="w-full space-y-2">
          <h1 className="w-full font-medium border-b">Details</h1>
          <div id="form-slot" className="w-full">
            <Label htmlFor="name" className="pl-1">
              Address
            </Label>
            <Input id="name" placeholder="Address" />
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
            <Label htmlFor="name" className="pl-1">
              Tax ID / VAT Number
            </Label>
            <Input id="name" placeholder="Enter VAT number" />
          </div>
          <div id="form-slot" className="w-full">
            <Label htmlFor="name" className="pl-1">
              Note
            </Label>
            <Textarea
              id="name"
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
