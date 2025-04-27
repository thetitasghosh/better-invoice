import React from "react";
import { Button } from "../../ui/button";
import { LogOut } from "lucide-react";
import { LogOutAction } from "@/app/actions";
const LogouButton = () => {
  return (
    <form action={LogOutAction} className="w-full">
      <Button
        // formAction={LogOutAction}
        variant={"destructive"}
        className="w-full"
      >
        <LogOut />
        <span>Log out</span>
      </Button>
    </form>
  );
};

export default LogouButton;
