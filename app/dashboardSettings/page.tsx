"use client";

import TitleBar from "@/components/TitleBar/TitleBar";
import Layout from "@/layout";
import React, { useState } from "react";
import "./page.css";
import BasicInformation from "@/components/BasicInformation/BasicInformation";
import PasswordCard from "@/components/PasswordCard/PasswordCard";
import DeleteTeamCard from "@/components/DeleteTeamMembers/DeleteTeamMember";
import InviteTeamCard from "@/components/InviteTeamCard/InviteTeamMember";

export default function DashboardSettings() {
  const [activeSettings, setActiveSettings] = useState("basicInformation");

  return (
    <Layout active="settings">
      <TitleBar />

      <div className="flex w-full h-full items-start justify-between gap-2">
        <div className="settings_tab">
          {/* Basic information */}
          <button
            className={
              activeSettings == "basicInformation"
                ? "settings_tab_btn"
                : "settings_tab_btn"
            }
            style={{
              color:
                activeSettings === "basicInformation"
                  ? "var(--pink)"
                  : "#081735",
            }}
            onClick={() => setActiveSettings("basicInformation")}
          >
            <span
              className={
                activeSettings == "basicInformation"
                  ? "active_settings"
                  : "inactive_settings"
              }
            />
            <i className="bx bx-plus"></i>
            Add Staff
          </button>

          {/* Password */}
          <button
            className={
              activeSettings == "password"
                ? "settings_tab_btn"
                : "settings_tab_btn"
            }
            style={{
              color: activeSettings === "password" ? "var(--pink)" : "#081735",
            }}
            onClick={() => setActiveSettings("password")}
          >
            <span
              className={
                activeSettings == "password"
                  ? "active_settings"
                  : "inactive_settings"
              }
            />
            <i className="bx bx-lock-alt"></i>
            Password
          </button>

          {/* Delete Team */}
          <button
            className={
              activeSettings == "deleteTeam"
                ? "settings_tab_btn"
                : "settings_tab_btn"
            }
            style={{
              color:
                activeSettings === "deleteTeam" ? "var(--pink)" : "#081735",
            }}
            onClick={() => setActiveSettings("deleteTeam")}
          >
            <span
              className={
                activeSettings == "deleteTeam"
                  ? "active_settings"
                  : "inactive_settings"
              }
            />
            <i className="bx bx-trash"></i>
            Delete Team
          </button>
        </div>

        <div className="settings_display_tab">
          <BasicInformation active={activeSettings} />
          <PasswordCard active={activeSettings} />
          <DeleteTeamCard active={activeSettings} />
          <InviteTeamCard active={activeSettings} />
        </div>
      </div>
    </Layout>
  );
}
