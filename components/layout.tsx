import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import Flyout from "./Flyout/Flyout";

export default function Layout({ children }) {
  return (
    <>
      <SearchBar />
      <main>{children}</main>
      <Flyout />
    </>
  );
}
