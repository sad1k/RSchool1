import React, { ChangeEvent, useContext, useState } from "react";
import styles from "./SearchBar.module.css";
import { useRouter } from "next/router";
import Button from "../ChangeThemeBtn/Button";
import { ThemeContext } from "../../ThemeContext/ThemeContext";

export default function SearchBar(): JSX.Element {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const handleChange = function (e: ChangeEvent<HTMLInputElement>): void {
    setSearch(e.target.value);
  };

  const handleSearch = function (searchTerm: string) {
    const newUrl = new URLSearchParams(window.location.search);
    newUrl.set("search", searchTerm);
    router.push(`?${newUrl.toString()}`);
  };
  return (
    <div
      role="search-section"
      className={`${styles.searchSection} ${theme ? styles.darkTheme : styles.lightTheme}`}
    >
      <input
        role="search"
        className={styles.inputBar}
        placeholder="Luke Skywalker"
        onChange={(e) => handleChange(e)}
        value={search}
      />
      <button className={styles.searchBtn} onClick={() => handleSearch(search)}>
        Search
      </button>
      <Button />
    </div>
  );
}
