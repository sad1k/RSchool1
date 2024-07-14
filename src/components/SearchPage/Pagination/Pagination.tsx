import { useState } from "react";
import { countPages } from "../../../utils/countPages";
import "./styles.css";

interface IProps {
  maxCount: number;
  onChangePage: (page: number) => void;
  currentPage: number;
}

export function Pagination({
  currentPage,
  maxCount,
  onChangePage,
}: IProps): JSX.Element {
  const [pages, setPages] = useState(
    countPages(currentPage, Math.ceil(maxCount / 10)),
  );

  const handleClick = function (page: number) {
    const maxPages: number = Math.ceil(maxCount / 10);
    setPages(countPages(page, maxPages));
    onChangePage(page);
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
