"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const InviteMembers = () => {
  const [emails, setEmails] = useState([""]);
  const route = useRouter();
  const handleEmailChange = (index, value) => {
    const updated = [...emails];
    updated[index] = value;
    setEmails(updated);
  };

  const addEmailField = () => setEmails([...emails, ""]);

  const removeEmailField = (index) => {
    const updated = emails.filter((_, i) => i !== index);
    setEmails(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEmails = emails.filter((email) => email.trim() !== "");
    if (validEmails.length === 0) {
      toast.error("Please enter at least one email.");
      return;
    }

    // Do something with the emails
    console.log("Sending invites to:", validEmails);
    toast.success("Invites sent!");
  };

  const handleSkip = () => {
    toast.info("Skipped inviting members.");
    // redirect to /home or next page
    route.push("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <form onSubmit={handleSubmit}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Invite team members</CardTitle>
            <CardDescription>
              Invite your teammates to help manage invoices, customers, and
              settings.
            </CardDescription>
          </CardHeader>
          <CardContent className=" space-y-2">
            {emails.map((email, index) => (
              <div
                key={index}
                className="flex redd items-end justify-end  gap-2"
              >
                <div className="flex-1">
                  <Label htmlFor="email" className="pl-1">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                  />
                </div>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeEmailField(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}

            <Button type="button" variant="secondary" onClick={addEmailField}>
              + Add Another
            </Button>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-between">
          <Button type="button" variant="ghost" onClick={handleSkip}>
            Skip
          </Button>
          <Button type="submit">Send Invites</Button>
        </div>
      </form>
    </div>
  );
};

export default InviteMembers;
