import React from "react";
// import { Toaster } from "@/components/ui/sonner";
import { getEmailInitial, getNameInitials } from "@/lib/utils";
import { getUserData } from "../actions";
const layout = async ({ children }) => {
  const user = await getUserData();
  const userEmail = user.email;
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div
        id="header"
        className="w-full h-10 redd fixed top-0 mt-16 right-0 flex items-center justify-around"
      >
        <h1 className="font-bold text-lg">Better Invoice</h1>
        <UserCircle email={userEmail} />
      </div>
      {children}
      {/* <Toaster /> */}
    </div>
  );
};

export default layout;
function UserCircle({ email }) {
  return (
    <>
      <div className="relative redd flex items-center gap-2 justify-center">
        <div className="size-8 rounded-full bg-neutral-200 grid place-content-center text-lg">
          {getEmailInitial(email)}
        </div>
        <span className=" ">{email}</span>
      </div>
    </>
  );
}
