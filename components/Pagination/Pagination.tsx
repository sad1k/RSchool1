import React, { useEffect, useState } from "react";
import { countPages } from "../../utils/countPages";
import { useRouter } from "next/router";
import styles from "./Pagination.module.css";

interface IProps {
  maxCount: number;
  currentPage: string;
}

export function Pagination({ maxCount, currentPage }: IProps): JSX.Element {
  const [pages, setPages] = useState(
    countPages(+currentPage, Math.ceil(maxCount / 10)),
  );

  const router = useRouter();

  useEffect(() => {
    setPages(countPages(+currentPage, Math.ceil(maxCount / 10)));
  }, [maxCount, currentPage]);

  const handlePageChange = function (page: number) {
    const newUrl = new URLSearchParams(window.location.search);
    newUrl.set("page", page + "");
    router.push(`?${newUrl.toString()}`);
  };

  const handleClick = function (page: number) {
    const maxPages: number = Math.ceil(maxCount / 10);
    setPages(countPages(page, maxPages));
    handlePageChange(page);
  };
  return (
    <div className={styles.pagination}>
      {pages.length > 1
        ? pages.map((page) => (
            <button
              key={page}
              onClick={() => handleClick(page)}
              disabled={+currentPage === page}
            >
              {page}
            </button>
          ))
        : false}
    </div>
  );
}
