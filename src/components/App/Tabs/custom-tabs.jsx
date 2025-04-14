"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const CustomTab = ({ Navigation }) => {
  const path = usePathname();
  return (
    <div className="w-full h-10 gap-2 flex items-center justify-start redd px-2">
      {Navigation.map((data, i) => {
        return (
          <Link
            key={i}
            href={data.route}
            className={cn(" border-black text-neutral-500 transition-all", {
              "border-b-2 text-black font-medium": path === data.route,
            })}
          >
            {data.label}
          </Link>
        );
      })}
    </div>
  );
};

export default CustomTab;
