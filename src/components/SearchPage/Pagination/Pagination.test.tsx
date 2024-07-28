import { fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { it } from "node:test";
import { expect, test } from "vitest";
import { Pagination } from "./Pagination";
import { renderWithProviders } from "../../../utils/test-utils";
import cardsSliceReducer, {
  initialState,
  setMaxCountCards,
} from "../../../store/cardsSlice";
import { setupStore } from "../../../store/store";

test("Pagination component", () => {
  it("updates URL query parameter when page changes", () => {
    const maxCountState = cardsSliceReducer(initialState, setMaxCountCards(82));

    const { store, getByText } = renderWithProviders(
      <MemoryRouter>
        <Pagination />
      </MemoryRouter>,
      { store: setupStore({ cards: maxCountState }) },
    );

    expect(getByText("9")).toBeInTheDocument();
    fireEvent.click(getByText("2"));

    expect(initialState.currentPage).toBe(1);
    expect(store.getState().cards.currentPage).toBe(2);
  });
});
