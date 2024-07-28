import { describe, expect, it } from "vitest";
import cardsSliceReducer, { addCards, initialState } from "../cardsSlice";
import { ISearchItem } from "../../components/SearchPage/SearchPageItem/SearchItem";

describe("check addCards reducer", () => {
  it("check with undefined value", () => {
    const addCardsState = cardsSliceReducer(initialState, addCards());

    expect(addCardsState.cards.length).toBe(0);
  });
  it("check with response", () => {
    const response: ISearchItem[] = Array.from({ length: 10 }, (_, i) => ({
      name: `name${i}`,
      url: `url`,
      hair_color: `hair_color`,
      height: `height`,
      mass: `mass`,
    }));

    const addCardsState = cardsSliceReducer(initialState, addCards(response));

    expect(initialState.cards.length).toBe(0);
    expect(addCardsState.cards.length).toBe(10);
  });
});
