import { useEffect, useState } from "react";
import { countPages } from "../../../utils/countPages";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/store";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../store/cardsSlice";

export function Pagination(): JSX.Element {
  const maxCount = useAppSelector((state) => +state.cards.maxCountCards);
  const currentPage = useAppSelector((state) => state.cards.currentPage);
  const dispatch = useDispatch();
  const [pages, setPages] = useState(
    countPages(currentPage, Math.ceil(maxCount / 10)),
  );

  useEffect(() => {
    setPages(countPages(currentPage, Math.ceil(maxCount / 10)));
  }, [maxCount, currentPage]);

  const navigate = useNavigate();

  const handlePageChange = function (page: number) {
    navigate(`/search/${page}`);
    dispatch(setCurrentPage(page));
  };

  const handleClick = function (page: number) {
    const maxPages: number = Math.ceil(maxCount / 10);
    setPages(countPages(page, maxPages));
    handlePageChange(page);
  };
  return (
    <div className="pagination">
      {pages.map((page) => (
        <button key={page} onClick={() => handleClick(page)}>
          {page}
        </button>
      ))}
    </div>
  );
}
