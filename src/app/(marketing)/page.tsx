import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      {/* <h1>Marketing page</h1> */}
      <Link href={"/dashboard"}>
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
};

export default Home;
