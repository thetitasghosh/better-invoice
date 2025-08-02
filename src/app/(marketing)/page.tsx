import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-white px-4">
      <div className="max-w-4xl pt-52 pb-20 redd text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-800">
          Simplify Invoicing for Your Business
        </h1>
        <p className="text-gray-600 md:text-lg text-base px-[5%]">
          Create, manage, and send professional invoices in seconds. Perfect for
          freelancers and small agencies.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Link href="/dashboard">
            <Button className="px-6 py-4 text-lg">Go to Dashboard</Button>
          </Link>
          <Link href="/auth/signup">
            <Button variant={"outline"} className="px-6 py-4 text-lg">
              Sign up
            </Button>
          </Link>
        </div>
        <div className="shadow-xl overflow-hidden rounded-md redd">
          <Image
            src={"/mock.png"}
            width={1980}
            height={1080}
            alt=""
            quality={100}
            className="size-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
