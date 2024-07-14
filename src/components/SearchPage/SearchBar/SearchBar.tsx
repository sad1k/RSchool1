import { ChangeEvent } from "react";
import "./styles.css";

interface IProps {
  onSearch: (searchTerm: string) => void;
  throwError: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function SearchBar({
  throwError,
  onSearch,
  searchTerm,
  setSearchTerm,
}: IProps): JSX.Element {
  const handleChange = function (e: ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-section">
      <button
        onClick={() => {
          throwError();
        }}
        className="throw-error-btn"
      >
        Throw error
      </button>
      <input
        className="input-bar"
        placeholder="Bulbasavar"
        onChange={(e) => handleChange(e)}
        value={searchTerm}
      />
      <button className="search-btn" onClick={() => onSearch(searchTerm)}>
        Search
      </button>
    </div>
  );
}
