"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/App/Buttons/submit-button";
// import { getCookie } from "cookies-next";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { useTeamContext } from "@/Contexts/UserContext";
import { getInvoiceFromByTeamId } from "@/app/actions";

const TeamSettingsPage = () => {
  const supabase = createClient();
  const { teamId } = useTeamContext();
  const [company, setCompany] = useState({
    name: "",
    contact_person: "",
    email: "",
    phone: "",
    tax_id: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  // const [teamId, setTeamId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInvoiceFromByTeamId(teamId);

      if (data) setCompany(data);
      setLoading(false);
    };

    fetchData();
  }, [teamId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const updatedCompany = {
      // name: formData.get("name"),
      company_name: formData.get("company_name"),
      contact_person: formData.get("contact_person"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      tax_id: formData.get("tax_id"),
      address: formData.get("address"),
    };

    const { error } = await supabase
      .from("invoice_from_default")
      .upsert({ ...updatedCompany, team_id: teamId });

    if (error) toast.error("Failed to update company info");
    else toast.success("Company info updated");

    setLoading(false);
  };

  if (!teamId) return <p className="p-5">No team selected.</p>;

  return (
    <div className="size-full">
      <form
        onSubmit={handleUpdate}
        className="h-full w-fit flex flex-col items-start justify-center gap-4 p-5"
      >
        <h1 className="text-2xl">Company Info</h1>

        {[
          "company_name",
          "contact_person",
          "email",
          "phone",
          "tax_id",
          "address",
        ].map((field) => (
          <div key={field} className="space-y-1">
            <Label htmlFor={field} className="pl-1 capitalize">
              {field.replace("_", " ")}
            </Label>
            {field === "address" ? (
              <Textarea
                id={field}
                name={field}
                defaultValue={company[field]}
                className="w-96"
                rows={3}
              />
            ) : (
              <Input
                id={field}
                name={field}
                defaultValue={company[field]}
                className="w-96"
              />
            )}
          </div>
        ))}

        <div className="text-right w-full">
          <SubmitButton
            label={loading ? "Saving..." : "Update"}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default TeamSettingsPage;
