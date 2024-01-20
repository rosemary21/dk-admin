"use client";

import { useState } from "react";
import "./index.css";
import { LINKS } from "@/utils/Links";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineStock } from "react-icons/ai";
import { BiCalendar, BiCategory, BiDetail, BiLock } from "react-icons/bi";
import { BsHandbag, BsCartDash } from "react-icons/bs";
import { RiDashboardLine } from "react-icons/ri";
import { MdOutlineDescription } from "react-icons/md";
import { SlCompass } from "react-icons/sl";
import "./index.css";
import AuthService from "@/services/auth/auth";
import Loader from "@/utils/Loader";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

interface Props {
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

const ACTIVE = {
  Dashboard: "dashboard",
  Product: "product",
  Stock: "stock",
  Customers: "customers",
  Orders: "orders",
  Receipts: "receipts",
  Settings: "settings",
  LogOut: "logout",
};

export default function SideNavbar({ active }: Props) {
  const [activeSide, setActiveSide] = useState(active);
  const [dropdown, setDropdown] = useState("none");
  const { loginLoader, error, setError, logOutAPI } = AuthService();
  const [opened, { open, close }] = useDisclosure(false);

  function productDropdown() {
    if (dropdown === "none") {
      setDropdown("block");
    } else {
      setDropdown("none");
    }
  }

  async function signOutAdmin(e: any) {
    e.preventDefault();
    await logOutAPI();
  }

  function handleBtnClick(
    state:
      | "dashboard"
      | "product"
      | "stock"
      | "customers"
      | "orders"
      | "receipts"
      | "settings"
      | "logout"
  ) {
    setActiveSide(state);
    setDropdown("none");
  }
  return (
    <aside className="admin_sidebar">
      <Link href={LINKS.dashboardLogin}>
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={70}
          priority
          quality={75}
        />
      </Link>

      <div className="menu">
        <Link
          className="side_link"
          href={LINKS.dashboardHome}
          onClick={() => handleBtnClick("dashboard")}
        >
          <button
            className={
              activeSide === ACTIVE.Dashboard
                ? "side-btn active-side"
                : "side-btn"
            }
          >
            <div>
              <RiDashboardLine className="side-icon" />
              {ACTIVE.Dashboard}
            </div>
            <i
              className={`bx bx-chevron-${
                activeSide === ACTIVE.Dashboard ? "down" : "right"
              }`}
            />
          </button>
        </Link>
        <button
          onClick={() => {
            handleBtnClick("product");
            productDropdown();
          }}
          className={
            activeSide === ACTIVE.Product
              ? "side-btn active-side side_link"
              : "side-btn side_link"
          }
        >
          <div>
            <BsHandbag className="side-icon" />
            {ACTIVE.Product}
          </div>
          <i
            className={`bx bx-chevron-${
              activeSide === ACTIVE.Product ? "down" : "right"
            }`}
          />
        </button>
        <div className="dropdown-container" style={{ display: dropdown }}>
          <Link href={LINKS.dashboardProduct}>
            <BsCartDash className="side-icon" /> Product
          </Link>

          <Link href={LINKS.dashboardProductCategory}>
            <BiCategory className="side-icon" /> Categories
          </Link>

          <Link href={LINKS.dashboardProductDescription}>
            <MdOutlineDescription className="side-icon" /> Description
          </Link>
        </div>
        <Link
          className="side_link"
          href={LINKS.dashboardCustomer}
          onClick={() => handleBtnClick("customers")}
        >
          <button
            className={
              activeSide === ACTIVE.Customers
                ? "side-btn active-side"
                : "side-btn"
            }
          >
            <div>
              <SlCompass className="side-icon" />
              {ACTIVE.Customers}
            </div>
            <div></div>
          </button>
        </Link>
        <Link
          className="side_link"
          href={LINKS.dashboardStock}
          onClick={() => handleBtnClick("stock")}
        >
          <button
            className={
              activeSide === ACTIVE.Stock ? "side-btn active-side" : "side-btn"
            }
          >
            <div>
              <AiOutlineStock className="side-icon" />
              {ACTIVE.Stock}
            </div>
            <div></div>
          </button>
        </Link>
        <Link
          className="side_link"
          href={LINKS.dashboardReceipt}
          onClick={() => handleBtnClick("receipts")}
        >
          <button
            className={
              activeSide === ACTIVE.Receipts
                ? "side-btn active-side"
                : "side-btn"
            }
          >
            <div>
              <BiDetail className="side-icon" />
              {ACTIVE.Receipts}
            </div>
            <i
              className={`bx bx-chevron-${
                activeSide === ACTIVE.Receipts ? "down" : "right"
              }`}
            />
          </button>
        </Link>
        <Link
          className="side_link"
          href={LINKS.dashboardSettings}
          onClick={() => handleBtnClick("settings")}
        >
          <button
            className={
              activeSide === ACTIVE.Settings
                ? "side-btn active-side"
                : "side-btn"
            }
          >
            <div>
              <BiCalendar className="side-icon" />
              {ACTIVE.Settings}
            </div>
            <div></div>
          </button>
        </Link>
        <button
          onClick={open}
          className={
            activeSide === ACTIVE.LogOut
              ? "side-btn active-side side_link"
              : "side-btn side_link"
          }
        >
          <div>
            <BiLock className="side-icon" />
            {ACTIVE.LogOut}
          </div>
        </button>
      </div>
      {loginLoader && <Loader />}

      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        shadow="lg"
        transitionProps={{ duration: 200, transition: "slide-down" }}
      >
        <div className="flex flex-col gap-6 py-5">
          <h5 className="font-semibold text-lg text-center">
            Are you sure you want to logout?
          </h5>
          <div className="w-full flex items-center gap-8 overflow-hidden">
            <button onClick={signOutAdmin} className="btn_primary">
              Signout
            </button>
            <button onClick={close} className="btn_primary btn_2">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </aside>
  );
}
