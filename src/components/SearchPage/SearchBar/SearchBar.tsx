import { ChangeEvent, Component, ReactNode } from "react";
import "./styles.css";

interface ISearchBarState {
  searchTerm: string;
}

interface IProps {
  onSearch: (searchTerm: string) => void;
  throwError: () => void;
}

export class SearchBar extends Component<IProps> {
  state: Readonly<ISearchBarState> = {
    searchTerm: localStorage.getItem("searchTerm") || "",
  };

  handleChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState(() => ({ searchTerm: e.target.value }));
  }

  render(): ReactNode {
    return (
      <div className="search-section">
        <button
          onClick={() => {
            this.props.throwError();
          }}
          className="throw-error-btn"
        >
          Throw error
        </button>
        <input
          className="input-bar"
          placeholder="Bulbasavar"
          onChange={(e) => this.handleChange(e)}
          value={this.state.searchTerm}
        />
        <button
          className="search-btn"
          onClick={() => this.props.onSearch(this.state.searchTerm)}
        >
          Search
        </button>
      </div>
    );
  }
}
