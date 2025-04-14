import React from "react";
import { Button } from "../../ui/button";
import { LogOut } from "lucide-react";
const LogouButton = () => {
  return (
    <Button variant={"destructive"} className="w-full">
      <LogOut />
      <span>Log out</span>
    </Button>
  );
};

export default LogouButton;
