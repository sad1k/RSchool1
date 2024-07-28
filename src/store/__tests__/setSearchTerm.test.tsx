import { describe, expect, it } from "vitest";
import cardsSliceReducer, { initialState, setSearchTerm } from "../cardsSlice";

describe("check setSearchTerm reducer ", () => {
  it("should return searchTerm", () => {
    const setSearchTermState = cardsSliceReducer(
      initialState,
      setSearchTerm("test"),
    );

    expect(initialState.searchTerm).toBe("");
    expect(setSearchTermState.searchTerm).toBe("test");
  });
});
