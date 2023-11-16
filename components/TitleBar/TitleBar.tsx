"use client";
import { useState } from "react";
import "./Titlebar.css";

export default function TitleBar() {
  const [seachVal, setSearchVal] = useState("");

  return (
    <div className="title-bar-wrapper">
      <div className="search-bar-wrapper">
        <i className="bx bx-search" />
        <input
          className="adminSearch"
          type="search"
          placeholder="Type to search"
          name="search"
          value={seachVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>

      <div className="user-bar-wrapper">
        <div>
          <i className="bx bx-envelope" />
          <span className="message-count">2</span>
        </div>
        <i className="bx bx-bell" />
        <img src="/Admin/user.png" alt="user" />
      </div>
    </div>
  );
}
