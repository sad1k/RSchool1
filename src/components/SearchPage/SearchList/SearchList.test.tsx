import { test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { SearchList } from "./SearchList";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../utils/test-utils";
import { MemoryRouter } from "react-router-dom";
import cardsSliceReducer, {
  addCards,
  initialState,
} from "../../../store/cardsSlice";
import { getPeople } from "../../../mocks/mockPeople";
import { setupStore } from "../../../store/store";

test("SearchList renders the specified number of cards", async () => {
  const addCardsState = cardsSliceReducer(initialState, addCards(getPeople(5)));

  renderWithProviders(
    <MemoryRouter>
      <SearchList />
    </MemoryRouter>,
    { store: setupStore({ cards: addCardsState }) },
  );

  const cards = await screen.findAllByRole("item");

  expect(cards.length).toBe(5);
});

test("SearchList displays appropriate message if no cards are present", () => {
  renderWithProviders(<SearchList />);

  const message = screen.getByText(/No such results/i);
  expect(message).toBeInTheDocument();
});
