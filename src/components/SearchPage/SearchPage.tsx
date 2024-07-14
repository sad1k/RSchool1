import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar/SearchBar";
import { ISearchItem } from "./SearchPageItem/SearchItem";
import { SearchList } from "./SearchList/SearchList";
import { Pagination } from "./Pagination/Pagination";
import { api, ApiResponse } from "../../api";
import { Loader } from "./Loader/Loader";
import { useSearchTerm } from "../../hooks/useSearchTerm";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./styles.css";

export function SearchPage(): JSX.Element {
  const [error, setError] = useState("");
  const [results, setResults] = useState<Array<ISearchItem> | null>(null);
  const [maxCount, setMaxCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const { page, detailsId } = useParams<{ page: string; detailsId: string }>();
  const currentPage = parseInt(page || "1", 10);
  const navigate = useNavigate();

  useEffect(() => {
    const initialSearch = localStorage.getItem("searchTerm") || "";
    performSearch(initialSearch, 1);
  }, []);

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
            url: el.url,
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
    navigate(`/search/1`);
    performSearch(searchTerm, 1);
  };

  const handlePageChange = function (page: number) {
    navigate(`/search/${page}`);
    performSearch(searchTerm, page);
  };

  const handleItemClick = function (id: string) {
    navigate(`/search/${currentPage}/${id}`);
  };

  if (error) {
    throw new Error("App crashed");
  }

  return (
    <>
      <div className="search-page">
        <section>
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
                <SearchList results={results} onItemClick={handleItemClick} />
                <Pagination
                  currentPage={currentPage}
                  maxCount={maxCount}
                  onChangePage={(page: number) => handlePageChange(page)}
                />
              </>
            )}
          </section>
        </section>
        {detailsId && (
          <section className="details-section">
            <Outlet />
          </section>
        )}
      </div>
    </>
  );
}
