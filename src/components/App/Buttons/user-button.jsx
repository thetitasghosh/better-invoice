"use client";
import React, { use, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { getUserData } from "@/app/actions";
import { getEmailInitial } from "@/lib/utils";
const UserButton = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    const fetch = async () => {
      const user = await getUserData();
      setName(user.email);
    };
    fetch();
  }, []);

  return (
    <Button variant={""} size={"icon"}>
      {getEmailInitial(name)}
    </Button>
  );
};

export default UserButton;
