import SideNavbar from "@/components/sideNavbar";
import React from "react";

interface Props {
  children: React.ReactNode;
  active:
    | "dashboard"
    | "product"
    | "stock"
    | "customers"
    | "orders"
    | "receipts"
    | "settings"
    | "logout";
}

export default function Layout({ children, active }: Props) {
  return (
    <main className="admin_layout">
      <SideNavbar active={active} />
      <div className="admin_main">{children}</div>
    </main>
  );
}
