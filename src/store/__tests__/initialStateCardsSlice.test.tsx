import { describe, expect, it } from "vitest";
import cardsSliceReducer, { initialState } from "../cardsSlice";

describe("check initialState of cardsSlice", () => {
  it("check initialState", () => {
    const addCardsState = cardsSliceReducer(undefined, {
      type: "unknown",
    });

    expect(addCardsState).toEqual(initialState);
  });
});
