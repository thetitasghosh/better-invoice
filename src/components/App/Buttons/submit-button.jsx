"use client";
import React from "react";
import { Button } from "../../ui/button";
import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
const SubmitButton = ({ label, className }) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className={cn("", className)}>
      {label} {pending && <Loader className="animate-spin size-4" />}{" "}
    </Button>
  );
};

export default SubmitButton;
