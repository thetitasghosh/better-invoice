"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

const SetTeamCompanyPopover = ({ children, teamID, openP, setOpenP }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const supabase = createClient();

    if (!teamID) {
      toast.error("Team ID not found");
      return;
    }

    if (!formData.name) {
      toast.warning("Company name is required");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("teams")
      .update({
        team_company: [formData], // store as array of 1 object
      })
      .eq("id", teamID);

    setLoading(false);

    if (error) {
      toast.error("Failed to save company info");
    } else {
      toast.success("Company info saved");
      // Optionally clear or close popover
      // setFormData({ name: "", contact_person: "", email: "", phone: "", address: "" });
    }
  };

  return (
    <Popover open={openP} onOpenChange={setOpenP}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side="left" className="mr-10 w-[300px] space-y-2">
        <h2 className="text-lg font-semibold mb-2">Set Company Info</h2>

        <Input
          placeholder="Company Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <Input
          placeholder="Contact Person"
          value={formData.contact_person}
          onChange={(e) => handleChange("contact_person", e.target.value)}
        />
        <Input
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <Textarea
          placeholder="Address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          rows={2}
        />

        <Button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-neutral-800 text-white hover:bg-neutral-700"
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default SetTeamCompanyPopover;
