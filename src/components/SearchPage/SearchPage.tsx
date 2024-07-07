import { Component, ReactNode } from "react";
import { SearchBar } from "./SearchBar/SearchBar";
import { ISearchItem } from "./SearchPageItem/SearchItem";
import { SearchList } from "./SearchList/SearchList";
import { Pagination } from "./Pagination/Pagination";
import { api } from "../../api";

interface ISearchPageState {
  isLoading: boolean;
  error: string;
  results: Array<ISearchItem> | null;
  currentPage: number;
  maxCount: number;
  searchTerm: string;
}

interface ApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Array<ISearchItem>;
}

export class SearchPage extends Component {
  state: Readonly<ISearchPageState> = {
    isLoading: false,
    error: "",
    results: null,
    maxCount: 10,
    currentPage: 1,
    searchTerm: "",
  };

  componentDidMount(): void {
    const savedSearchTerm = localStorage.getItem("searchTerm") || "";
    console.log(savedSearchTerm);
    this.setState(
      (prevState) => ({ ...prevState, searchTerm: savedSearchTerm }),
      () => {
        this.performSearch(savedSearchTerm, this.state.currentPage);
      },
    );
  }

  performSearch(searchTerm: string, page: number, limit: number = 10) {
    this.setState((prevState) => ({ ...prevState, isLoading: true }));
    api
      .getPeople(searchTerm, page, limit)
      .then((res: Response & ApiResponse) => {
        this.setState((prevState) => ({
          ...prevState,
          results: res.results.map((el) => ({
            name: el.name,
            height: el.height,
            mass: el.mass,
            hair_color: el["hair_color"],
          })),
          maxCount: res.count,
          isLoading: false,
        }));
      })
      .catch(() => {
        throw new Error("Fetch problem");
      });
  }

  handleSearch(searchTerm: string) {
    localStorage.setItem("searchTerm", searchTerm);
    this.performSearch(searchTerm, 1);
  }

  handlePageChange(page: number) {
    this.setState({ currentPage: page }, () => {
      this.performSearch(this.state.searchTerm, page);
    });
  }

  render(): ReactNode {
    const { isLoading, error } = this.state;

    if (error) {
      throw new Error("App crashed");
    }

    return (
      <>
        <section>
          <SearchBar
            throwError={() => this.setState({ error: "Something went wrong!" })}
            onSearch={(searchTerm: string) => this.handleSearch(searchTerm)}
          />
        </section>
        <section>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <SearchList results={this.state.results} />
              <Pagination
                currentPage={this.state.currentPage}
                maxCount={this.state.maxCount}
                onChangePage={(page: number) => this.handlePageChange(page)}
              />
            </>
          )}
        </section>
      </>
    );
  }
}
