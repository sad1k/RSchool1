import { describe, expect, it } from "vitest";
import cardsSliceReducer, {
  initialState,
  setMaxCountCards,
} from "../cardsSlice";

describe("check setMaxCountCards reducer", () => {
  it("check with 50 value", () => {
    const setMaxCountCardsState = cardsSliceReducer(
      initialState,
      setMaxCountCards(50),
    );

    expect(initialState.maxCountCards).toBe(10);
    expect(setMaxCountCardsState.maxCountCards).toBe(50);
  });
});
