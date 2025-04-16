"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button";
import { useFormStatus } from "react-dom";
import { Loader, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const SubmitDropdownButton = ({ className, onAction }) => {
  const { pending } = useFormStatus();
  const [label, setLabel] = useState("Create");

  const handleSelect = (value) => {
    setLabel(value);
    if (onAction) {
      onAction(value); // you can set form values before submitting if needed
    }

    // Submit the form
    // document.getElementById("invoice-form")?.requestSubmit();
  };

  return (
    <DropdownMenu>
      <Button
        disabled={pending}
        className={cn("flex  items-center gap-2", className)}
      >
        {label}
        {pending && <Loader className="animate-spin size-4" />}
      </Button>
      <DropdownMenuTrigger asChild className="p-0 redd">
        <ChevronDown className="size-9 cursor-pointer rounded-md bg-black text-white" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => handleSelect("Create")}>
          Create
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSelect("Create & Send")}>
          Create & Send
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SubmitDropdownButton;
