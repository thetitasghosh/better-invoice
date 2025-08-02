"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import {
  createTeamMember,
  getTeamMemberDataById,
  updateTeamMember,
} from "@/app/actions";
import { toast } from "sonner";
import Image from "next/image";
import SubmitButton from "@/components/App/Buttons/submit-button";
import { useTeamContext } from "@/Contexts/UserContext";

const AccountCreationForm = () => {
  const { teamId, teamMemberId } = useTeamContext();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileRef = useRef(null);

  const [state, formAction] = useFormState(
    teamMemberId ? updateTeamMember : createTeamMember,
    null
  );
  useEffect(() => {
    const fetchTeamMemberData = async () => {
      const data = await getTeamMemberDataById(teamMemberId);
      console.log(data);

      setAvatarPreview(data?.avatar_url);
      // setAvatar(data?.avatar_url);
      setFullName(data?.name);
      setEmail(data?.email);
      setPhone(data?.phone);
    };
    fetchTeamMemberData();
  }, [teamMemberId]);
  useEffect(() => {
    if (state === null) return;
    if (state?.error) {
      toast.error(state.error.message);
    } else {
      toast.success(
        teamMemberId
          ? "Account updated successfully"
          : "Account created successfully"
      );
    }
  }, [state, teamMemberId]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const preview = URL.createObjectURL(file);
      setAvatarPreview(preview);
    }
  };

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 p-4 max-w-md mx-auto"
    >
      <div className="flex flex-col gap-1">
        <Label htmlFor="avatar">Upload Avatar</Label>
        <input
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
          hidden
          ref={fileRef}
          onChange={handleFileChange}
        />
        <input
          id="team_id"
          name="team_id"
          type="text"
          value={teamId}
          // accept="image/*"
          hidden
          // ref={fileRef}
          // onChange={handleFileChange}
        />
        <input
          id="team_id"
          name="team_member_id"
          type="text"
          value={teamMemberId}
          // accept="image/*"
          hidden
          // ref={fileRef}
          // onChange={handleFileChange}
        />
        <div
          className="w-24 h-24 rounded-full border border-gray-300 overflow-hidden cursor-pointer"
          onClick={() => fileRef.current?.click()}
        >
          {avatarPreview ? (
            <Image
              src={avatarPreview}
              width={32}
              height={32}
              alt="Avatar preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm text-center w-full h-full flex items-center justify-center">
              Upload
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          id="full_name"
          name="full_name"
          value={fullName}
          required
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <SubmitButton
        label={teamMemberId ? "Update account" : "Create account"}
      />
    </form>
  );
};

export default AccountCreationForm;
