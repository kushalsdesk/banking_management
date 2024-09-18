"use client";
import { sidebarLinks } from "@/constants";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathName = usePathname();
  return (
    <>
      <section className="sidebar">
        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            className="mb-12 flex cursor-pointer items-center gap-2"
          >
            <Image
              src="/icons/Logo.png"
              width={70}
              height={70}
              alt="FinFly logo"
              className="size-[44px] max-xl:size-14"
            />
            <h1 className="sidebar-logo text-green-800">FinFly</h1>
          </Link>
          {sidebarLinks.map((item) => {
            const isActive =
              pathName === item.route || pathName.startsWith(`${item.route}/`);
            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
              >
                <div className="relative size-6">
                  <Image
                    className={cn({
                      "brightness-[3] invert-0": isActive,
                    })}
                    src={item.imgURL}
                    alt={item.label}
                    fill
                  />
                </div>
                <p
                  className={cn("sidebar-label", {
                    "!text-white": isActive,
                  })}
                >
                  {item.label}
                </p>
              </Link>
            );
          })}
          User
        </nav>
        <Footer user={user} />
      </section>
      <div></div>
    </>
  );
};

export default Sidebar;
