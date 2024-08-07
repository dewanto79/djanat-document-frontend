"use client";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import { localStorageMixins } from "@/utils/localStorage.mixins";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const path = usePathname();
  useEffect(() => {
    const access_token = localStorageMixins.get(`access_token`);
    if (!access_token && !path.includes(`/login`)) {
      redirect("/login");
    }
  }, []);
  if (path !== "/login") {
    return (
      <div className={`flex`}>
        <Sidebar>{children}</Sidebar>
      </div>
    );
  } else {
    return children;
  }
}
