import { useContext } from "react";
import { SearchBar } from "./SearchBar/SearchBar";
import { SearchList } from "./SearchList/SearchList";
import { Pagination } from "./Pagination/Pagination";
import { Loader } from "./Loader/Loader";
import { useSearchTerm } from "../../hooks/useSearchTerm";
import { Outlet, useParams } from "react-router-dom";
import "./styles.css";
import { ThemeContext } from "../../ThemeContext/ThemeContext";
import { useFetchCards } from "../../hooks/useFetchCards";

export function SearchPage(): JSX.Element {
  const [searchTerm] = useSearchTerm();
  const { page, detailsId } = useParams<{ page: string; detailsId: string }>();
  const currentPage = parseInt(page || "1", 10);
  const { theme } = useContext(ThemeContext);
  const { erroyByFetch, isFetching } = useFetchCards(
    searchTerm,
    currentPage,
    10,
  );

  if (erroyByFetch) {
    throw new Error("App crashed");
  }

  return (
    <>
      <div className={`search-page  ${theme ? "darkTheme" : "lightTheme"}`}>
        <div>
          <section>
            <SearchBar />
          </section>
          <section>
            {isFetching ? (
              <Loader role="" />
            ) : (
              <>
                <SearchList />
                <Pagination />
              </>
            )}
          </section>
        </div>
        {detailsId && (
          <section className="details-section">
            <Outlet />
          </section>
        )}
      </div>
    </>
  );
}
