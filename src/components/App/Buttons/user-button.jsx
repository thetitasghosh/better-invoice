"use client";
import React, { useEffect, useState } from "react";
// import { Button } from "../../ui/button";
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
    <div className="redd size-9 flex items-center justify-center rounded-md font-semibold bg-neutral-200">
      {name && getEmailInitial(name)}
    </div>
  );
};

export default UserButton;
