import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar/SearchBar";
import { ISearchItem } from "./SearchPageItem/SearchItem";
import { SearchList } from "./SearchList/SearchList";
import { Pagination } from "./Pagination/Pagination";
import { api, ApiResponse } from "../../api";
import { Loader } from "./Loader/Loader";
import { useSearchTerm } from "../../hooks/useSearchTerm";

export function SearchPage(): JSX.Element {
  const [error, setError] = useState("");
  const [results, setResults] = useState<Array<ISearchItem> | null>(null);
  const [maxCount, setMaxCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useSearchTerm();

  useEffect(() => {
    const initialSearch = localStorage.getItem("searchTerm") || "";
    performSearch(initialSearch, currentPage);
  }, [currentPage]);

  const performSearch = function (
    searchTerm: string,
    page: number,
    limit: number = 10,
  ) {
    setIsLoading(true);
    api
      .getPeople(searchTerm, page, limit)
      .then((res: Response & ApiResponse) => {
        setResults(() => {
          return res.results.map((el) => ({
            name: el.name,
            height: el.height,
            mass: el.mass,
            hair_color: el["hair_color"],
          }));
        });
        setMaxCount(res.count);
        setIsLoading(false);
      })
      .catch(() => {
        throw new Error("Fetch problem");
      });
  };

  const handleSearch = function (searchTerm: string) {
    localStorage.setItem("searchTerm", searchTerm.trim());
    performSearch(searchTerm, 1);
  };

  const handlePageChange = function (page: number) {
    setCurrentPage(page);
    performSearch(searchTerm, page);
  };

  if (error) {
    throw new Error("App crashed");
  }

  return (
    <>
      <section>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          throwError={() => setError("Something went wrong!")}
          onSearch={(searchTerm: string) => handleSearch(searchTerm)}
        />
      </section>
      <section>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <SearchList results={results} />
            <Pagination
              currentPage={currentPage}
              maxCount={maxCount}
              onChangePage={(page: number) => handlePageChange(page)}
            />
          </>
        )}
      </section>
    </>
  );
}
