import React from "react";
import { TeamsCreateAction } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import SubmitButton from "../../App/Buttons/submit-button";
const CreateTeam = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create a Team</CardTitle>
        <CardDescription>
          Your team will help manage invoices and customers collaboratively.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={TeamsCreateAction}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="ex:Acme Inc." />
            </div>
            <SubmitButton label={"Create"} className={"w-full"} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateTeam;
