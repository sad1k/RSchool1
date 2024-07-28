import { ChangeEvent, useContext, useState } from "react";
import "./styles.css";
import Button from "../../../Button";
import { ThemeContext } from "../../../ThemeContext/ThemeContext";
import { useNavigate } from "react-router-dom";
import { setSearchTerm } from "../../../store/cardsSlice";
import { useDispatch } from "react-redux";

export function SearchBar(): JSX.Element {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = function (e: ChangeEvent<HTMLInputElement>): void {
    setSearch(e.target.value);
  };

  const handleSearch = function (searchTerm: string) {
    navigate(`/search/1`);
    dispatch(setSearchTerm(searchTerm));
  };

  const { theme } = useContext(ThemeContext);

  return (
    <div
      role="search-section"
      className={`search-section ${theme ? "darkTheme" : "lightTheme"}`}
    >
      <input
        role="search"
        className="input-bar"
        placeholder="Bulbasavar"
        onChange={(e) => handleChange(e)}
        value={search}
      />
      <button className="search-btn" onClick={() => handleSearch(search)}>
        Search
      </button>
      <Button role="theme-btn" />
    </div>
  );
}
