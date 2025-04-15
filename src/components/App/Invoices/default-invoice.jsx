import React from "react";

const DefaultInvoice = ({ children }) => {
  return (
    <div className="size-full bg-neutral-200">
      <form action="">
        <div id="button">{children}</div>
      </form>
    </div>
  );
};

export default DefaultInvoice;
