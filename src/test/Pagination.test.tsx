import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { it } from "node:test";
import { expect, test } from "vitest";
import { Pagination } from "../components/SearchPage/Pagination/Pagination";

test("Pagination component", () => {
  it("updates URL query parameter when page changes", () => {
    const maxCount = 100;
    const onChangePageMock = function (): void {};

    const currentPage = 1; // Initial current page

    const { getByText } = render(
      <MemoryRouter>
        <Pagination
          currentPage={currentPage}
          maxCount={maxCount}
          onChangePage={onChangePageMock}
        />
      </MemoryRouter>,
    );
    fireEvent.click(getByText("2"));

    expect(onChangePageMock).toHaveBeenCalledWith(2);
  });
});
