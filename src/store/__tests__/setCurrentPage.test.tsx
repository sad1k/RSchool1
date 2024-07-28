import { describe, expect, it } from "vitest";
import cardsSliceReducer, { initialState, setCurrentPage } from "../cardsSlice";

describe("check setCurrentPage reducer", () => {
  it("should update the currentPage field", () => {
    const setCurrentPageState = cardsSliceReducer(
      initialState,
      setCurrentPage(10),
    );

    expect(initialState.currentPage).toBe(1);
    expect(setCurrentPageState.currentPage).toBe(10);
  });
});
