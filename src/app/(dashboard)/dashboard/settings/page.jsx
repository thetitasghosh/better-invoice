// app/settings/team/page.tsx or wherever your route is
import { getTeamData } from "@/app/actions";
import SubmitButton from "@/components/App/Buttons/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateTeamCompanyInfo } from "@/app/actions";

const Page = async () => {
  const team = await getTeamData();
  const company = team?.team_company?.[0] || {
    name: "",
    contact_person: "",
    email: "",
    phone: "",
    tax_id: "",
    address: "",
  };
  return (
    <div className="size-full">
      <form
        action={updateTeamCompanyInfo}
        className="h-full w-fit flex flex-col items-start justify-center gap-4 p-5"
      >
        <h1 className="text-2xl">Team Company</h1>

        <div className="space-y-1">
          <Label htmlFor="name" className="pl-1">
            My Company
          </Label>
          <Input
            defaultValue={company.name}
            name="name"
            id="name"
            className="w-96"
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="contact_person" className="pl-1">
            Contact Person
          </Label>
          <Input
            name="contact_person"
            defaultValue={company.contact_person}
            id="contact_person"
            className="w-96"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" className="pl-1">
            Email
          </Label>
          <Input
            name="email"
            defaultValue={company.email}
            id="email"
            className="w-96"
            type="email"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone" className="pl-1">
            Phone
          </Label>
          <Input
            name="phone"
            defaultValue={company.phone}
            id="phone"
            className="w-96"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="tax_id" className="pl-1">
            TAX ID
          </Label>
          <Input
            name="tax_id"
            defaultValue={company.tax_id}
            id="tax_id"
            className="w-96"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="address" className="pl-1">
            Address
          </Label>
          <Textarea
            defaultValue={company.address}
            name="address"
            id="address"
            className="w-96"
            rows={3}
          />
        </div>

        {/* Hidden input to pass team ID */}
        <input type="hidden" name="team_id" value={team?.id} />

        <div className="text-right w-full">
          <SubmitButton label="Update" />
        </div>
      </form>
    </div>
  );
};

export default Page;
